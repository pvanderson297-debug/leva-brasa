
const ADMIN_EMAIL = "pvanderson297@gmail.com";
const LS = "levaBrasaFinalV1";

const $ = (id)=>document.getElementById(id);
const qsa = (sel)=>Array.from(document.querySelectorAll(sel));

let state = load();
let selectedRole = "passageiro";
let session = state.session || null;

function load(){
  const empty = {users:[], rides:[], notifications:[], session:null};
  try{return JSON.parse(localStorage.getItem(LS)) || empty}catch(e){return empty}
}
function save(){ localStorage.setItem(LS, JSON.stringify(state)); }
function uid(prefix){ return prefix + "-" + Date.now() + "-" + Math.floor(Math.random()*9999); }
function now(){ return new Date().toLocaleString("pt-PT"); }
function toast(msg){ $("toast").textContent=msg; $("toast").classList.remove("hidden"); setTimeout(()=>$("toast").classList.add("hidden"),3000); }
function currentUser(){ return state.users.find(u=>u.id===session?.userId); }
function money(n){ return "EUR " + Number(n||0).toFixed(0); }

function fileToData(input, cb){
  const file = input.files[0];
  if(!file){ cb(null); return; }
  const reader = new FileReader();
  reader.onload = ()=>cb({name:file.name,type:file.type,data:reader.result});
  reader.readAsDataURL(file);
}

function preview(inputId, targetId){
  const input=$(inputId), target=$(targetId);
  input.addEventListener("change", ()=>{
    const f=input.files[0];
    if(!f){target.innerHTML="";return}
    if(f.type.startsWith("image/")){
      const r=new FileReader();
      r.onload=()=> target.innerHTML=`<img src="${r.result}" alt="prévia">`;
      r.readAsDataURL(f);
    } else {
      target.innerHTML=`<div class="filebox">Arquivo enviado: ${f.name}</div>`;
    }
  });
}
preview("licenseFile","licensePreview"); preview("selfieFile","selfiePreview");

qsa("[data-role]").forEach(btn=>{
  btn.onclick=()=>{
    selectedRole=btn.dataset.role;
    qsa("[data-role]").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    $("driverFields").classList.toggle("hidden", selectedRole!=="motorista");
  };
});

$("authForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const email=$("email").value.trim().toLowerCase();
  const pass=$("password").value;
  let role = email===ADMIN_EMAIL ? "admin" : selectedRole;
  let existing = state.users.find(u=>u.email===email);
  if(existing){
    if(existing.password!==pass) return toast("Senha incorreta.");
    session={userId:existing.id}; state.session=session; save(); render(); return;
  }

  const createUser = (licenseDoc=null,selfieDoc=null)=>{
    const user = {
      id: uid("USR"), role, name:$("name").value.trim()||email.split("@")[0],
      phone:$("phone").value.trim(), email, city:$("city").value, password:pass,
      createdAt: now()
    };
    if(role==="motorista"){
      Object.assign(user,{
        statusAprovacao:"pendente_aprovacao", motoristaStatus:"offline",
        brand:$("brand").value, model:$("model").value, plate:$("plate").value,
        iban:$("iban").value, license:$("license").value, category:$("category").value,
        expiry:$("expiry").value, year:$("year").value, color:$("color").value,
        seats:$("seats").value, licenseDoc, selfieDoc
      });
      notifyAdmin("Novo motorista pendente", `${user.name} aguardando aprovação.`);
    }
    if(role==="admin"){ user.statusAprovacao="aprovado"; }
    state.users.push(user);
    session={userId:user.id}; state.session=session; save(); render();
    toast(role==="motorista" ? "Cadastro enviado. Aguarde aprovação." : "Cadastro realizado.");
  };

  if(role==="motorista"){
    fileToData($("licenseFile"), (licenseDoc)=>{
      fileToData($("selfieFile"), (selfieDoc)=>createUser(licenseDoc,selfieDoc));
    });
  } else createUser();
});

$("btnLogout").onclick=()=>{ state.session=null; session=null; save(); render(); };
$("btnBell").onclick=()=>showScreen("notifications");

function showScreen(name){
  qsa(".screen").forEach(s=>s.classList.add("hidden"));
  $(name).classList.remove("hidden");
  if(name==="notifications") renderNotifications();
}

function notify(userId,title,msg,rideId=null){
  state.notifications.unshift({id:uid("NOT"), userId,title,msg,rideId,read:false,createdAt:now()});
}
function notifyAdmin(title,msg){
  state.users.filter(u=>u.role==="admin").forEach(a=>notify(a.id,title,msg));
}

function render(){
  session = state.session;
  const user=currentUser();
  $("btnLogout").classList.toggle("hidden",!user);
  updateBadge();
  if(!user){ showScreen("auth"); return; }
  if(user.role==="passageiro"){ showScreen("passenger"); renderPassenger(); }
  if(user.role==="motorista"){ showScreen("driver"); renderDriver(); }
  if(user.role==="admin"){ showScreen("admin"); renderAdmin(); }
}

function updateBadge(){
  const user=currentUser(); if(!user){ $("badge").classList.add("hidden"); return; }
  const count=state.notifications.filter(n=>n.userId===user.id && !n.read).length;
  $("badge").textContent=count; $("badge").classList.toggle("hidden",count===0);
}

function calcPrice(){
  const dest=$("destination").value;
  const kms = { "Ireland West Airport Knock":27, "Castlebar":31, "Galway":80, "Dublin Airport":220, "Cork Airport":260 }[dest] || 20;
  const price = Math.max(12, 8 + kms);
  $("km").textContent = kms + " km";
  $("price").textContent = money(price);
  return {kms,price};
}
$("destination").onchange=calcPrice; $("bags").onchange=calcPrice;

$("rideForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const user=currentUser(); const {kms,price}=calcPrice();
  const ride={id:uid("LB"), passengerId:user.id, passengerName:user.name, passengerPhone:user.phone,
    passengerEmail:user.email, city:user.city, origin:$("origin").value, destination:$("destination").value,
    people:$("people").value, time:$("time").value, notes:$("notes").value, kms, valueTotal:price,
    valueDriver: Math.max(10, price-8), status:"aguardando_motorista", createdAt:now()};
  state.rides.unshift(ride);
  notify(user.id,"Viagem criada",`Sua viagem ${ride.id} foi criada.`);
  notifyAdmin("Nova viagem criada",`${user.name} solicitou viagem para ${ride.destination}.`,ride.id);
  state.users.filter(u=>u.role==="motorista" && u.motoristaStatus==="online" && u.statusAprovacao==="aprovado" && u.city===user.city)
    .forEach(d=>notify(d.id,"Nova corrida disponível",`${ride.origin} → ${ride.destination}. Valor motorista: ${money(ride.valueDriver)}`,ride.id));
  save(); render(); toast("Viagem solicitada.");
});

function renderPassenger(){
  $("onlineCount").textContent = state.users.filter(u=>u.role==="motorista" && u.motoristaStatus==="online" && u.statusAprovacao==="aprovado").length;
  const user=currentUser();
  const rides=state.rides.filter(r=>r.passengerId===user.id);
  $("passengerRides").innerHTML = rides.length? rides.map(rideCard).join("") : "<p>Nenhuma viagem solicitada.</p>";
  calcPrice();
}

function rideCard(r){
  return `<div class="item"><h4>${r.origin} → ${r.destination}</h4>
    <p class="muted">${r.id}<br>Status: <b>${label(r.status)}</b><br>Valor: ${money(r.valueTotal)}<br>Motorista: ${r.driverName||"aguardando"}</p></div>`;
}

function renderDriver(){
  const u=currentUser();
  $("approvalStatus").textContent=label(u.statusAprovacao||"pendente_aprovacao");
  $("driverStatus").textContent=label(u.motoristaStatus||"offline");
  $("goOnline").disabled = u.statusAprovacao!=="aprovado";
  $("goOnline").onclick=()=>{ u.motoristaStatus="online"; save(); render(); toast("Você está online."); };
  $("goOffline").onclick=()=>{ u.motoristaStatus="offline"; save(); render(); toast("Você está offline."); };

  const available=state.rides.filter(r=>r.status==="aguardando_motorista" && r.city===u.city && u.motoristaStatus==="online" && u.statusAprovacao==="aprovado");
  $("availableRides").innerHTML = available.length ? available.map(r=>`
    <div class="item"><h4>${r.origin} → ${r.destination}</h4>
    <p>Passageiro: ${r.passengerName}<br>Recebe: ${money(r.valueDriver)}</p>
    <div class="actions"><button class="ok" onclick="acceptRide('${r.id}')">Aceitar corrida</button></div></div>`).join("") : "<p>Nenhuma corrida disponível.</p>";

  const cur=state.rides.find(r=>r.driverId===u.id && !["finalizada","cancelada"].includes(r.status));
  $("currentRide").innerHTML = cur ? driverRideCard(cur) : "<p>Nenhuma corrida atual.</p>";
}
window.acceptRide=(id)=>{
  const u=currentUser(); const r=state.rides.find(x=>x.id===id);
  if(!r || r.status!=="aguardando_motorista") return toast("Corrida já foi aceita.");
  Object.assign(r,{driverId:u.id,driverName:u.name,driverPhone:u.phone,driverEmail:u.email,status:"aguardando_pagamento_cliente",acceptedAt:now()});
  u.motoristaStatus="ocupado";
  notify(r.passengerId,"Motorista aceitou viagem",`${u.name} aceitou sua corrida. Aguarde confirmação de pagamento.`,r.id);
  notifyAdmin("Motorista aceitou viagem",`${u.name} aceitou ${r.id}.`,r.id);
  save(); render();
};
function driverRideCard(r){
  let buttons="";
  if(r.status==="pagamento_cliente_confirmado") buttons+=`<button class="ok" onclick="startRide('${r.id}')">Iniciar corrida</button>`;
  if(r.status==="viagem_em_andamento") buttons+=`<button class="warn" onclick="finishRide('${r.id}')">Encerrar corrida</button>`;
  if(!buttons) buttons="<p class='muted'>Aguardando próxima etapa.</p>";
  return `<div class="item"><h4>${r.origin} → ${r.destination}</h4>
    <p>Passageiro: ${r.passengerName}<br>Telefone: ${r.passengerPhone||"-"}<br>Status: <b>${label(r.status)}</b><br>Você recebe: ${money(r.valueDriver)}</p>
    <div class="actions">${buttons}</div></div>`;
}
window.startRide=(id)=>{
  const r=state.rides.find(x=>x.id===id); if(!r) return;
  r.status="viagem_em_andamento"; r.startedAt=now();
  notify(r.passengerId,"Corrida iniciada","Sua corrida foi iniciada.",r.id); notifyAdmin("Corrida iniciada",`${r.driverName} iniciou ${r.id}.`,r.id);
  save(); render();
};
window.finishRide=(id)=>{
  const r=state.rides.find(x=>x.id===id); if(!r) return;
  r.status="aguardando_pagamento_motorista"; r.endedAt=now();
  notify(r.passengerId,"Corrida encerrada","Sua corrida foi encerrada.",r.id); notifyAdmin("Motorista aguarda pagamento",`${r.driverName} encerrou ${r.id}.`,r.id);
  save(); render();
};

function renderAdmin(){
  const pending=state.users.filter(u=>u.role==="motorista" && u.statusAprovacao==="pendente_aprovacao");
  $("pendingDrivers").innerHTML = pending.length ? pending.map(driverAdminCard).join("") : "<p>Nenhum motorista pendente.</p>";
  $("adminRides").innerHTML = state.rides.length ? state.rides.map(adminRideCard).join("") : "<p>Nenhuma viagem.</p>";
  const received=state.rides.filter(r=>r.pagamentoClienteConfirmado).reduce((s,r)=>s+r.valueTotal,0);
  const paid=state.rides.filter(r=>r.pagamentoMotoristaConfirmado).reduce((s,r)=>s+r.valueDriver,0);
  $("finance").innerHTML = `<p>Total recebido: <b>${money(received)}</b><br>Total pago motoristas: <b>${money(paid)}</b><br>Lucro simples: <b>${money(received-paid)}</b></p>`;
}
function docView(doc){
  if(!doc) return "Não enviado";
  if(doc.type && doc.type.startsWith("image/")) return `<img src="${doc.data}" alt="${doc.name}" style="max-width:100%;border-radius:12px">`;
  return `<div class="filebox">${doc.name}</div>`;
}
function driverAdminCard(u){
  return `<div class="item"><h4>${u.name}</h4>
    <p>${u.email}<br>${u.phone}<br>${u.brand||""} ${u.model||""} - ${u.plate||""}<br>Habilitação: ${u.license||"-"} Validade: ${u.expiry||"-"}</p>
    <details><summary>Ver documentos</summary><p>Habilitação:</p>${docView(u.licenseDoc)}<p>Selfie:</p>${docView(u.selfieDoc)}</details>
    <div class="actions"><button class="ok" onclick="approveDriver('${u.id}')">Aprovar</button><button class="danger" onclick="rejectDriver('${u.id}')">Rejeitar</button></div></div>`;
}
window.approveDriver=(id)=>{ const u=state.users.find(x=>x.id===id); u.statusAprovacao="aprovado"; u.motoristaStatus="offline"; notify(u.id,"Cadastro aprovado","Você já pode ficar online."); save(); render(); };
window.rejectDriver=(id)=>{ const u=state.users.find(x=>x.id===id); u.statusAprovacao="rejeitado"; notify(u.id,"Cadastro rejeitado","Seu cadastro foi rejeitado pelo admin."); save(); render(); };
function adminRideCard(r){
  let actions="";
  if(r.status==="aguardando_pagamento_cliente") actions+=`<button class="ok" onclick="confirmClientPay('${r.id}')">Confirmar pagamento passageiro</button>`;
  if(r.status==="aguardando_pagamento_motorista") actions+=`<button class="ok" onclick="confirmDriverPay('${r.id}')">Confirmar pagamento motorista</button>`;
  return `<div class="item"><h4>${r.id}</h4><p>${r.origin} → ${r.destination}<br>Passageiro: ${r.passengerName}<br>Motorista: ${r.driverName||"-"}<br>Status: <b>${label(r.status)}</b><br>Total: ${money(r.valueTotal)} | Motorista: ${money(r.valueDriver)}</p><div class="actions">${actions}</div></div>`;
}
window.confirmClientPay=(id)=>{ const r=state.rides.find(x=>x.id===id); r.pagamentoClienteConfirmado=true; r.dataPagamentoCliente=now(); r.status="pagamento_cliente_confirmado"; notify(r.driverId,"Pagamento confirmado","Você já pode iniciar a corrida.",r.id); notify(r.passengerId,"Pagamento confirmado","Seu pagamento foi confirmado.",r.id); save(); render(); };
window.confirmDriverPay=(id)=>{ const r=state.rides.find(x=>x.id===id); r.pagamentoMotoristaConfirmado=true; r.dataPagamentoMotorista=now(); r.status="finalizada"; r.finishedAt=now(); const d=state.users.find(u=>u.id===r.driverId); if(d)d.motoristaStatus="online"; notify(r.driverId,"Pagamento confirmado","Seu pagamento foi confirmado.",r.id); notify(r.passengerId,"Viagem finalizada","Obrigado por usar o Leva Brasa.",r.id); save(); render(); };

function renderNotifications(){
  const user=currentUser(); if(!user) return;
  const ns=state.notifications.filter(n=>n.userId===user.id);
  $("notifList").innerHTML = ns.length ? ns.map(n=>`<div class="item"><h4>${n.title}</h4><p>${n.msg}<br><span class="muted">${n.createdAt}</span></p><button onclick="readNotif('${n.id}')" class="secondary">${n.read?"Lida":"Marcar como lida"}</button></div>`).join("") : "<p>Nenhuma notificação.</p>";
}
window.readNotif=(id)=>{ const n=state.notifications.find(x=>x.id===id); if(n)n.read=true; save(); renderNotifications(); updateBadge(); };

function label(s){
  return ({
    passageiro:"Passageiro", motorista:"Motorista", admin:"Admin",
    pendente_aprovacao:"Pendente aprovação", aprovado:"Aprovado", rejeitado:"Rejeitado", suspenso:"Suspenso",
    online:"Online", offline:"Offline", ocupado:"Ocupado",
    aguardando_motorista:"Aguardando motorista", aguardando_pagamento_cliente:"Aguardando pagamento do passageiro",
    pagamento_cliente_confirmado:"Pagamento confirmado", viagem_em_andamento:"Corrida em andamento",
    aguardando_pagamento_motorista:"Aguardando pagamento do motorista", finalizada:"Finalizada", cancelada:"Cancelada"
  })[s]||s;
}

(function seedAdmin(){
  if(!state.users.find(u=>u.email===ADMIN_EMAIL)){
    state.users.push({id:uid("ADM"),role:"admin",name:"Vanderson",email:ADMIN_EMAIL,phone:"",city:"Claremorris",password:"1234",createdAt:now()});
    save();
  }
})();
render();
