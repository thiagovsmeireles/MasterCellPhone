import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirnamePath = path.resolve();
const dbDir = path.join(__dirnamePath, "db");
const dbPath = path.join(dbDir, "app.db");
const dataDir = path.join(__dirnamePath, "data");
const servicesJsonPath = path.join(dataDir, "services.json");

if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirnamePath, "public")));

const ensureSchema = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, name TEXT NOT NULL)",
        (e) => {
          if (e) return reject(e);
          db.run(
            "CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, device_type TEXT, services_json TEXT, created_at TEXT)",
            (e2) => {
              if (e2) return reject(e2);
              resolve();
            }
          );
        }
      );
    });
  });
};

const seedServices = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(1) as c FROM services", (err, row) => {
      if (err) return reject(err);
      if (row && row.c > 0) return resolve();
      let raw;
      try {
        raw = JSON.parse(fs.readFileSync(servicesJsonPath, "utf8"));
      } catch {
        return resolve();
      }
      const stmt = db.prepare("INSERT INTO services (category, name) VALUES (?, ?)");
      for (const n of raw.iphone || []) stmt.run("iphone", n);
      for (const n of raw.android || []) stmt.run("android", n);
      stmt.finalize((e) => (e ? reject(e) : resolve()));
    });
  });
};

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/config", (req, res) => {
  const number = process.env.WHATSAPP_NUMBER || "5599999999999";
  res.json({ whatsappNumber: number });
});

app.get("/api/services", (req, res) => {
  db.all("SELECT category, name FROM services ORDER BY name ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: "db_error" });
    const grouped = { iphone: [], android: [] };
    for (const r of rows) grouped[r.category]?.push(r.name);
    res.json(grouped);
  });
});

app.post("/api/leads", (req, res) => {
  const { name, phone, deviceType, selectedServices } = req.body || {};
  const createdAt = new Date().toISOString();
  const servicesJson = JSON.stringify(selectedServices || []);
  const stmt = db.prepare(
    "INSERT INTO leads (name, phone, device_type, services_json, created_at) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(name || null, phone || null, deviceType || null, servicesJson, createdAt, function (err) {
    if (err) return res.status(500).json({ error: "db_error" });
    res.json({ id: this.lastID });
  });
});

ensureSchema()
  .then(() => seedServices())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  })
  .catch((e) => {
    console.error("DB init error", e);
    process.exit(1);
  });