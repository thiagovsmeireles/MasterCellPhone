const state={tab:"iphone",services:{iphone:[],android:[]},config:{whatsappNumber:"5599999999999"}};
const els={search:document.getElementById("search"),tabs:[...document.querySelectorAll(".tab")],list:document.getElementById("services-list"),panelTitle:document.getElementById("panel-title"),submit:document.getElementById("submit"),name:document.getElementById("name"),phone:document.getElementById("phone")};
const load=async()=>{
  try{const cfg=await fetch("/api/config").then(r=>r.json());state.config=cfg||state.config}catch{}
  try{const data=await fetch("/api/services").then(r=>r.json());state.services=data||state.services}catch{}
  render();
};
const render=()=>{
  els.panelTitle.textContent=state.tab==="iphone"?"Serviços iPhone":"Serviços Android";
  const query=(els.search.value||"").toLowerCase();
  const items=(state.services[state.tab]||[]).filter(s=>s.toLowerCase().includes(query));
  els.list.innerHTML="";
  for(const s of items){
    const li=document.createElement("li");
    li.className="service-item";
    const id="svc-"+s.toLowerCase().replace(/[^a-z0-9]+/g,"-");
    const input=document.createElement("input");
    input.type="checkbox";input.id=id;input.value=s;
    const label=document.createElement("label");
    label.setAttribute("for",id);label.textContent=s;
    li.appendChild(input);li.appendChild(label);
    els.list.appendChild(li);
  }
};
for(const t of els.tabs){t.addEventListener("click",e=>{for(const b of els.tabs)b.classList.remove("active");t.classList.add("active");state.tab=t.dataset.tab;render();})}
els.search.addEventListener("input",render);
els.submit.addEventListener("click",async()=>{
  const checked=[...document.querySelectorAll(".service-item input:checked")].map(i=>i.value);
  const name=els.name.value.trim();
  const phone=els.phone.value.trim();
  const payload={name,phone,deviceType:state.tab,selectedServices:checked};
  try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})}catch{}
  const msgParts=[];
  msgParts.push("Olá, gostaria de solicitar serviços pela MasterCellPhone.");
  if(name) msgParts.push("Nome: "+name);
  if(phone) msgParts.push("WhatsApp: "+phone);
  msgParts.push("Dispositivo: "+(state.tab==="iphone"?"iPhone":"Android"));
  if(checked.length) msgParts.push("Serviços: "+checked.join(", "));
  const text=encodeURIComponent(msgParts.join("\n"));
  const url="https://wa.me/"+state.config.whatsappNumber+"?text="+text;
  window.open(url,"_blank");
});
load();