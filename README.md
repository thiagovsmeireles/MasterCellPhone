# Master Cellphone

Aplicação web para gestão e divulgação de serviços de assistência técnica de celulares.

> 🔗 Deploy: [Master Cellphone](https://mastercellphone.onrender.com)  
> 📦 Repositório: [MasterCellPhone](https://github.com/thiagovsmeireles/MasterCellPhone)

---

## 🧰 Stack & Ferramentas

<p align="left">
  <!-- Node.js -->
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <!-- Express -->
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <!-- HTML5 -->
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <!-- CSS3 -->
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <!-- JavaScript -->
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000" />
  <!-- NPM -->
  <img alt="NPM" src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</p>

---

## 🚀 Tecnologias

- Node.js
- Express (servidor HTTP)
- HTML, CSS e JavaScript puro (frontend)
- Arquivo JSON para serviços (`data/services.json`)
- NPM para gerenciamento de dependências

---

## 📂 Estrutura do projeto

```text
.
├── data
│   └── services.json     # Lista de serviços em JSON
├── db
│   └── app.db            # (Opcional) base de dados local
├── public
│   ├── assets
│   │   └── logo.png      # Logo da aplicação
│   ├── app.js            # Lógica de frontend
│   ├── index.html        # Página inicial
│   ├── servicos.html     # Página de serviços
│   └── styles.css        # Estilos da interface
├── server.js             # Servidor Node/Express
├── package.json
├── package-lock.json
└── README.md
```

---

## 🛠️ Pré‑requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada)
- NPM (já vem junto com o Node)

---

## ▶️ Como rodar o projeto localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/thiagovsmeireles/MasterCellPhone.git
cd MasterCellPhone

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor
npm start
# ou, se existir um script específico:
# npm run dev
```

Depois, acesse no navegador:

```text
http://localhost:3000
```

> Se a porta for diferente no `server.js`, ajuste a URL.

---

## 📘 Scripts NPM

Os scripts exatos estão definidos em [`package.json`](./package.json).  
Um exemplo comum de configuração é:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Se você utilizar `nodemon` durante o desenvolvimento, pode ter algo como:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

---

## 📡 Rotas (exemplo)

Dependendo da implementação do `server.js`, as rotas podem incluir:

- `GET /` – serve `public/index.html`
- `GET /servicos` – serve `public/servicos.html`
- `GET /api/services` – retorna a lista de serviços a partir de `data/services.json`

> Ajuste essa seção conforme as rotas reais do seu `server.js`.

---

## ✨ Autor

Desenvolvido por **[Thiago Meireles](https://github.com/thiagovsmeireles)**

Sinta‑se à vontade para abrir *issues* e *pull requests* com sugestões, melhorias ou correções.

---
