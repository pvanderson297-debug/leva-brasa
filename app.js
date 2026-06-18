const origin = document.querySelector("#origin");
const destination = document.querySelector("#destination");
const passengers = document.querySelector("#passengers");
const time = document.querySelector("#time");
const bags = document.querySelector("#bags");
const distanceText = document.querySelector("#distanceText");
const priceText = document.querySelector("#priceText");
const clientPriceText = document.querySelector("#clientPriceText");
const driverPriceText = document.querySelector("#driverPriceText");
const commissionText = document.querySelector("#commissionText");
const noteText = document.querySelector("#noteText");
const bookRideButton = document.querySelector("#bookRideButton");
const shareBtn = document.querySelector("#shareBtn");
const routeMapLink = document.querySelector("#routeMapLink");
const tripsList = document.querySelector("#tripsList");
const toast = document.querySelector("#toast");
const tabs = document.querySelectorAll(".tab");
const onlineCountText = document.querySelector("#onlineCountText");
const sessionLabel = document.querySelector("#sessionLabel");
const sessionHint = document.querySelector("#sessionHint");
const sessionLogoutButton = document.querySelector("#sessionLogoutButton");
const signupTabs = document.querySelectorAll(".signup-tab");
const signupName = document.querySelector("#signupName");
const signupPhone = document.querySelector("#signupPhone");
const signupTown = document.querySelector("#signupTown");
const signupPassword = document.querySelector("#signupPassword");
const signupPasswordConfirm = document.querySelector("#signupPasswordConfirm");
const signupLink = document.querySelector("#signupLink");
const passengerLoginPhone = document.querySelector("#passengerLoginPhone");
const passengerLoginPassword = document.querySelector("#passengerLoginPassword");
const passengerLoginButton = document.querySelector("#passengerLoginButton");
const vehicleFields = document.querySelector("#vehicleFields");
const vehicleBrand = document.querySelector("#vehicleBrand");
const vehicleModel = document.querySelector("#vehicleModel");
const vehiclePlate = document.querySelector("#vehiclePlate");
const driverLogin = document.querySelector("#driverLogin");
const driverContent = document.querySelector("#driverContent");
const driverLoginPhone = document.querySelector("#driverLoginPhone");
const driverLoginPassword = document.querySelector("#driverLoginPassword");
const driverLoginButton = document.querySelector("#driverLoginButton");
const driverLogoutButton = document.querySelector("#driverLogoutButton");
const driverTripsList = document.querySelector("#driverTripsList");
const adminLogin = document.querySelector("#adminLogin");
const adminContent = document.querySelector("#adminContent");
const adminPassword = document.querySelector("#adminPassword");
const adminLoginButton = document.querySelector("#adminLoginButton");
const adminLogoutButton = document.querySelector("#adminLogoutButton");
const adminClientCount = document.querySelector("#adminClientCount");
const adminDriverCount = document.querySelector("#adminDriverCount");
const adminOnlineCount = document.querySelector("#adminOnlineCount");
const adminUsersList = document.querySelector("#adminUsersList");
const adminDriversList = document.querySelector("#adminDriversList");
const adminTripsList = document.querySelector("#adminTripsList");

const baseFare = 8;
const perKmFare = 1;
const minimumFare = 12;
const bagFee = 0;
const airportFee = 8;
const scheduleFee = 5;
const commissionRate = 0.15;
const paymentName = "Leva Brasa";
const paymentIban = "COLOCAR_IBAN_AQUI";
const paymentPhone = "COLOCAR_TELEFONE_AQUI";
const legacyDriversStorageKey = "bora40Drivers";
const legacyUsersStorageKey = "bora40Users";
const driversStorageKey = "levaBrasaDrivers";
const usersStorageKey = "levaBrasaUsers";
const tripsStorageKey = "levaBrasaTrips";
const sessionStorageKey = "levaBrasaSession";
const airports = ["Ireland West Airport Knock", "Shannon Airport", "Dublin Airport", "Cork Airport"];
const apiEnabled = window.location.protocol === "http:" || window.location.protocol === "https:";
const adminPasswordValue = "151012";
let adminUnlocked = false;
let currentSession = loadSession();

const distances = {
  "Claremorris|Knock Airport": 31,
  "Claremorris|Ireland West Airport Knock": 31,
  "Claremorris|Shannon Airport": 151,
  "Claremorris|Dublin Airport": 218,
  "Claremorris|Cork Airport": 278,
  "Claremorris|Castlebar": 27,
  "Claremorris|Ballinrobe": 24,
  "Claremorris|Westport": 43,
  "Claremorris|Swinford": 25,
  "Castlebar|Ireland West Airport Knock": 47,
  "Castlebar|Knock Airport": 47,
  "Castlebar|Shannon Airport": 173,
  "Castlebar|Dublin Airport": 240,
  "Castlebar|Cork Airport": 300,
  "Castlebar|Ballinrobe": 39,
  "Castlebar|Westport": 18,
  "Knock|Knock Airport": 20,
  "Knock|Ireland West Airport Knock": 20,
  "Knock|Shannon Airport": 145,
  "Knock|Dublin Airport": 211,
  "Knock|Cork Airport": 273,
  "Knock|Claremorris": 11,
  "Ballinrobe|Ireland West Airport Knock": 43,
  "Ballinrobe|Knock Airport": 43,
  "Ballinrobe|Shannon Airport": 130,
  "Ballinrobe|Dublin Airport": 232,
  "Ballinrobe|Cork Airport": 252,
  "Swinford|Ireland West Airport Knock": 21,
  "Swinford|Knock Airport": 21
};

let mode = "now";
let signupType = "passageiro";

function loadDrivers() {
  try {
    const drivers = localStorage.getItem(driversStorageKey) || localStorage.getItem(legacyDriversStorageKey);
    return JSON.parse(drivers) || [];
  } catch {
    return [];
  }
}

function saveDrivers(drivers) {
  localStorage.setItem(driversStorageKey, JSON.stringify(drivers));
  saveCollectionToApi("drivers", drivers);
}

function loadUsers() {
  try {
    const users = localStorage.getItem(usersStorageKey) || localStorage.getItem(legacyUsersStorageKey);
    return JSON.parse(users) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
  saveCollectionToApi("users", users);
}

function loadTrips() {
  try {
    return JSON.parse(localStorage.getItem(tripsStorageKey)) || [];
  } catch {
    return [];
  }
}

function saveTrips(trips) {
  localStorage.setItem(tripsStorageKey, JSON.stringify(trips));
  saveCollectionToApi("trips", trips);
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(sessionStorageKey)) || null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  currentSession = session;
  localStorage.setItem(sessionStorageKey, JSON.stringify(session));
  renderSession();
  renderTrips();
  renderDriverArea();
}

function clearSession() {
  currentSession = null;
  localStorage.removeItem(sessionStorageKey);
  renderSession();
  renderTrips();
  renderDriverArea();
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function findUserByPhone(phone, type) {
  const normalizedPhone = normalizePhone(phone);
  return loadUsers().find((user) => {
    const samePhone = normalizePhone(user.telefone) === normalizedPhone;
    return samePhone && (!type || user.tipo === type);
  });
}

function findDriverByPhone(phone) {
  const normalizedPhone = normalizePhone(phone);
  return loadDrivers().find((driver) => normalizePhone(driver.telefone) === normalizedPhone);
}

function renderSession() {
  if (!sessionLabel || !sessionHint || !sessionLogoutButton) return;

  if (!currentSession) {
    sessionLabel.textContent = "Visitante";
    sessionHint.textContent = "Cadastre-se ou entre para usar o app.";
    sessionLogoutButton.style.display = "none";
    return;
  }

  const role = currentSession.role === "motorista" ? "Motorista" : "Passageiro";
  sessionLabel.textContent = `${role}: ${currentSession.name}`;
  sessionHint.textContent = currentSession.role === "motorista"
    ? "Area do motorista liberada neste aparelho."
    : "Suas viagens aparecem somente para voce.";
  sessionLogoutButton.style.display = "grid";
}

async function saveCollectionToApi(collection, items) {
  if (!apiEnabled) return;

  try {
    await fetch(`/api/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
  } catch {
    showToast("Salvo neste aparelho");
  }
}

async function syncFromApi() {
  if (!apiEnabled) return false;

  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) return false;
    const state = await response.json();

    if (Array.isArray(state.users)) localStorage.setItem(usersStorageKey, JSON.stringify(state.users));
    if (Array.isArray(state.drivers)) localStorage.setItem(driversStorageKey, JSON.stringify(state.drivers));
    if (Array.isArray(state.trips)) localStorage.setItem(tripsStorageKey, JSON.stringify(state.trips));

    renderAdminUsers();
    refreshDriversState();
    renderTrips();
    renderDriverArea();
    return true;
  } catch {
    return false;
  }
}

function updateAdminVisibility() {
  if (!adminLogin || !adminContent) return;
  adminLogin.style.display = adminUnlocked ? "none" : "grid";
  adminContent.classList.toggle("show", adminUnlocked);
}

function updateAdminStats() {
  if (!adminUnlocked) return;

  const users = loadUsers();
  const drivers = loadDrivers();
  const clients = users.filter((user) => user.tipo === "passageiro");
  const onlineDrivers = drivers.filter((driver) => driver.ativo && driver.online);

  if (adminClientCount) adminClientCount.textContent = clients.length;
  if (adminDriverCount) adminDriverCount.textContent = drivers.length;
  if (adminOnlineCount) adminOnlineCount.textContent = onlineDrivers.length;
}

async function hashPassword(password) {
  if (!window.crypto || !window.crypto.subtle) {
    return btoa(unescape(encodeURIComponent(password)));
  }

  const encoded = new TextEncoder().encode(password);
  const buffer = await window.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validatePasswordFields() {
  const password = signupPassword.value;
  const confirm = signupPasswordConfirm.value;

  if (password.length < 4) {
    showToast("Senha minima 4 digitos");
    return false;
  }

  if (password !== confirm) {
    showToast("Senhas diferentes");
    return false;
  }

  return true;
}

async function saveUserAccount(type) {
  const users = loadUsers();
  const phone = signupPhone.value.trim();
  const normalizedPhone = normalizePhone(phone);
  const existingIndex = users.findIndex((user) => normalizePhone(user.telefone) === normalizedPhone);
  const user = {
    tipo: type,
    nome: signupName.value.trim(),
    telefone: phone,
    cidade: signupTown.value,
    status: type === "motorista" ? "aguardando" : "ativo",
    senhaHash: await hashPassword(signupPassword.value),
    criadoEm: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...user };
  } else {
    users.push(user);
  }

  saveUsers(users);
  renderAdminUsers();
  return user;
}

function renderAdminUsers() {
  if (!adminUsersList || !adminUnlocked) return;
  updateAdminStats();

  const passengers = loadUsers().filter((user) => user.tipo === "passageiro");
  if (!passengers.length) {
    adminUsersList.innerHTML = '<span class="empty-state">Nenhum passageiro cadastrado.</span>';
    return;
  }

  adminUsersList.innerHTML = passengers
    .map((user) => `
      <article class="admin-user-card">
        <div>
          <strong>${escapeHtml(user.nome)}</strong>
          <b>${escapeHtml(user.status || "ativo")}</b>
        </div>
        <span>${escapeHtml(user.telefone)} - ${escapeHtml(user.cidade)}</span>
      </article>
    `)
    .join("");
}

function updateOnlineCount() {
  const activeOnlineDrivers = loadDrivers().filter((driver) => driver.ativo && driver.online);
  const count = activeOnlineDrivers.length;
  onlineCountText.textContent = count === 1 ? "1 motorista online" : `${count} motoristas online`;
}

function renderAdminDrivers() {
  if (!adminDriversList || !adminUnlocked) return;
  updateAdminStats();

  const drivers = loadDrivers();
  if (!drivers.length) {
    adminDriversList.innerHTML = '<span class="empty-state">Nenhum motorista cadastrado.</span>';
    return;
  }

  adminDriversList.innerHTML = drivers
    .map((driver, index) => {
      const approvalText = driver.ativo ? "Aprovado" : "Aguardando";
      const onlineText = driver.online ? "Online" : "Offline";
      const approvalButton = driver.ativo ? "Pausar" : "Aprovar";
      const onlineButton = driver.online ? "Ficar offline" : "Ficar online";
      const vehicle = driver.veiculo
        ? `${driver.veiculo.marca} ${driver.veiculo.modelo} · ${driver.veiculo.placa}`
        : "Veiculo nao informado";

      return `
        <article class="admin-driver-card">
          <div>
            <strong>${escapeHtml(driver.nome)}</strong>
            <b>${escapeHtml(approvalText)}</b>
          </div>
          <span>${escapeHtml(driver.telefone)} · ${escapeHtml(driver.cidade)} · ${escapeHtml(onlineText)}</span>
          <span>${escapeHtml(vehicle)}</span>
          <div class="admin-actions">
            <button type="button" data-driver-action="approval" data-driver-index="${index}">${approvalButton}</button>
            <button type="button" data-driver-action="online" data-driver-index="${index}">${onlineButton}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function refreshDriversState() {
  updateOnlineCount();
  renderAdminUsers();
  renderAdminDrivers();
  renderDriverArea();
}

function estimateArrivalMinutes(distance) {
  if (distance <= 20) return 8;
  if (distance <= 45) return 15;
  if (distance <= 120) return 35;
  return 55;
}

function currentRideSplit() {
  const distance = estimateDistance();
  const extraAirport = mode === "airport" ? airportFee : 0;
  const extraSchedule = mode === "later" ? scheduleFee : 0;
  const clientPrice = Math.max(minimumFare, Math.round(baseFare + distance * perKmFare + extraAirport + extraSchedule));
  return { distance, split: calculateSplit(clientPrice) };
}

function statusLabel(trip) {
  if (trip.status === "solicitada") return "Solicitada";
  if (trip.status === "motorista_designado") return "Motorista designado";
  if (trip.status === "motorista_chegando") return `Motorista chegando · ${trip.etaMinutes} min`;
  if (trip.status === "em_andamento") return "Em andamento";
  if (trip.status === "finalizada") return "Finalizada";
  if (trip.status === "cancelada") return "Cancelada";
  return "Pendente";
}

function paymentLabel(trip) {
  if (trip.paymentStatus === "recebido") return "Pagamento recebido";
  if (trip.paymentStatus === "aguardando_confirmacao") return "Aguardando confirmacao do suporte";
  return "Aguardando transferencia";
}

function activeOnlineDriver() {
  return loadDrivers().find((driver) => driver.ativo && driver.online);
}

function renderTrips() {
  const trips = loadTrips().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (tripsList) {
    if (currentSession && currentSession.role === "passageiro") {
      const clientTrips = trips.filter((trip) => normalizePhone(trip.clientPhone) === normalizePhone(currentSession.phone));
      tripsList.innerHTML = clientTrips.length
        ? clientTrips.map((trip) => renderTripCard(trip, "client")).join("")
        : '<span class="empty-state">Nenhuma viagem solicitada.</span>';
    } else {
      tripsList.innerHTML = '<span class="empty-state">Entre ou cadastre-se como passageiro para ver suas viagens.</span>';
    }
  }

  if (adminTripsList) {
    adminTripsList.innerHTML = adminUnlocked && trips.length
      ? trips.map((trip) => renderTripCard(trip, "support")).join("")
      : '<span class="empty-state">Nenhuma viagem pendente.</span>';
  }
}

function renderDriverArea() {
  if (!driverLogin || !driverContent || !driverTripsList) return;

  const isDriver = currentSession && currentSession.role === "motorista";
  driverLogin.style.display = isDriver ? "none" : "grid";
  driverContent.classList.toggle("show", Boolean(isDriver));

  if (!isDriver) {
    driverTripsList.innerHTML = '<span class="empty-state">Entre como motorista para ver corridas.</span>';
    return;
  }

  const driver = findDriverByPhone(currentSession.phone);
  if (!driver || !driver.ativo) {
    driverTripsList.innerHTML = '<span class="empty-state">Cadastro aguardando aprovacao do suporte.</span>';
    return;
  }

  const trips = loadTrips().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const driverTrips = trips.filter((trip) => {
    const isMine = normalizePhone(trip.driverPhone) === normalizePhone(currentSession.phone);
    return isMine;
  });

  driverTripsList.innerHTML = driverTrips.length
    ? driverTrips.map((trip) => renderTripCard(trip, "driver")).join("")
    : '<span class="empty-state">Nenhuma corrida disponivel.</span>';
}

function renderTripCard(trip, viewMode = "client") {
  const adminMode = viewMode === "support";
  const driverMode = viewMode === "driver";
  const driverText = trip.driverName ? `Motorista: ${trip.driverName}` : "Motorista: aguardando confirmacao";
  const tripDate = new Date(trip.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  let actions = "";

  if (adminMode) {
    actions = `
      <div class="trip-actions">
        <button type="button" data-trip-action="assign" data-trip-id="${trip.id}">Atribuir</button>
        <button type="button" data-trip-action="arriving" data-trip-id="${trip.id}">Chegando</button>
        <button type="button" data-trip-action="minus" data-trip-id="${trip.id}">-5 min</button>
        <button type="button" data-trip-action="payment" data-trip-id="${trip.id}">Confirmar pagamento</button>
        <button type="button" data-trip-action="finish" data-trip-id="${trip.id}">Finalizar</button>
      </div>
    `;
  }

  if (driverMode) {
    actions = `
      <div class="trip-actions">
        <button type="button" data-driver-trip-action="arriving" data-trip-id="${trip.id}">Chegando</button>
        <button type="button" data-driver-trip-action="minus" data-trip-id="${trip.id}">-5 min</button>
        <button type="button" data-driver-trip-action="finish" data-trip-id="${trip.id}">Finalizar</button>
      </div>
    `;
  }
  const progress = trip.status === "finalizada"
    ? 100
    : trip.status === "em_andamento"
      ? 82
      : trip.status === "motorista_chegando"
        ? Math.min(78, Math.max(22, 84 - trip.etaMinutes))
        : trip.status === "motorista_designado"
          ? 20
          : 12;
  const mapText = trip.status === "motorista_chegando"
    ? `Motorista chegando em ${trip.etaMinutes} min`
    : driverText;
  const clientChat = driverMode ? "" : renderChatBox(trip, "client", adminMode ? "Chat com cliente" : "Chat com Leva Brasa", adminMode ? "admin" : "cliente");
  const driverChat = adminMode
    ? renderChatBox(trip, "driver", "Chat com motorista", "admin")
    : driverMode
      ? renderChatBox(trip, "driver", "Chat com Leva Brasa", "motorista")
      : "";
  const paymentBox = viewMode === "client" ? renderClientPaymentBox(trip) : "";

  return `
    <article class="trip-card">
      <header>
        <strong>${escapeHtml(trip.origin)} → ${escapeHtml(trip.destination)}</strong>
        <span class="trip-status">${escapeHtml(statusLabel(trip))}</span>
      </header>
      <p>${escapeHtml(tripDate)} · ${escapeHtml(trip.time)} · ${trip.passengers} pessoas · ${trip.distance} km</p>
      ${adminMode && trip.clientName ? `<p>Cliente: ${escapeHtml(trip.clientName)} - ${escapeHtml(trip.clientPhone || "")}</p>` : ""}
      <p>${escapeHtml(driverText)}</p>
      <div class="trip-mini-map" style="--progress: ${progress}%">
        <i class="trip-pin start"></i>
        <i class="trip-car"></i>
        <i class="trip-pin end"></i>
        <span>${escapeHtml(mapText)}</span>
      </div>
      <div class="trip-money">
        <span>Cliente paga <b>EUR ${trip.clientPrice}</b></span>
        <span>Motorista recebe <b>EUR ${trip.driverPrice}</b></span>
        ${adminMode ? `<span>Comissao Leva Brasa <b>EUR ${trip.commission}</b></span>` : ""}
      </div>
      <p>${escapeHtml(paymentLabel(trip))}</p>
      ${paymentBox}
      ${clientChat}
      ${driverChat}
      ${actions}
    </article>
  `;
}

function paymentReference(trip) {
  return `${trip.clientName || "Cliente"} - ${trip.destination}`;
}

function formatPaymentDetails(trip) {
  return `Pagamento Leva Brasa\nValor total: EUR ${trip.clientPrice}\nNome: ${paymentName}\nIBAN: ${paymentIban}\nRevolut/Telefone: ${paymentPhone}\nReferencia: ${paymentReference(trip)}`;
}

function renderClientPaymentBox(trip) {
  return `
    <div class="payment-box">
      <strong>Pagamento</strong>
      <span>Valor total da viagem: <b>EUR ${trip.clientPrice}</b></span>
      <p>Faca o pagamento por transferencia antes da viagem.</p>
      <span>Nome: <b>${escapeHtml(paymentName)}</b></span>
      <span>IBAN: <b>${escapeHtml(paymentIban)}</b></span>
      <span>Revolut/Telefone: <b>${escapeHtml(paymentPhone)}</b></span>
      <span>Referencia: <b>${escapeHtml(paymentReference(trip))}</b></span>
      <div class="payment-actions">
        <button type="button" data-payment-action="copy" data-trip-id="${trip.id}">Copiar dados de pagamento</button>
        <button type="button" data-payment-action="sent" data-trip-id="${trip.id}">Ja fiz o pagamento</button>
      </div>
    </div>
  `;
}

function renderChatBox(trip, channel, title, senderRole) {
  const messages = (trip.messages || []).filter((message) => (message.channel || "client") === channel);
  const chatMessages = messages
    .map((message) => `
      <div class="chat-message ${message.role === "admin" ? "admin" : ""}">
        <b>${message.role === "admin" ? "Leva Brasa" : message.role === "motorista" ? "Motorista" : "Cliente"}</b>
        ${escapeHtml(message.text)}
      </div>
    `)
    .join("") || '<span class="empty-state">Sem mensagens ainda.</span>';

  return `
    <div class="trip-chat">
      <strong>${escapeHtml(title)}</strong>
      <div class="chat-log">${chatMessages}</div>
      <div class="chat-form">
        <input type="text" placeholder="Mensagem" data-chat-input="${trip.id}-${channel}-${senderRole}" />
        <button type="button" data-chat-role="${senderRole}" data-chat-channel="${channel}" data-chat-trip="${trip.id}">Enviar</button>
      </div>
    </div>
  `;
}

function createTrip() {
  if (!currentSession || currentSession.role !== "passageiro") {
    showToast("Entre como passageiro para pedir");
    return;
  }

  const { distance, split } = currentRideSplit();
  const trip = {
    id: `LB-${Date.now()}`,
    clientName: currentSession.name,
    clientPhone: currentSession.phone,
    origin: origin.value,
    destination: destination.value,
    time: time.value,
    passengers: Number(passengers.value || 1),
    hasBags: bags.checked,
    distance,
    clientPrice: split.clientPrice,
    driverPrice: split.driverPrice,
    commission: split.commission,
    paymentStatus: "aguardando",
    messages: [],
    status: "solicitada",
    etaMinutes: estimateArrivalMinutes(distance),
    driverName: "",
    driverPhone: "",
    createdAt: new Date().toISOString()
  };

  const trips = loadTrips();
  trips.push(trip);
  saveTrips(trips);
  renderTrips();
  renderDriverArea();
  showToast("Viagem solicitada no app");
}

function updateTrip(tripId, updater) {
  const trips = loadTrips();
  const trip = trips.find((item) => item.id === tripId);
  if (!trip) return;
  updater(trip);
  trip.updatedAt = new Date().toISOString();
  saveTrips(trips);
  renderTrips();
  renderDriverArea();
}

function addTripMessage(tripId, role, channel, text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  updateTrip(tripId, (trip) => {
    trip.messages = trip.messages || [];
    trip.messages.push({
      channel,
      role,
      text: cleanText,
      createdAt: new Date().toISOString()
    });
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
}

function handleTripListClick(event) {
  const chatButton = event.target && event.target.closest ? event.target.closest("button[data-chat-trip]") : null;
  if (!chatButton) return false;

  const tripId = chatButton.dataset.chatTrip;
  const role = chatButton.dataset.chatRole;
  const channel = chatButton.dataset.chatChannel || "client";
  const input = document.querySelector(`[data-chat-input="${tripId}-${channel}-${role}"]`);
  if (!input) return true;

  addTripMessage(tripId, role, channel, input.value);
  input.value = "";
  return true;
}

function handleClientPaymentClick(event) {
  const button = event.target && event.target.closest ? event.target.closest("button[data-payment-action]") : null;
  if (!button) return false;

  const tripId = button.dataset.tripId;
  const trip = loadTrips().find((item) => item.id === tripId);
  if (!trip) return true;

  if (button.dataset.paymentAction === "copy") {
    copyText(formatPaymentDetails(trip)).then(() => showToast("Dados de pagamento copiados"));
  }

  if (button.dataset.paymentAction === "sent") {
    updateTrip(tripId, (item) => {
      item.paymentStatus = "aguardando_confirmacao";
    });
    showToast("Pagamento aguardando suporte");
  }

  return true;
}

function estimateDistance() {
  if (origin.value === destination.value) return 5;
  const direct = distances[`${origin.value}|${destination.value}`];
  const reverse = distances[`${destination.value}|${origin.value}`];
  if (direct || reverse) return direct || reverse;
  return 32;
}

function calculateSplit(clientPrice) {
  const commission = Math.round(clientPrice * commissionRate);
  return {
    clientPrice,
    commission,
    driverPrice: clientPrice - commission
  };
}

function formatClientRideMessage(distance, split) {
  const bagText = bags.checked ? "Sim" : "Nao";
  const modeText = {
    now: "Agora",
    later: "Agendada",
    airport: "Aeroporto"
  }[mode];

  return `Oi, Leva Brasa! Quero uma corrida.\nTipo: ${modeText}\nOrigem: ${origin.value}\nDestino: ${destination.value}\nHorario: ${time.value}\nPessoas: ${passengers.value}\nMalas/compras: ${bagText}\nDistancia aprox.: ${distance} km\nValor da corrida: EUR ${split.clientPrice}\nMotorista recebe: EUR ${split.driverPrice}\nPagamento: transferencia para Leva Brasa apos confirmacao.`;
}

function formatInternalRideMessage(distance, split) {
  return `${formatClientRideMessage(distance, split)}\n\nControle interno:\nMotorista recebe: EUR ${split.driverPrice}\nComissao Leva Brasa: EUR ${split.commission}\nCliente paga para Leva Brasa; Leva Brasa repassa ao motorista por transferencia.`;
}

function buildRouteMapLink() {
  const from = `${origin.value}, Ireland`;
  const to = `${destination.value}, Ireland`;
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=driving`;
}

function updateEstimate() {
  const { distance, split } = currentRideSplit();
  const minutes = distance <= 18 ? 8 : distance <= 30 ? 12 : 18;

  distanceText.textContent = `${distance} km`;
  priceText.textContent = `EUR ${split.clientPrice}`;
  if (clientPriceText) clientPriceText.textContent = `EUR ${split.clientPrice}`;
  if (driverPriceText) driverPriceText.textContent = `EUR ${split.driverPrice}`;
  if (commissionText) commissionText.textContent = `EUR ${split.commission}`;
  noteText.textContent = `Base EUR ${baseFare} + EUR ${perKmFare}/km. Minimo EUR ${minimumFare}. Motorista em ${minutes} min.`;
  if (routeMapLink) routeMapLink.href = buildRouteMapLink();
}

function updateSignupLink() {
  signupLink.href = "#";
  if (vehicleFields) vehicleFields.classList.toggle("show", signupType === "motorista");
}

function showToast(message = "Pedido copiado") {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1700);
}

async function loginDriver() {
  const phone = driverLoginPhone ? driverLoginPhone.value.trim() : "";
  const password = driverLoginPassword ? driverLoginPassword.value : "";

  if (!phone || !password) {
    showToast("Informe telefone e senha");
    return;
  }

  const user = findUserByPhone(phone, "motorista");
  if (!user || user.senhaHash !== await hashPassword(password)) {
    showToast("Login do motorista incorreto");
    return;
  }

  const driver = findDriverByPhone(phone);
  if (!driver) {
    showToast("Motorista sem cadastro");
    return;
  }

  saveSession({ role: "motorista", name: user.nome, phone: user.telefone });
  if (driver.ativo) {
    showToast("Motorista conectado");
  } else {
    showToast("Aguardando aprovacao");
  }

  if (driverLoginPassword) driverLoginPassword.value = "";
}

async function loginPassenger() {
  const phone = passengerLoginPhone ? passengerLoginPhone.value.trim() : "";
  const password = passengerLoginPassword ? passengerLoginPassword.value : "";

  if (!phone || !password) {
    showToast("Informe telefone e senha");
    return;
  }

  const user = findUserByPhone(phone, "passageiro");
  if (!user || user.senhaHash !== await hashPassword(password)) {
    showToast("Login do passageiro incorreto");
    return;
  }

  saveSession({ role: "passageiro", name: user.nome, phone: user.telefone });
  if (passengerLoginPassword) passengerLoginPassword.value = "";
  showToast("Passageiro conectado");
}

async function registerDriver() {
  const name = signupName.value.trim();
  const phone = signupPhone.value.trim();
  const brand = vehicleBrand ? vehicleBrand.value.trim() : "";
  const model = vehicleModel ? vehicleModel.value.trim() : "";
  const plate = vehiclePlate ? vehiclePlate.value.trim() : "";

  if (!name || !phone || !brand || !model || !plate) {
    showToast("Preencha motorista e veiculo");
    return;
  }

  if (!validatePasswordFields()) return;

  const drivers = loadDrivers();
  const normalizedPhone = normalizePhone(phone);
  const existingIndex = drivers.findIndex((driver) => normalizePhone(driver.telefone) === normalizedPhone);
  const driver = {
    nome: name,
    telefone: phone,
    cidade: signupTown.value,
    veiculo: {
      marca: brand,
      modelo: model,
      placa: plate.toUpperCase()
    },
    status: "aguardando",
    ativo: false,
    online: false,
    atualizadoEm: new Date().toISOString()
  };

  try {
    await saveUserAccount("motorista");
  } catch {
    showToast("Erro ao salvar cadastro");
    return;
  }

  if (existingIndex >= 0) {
    drivers[existingIndex] = { ...drivers[existingIndex], ...driver };
  } else {
    drivers.push(driver);
  }

  saveDrivers(drivers);
  refreshDriversState();
  saveSession({ role: "motorista", name, phone });
  showToast("Motorista aguardando aprovacao");
  signupName.value = "";
  signupPhone.value = "";
  signupPassword.value = "";
  signupPasswordConfirm.value = "";
  if (vehicleBrand) vehicleBrand.value = "";
  if (vehicleModel) vehicleModel.value = "";
  if (vehiclePlate) vehiclePlate.value = "";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    mode = tab.dataset.mode;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    updateEstimate();
  });
});

[origin, destination, passengers, time, bags].forEach((field) => {
  field.addEventListener("input", updateEstimate);
  field.addEventListener("change", updateEstimate);
});

signupTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    signupType = tab.dataset.signup;
    signupTabs.forEach((item) => item.classList.toggle("active", item === tab));
    updateSignupLink();
  });
});

[signupName, signupPhone, signupTown].forEach((field) => {
  field.addEventListener("input", updateSignupLink);
  field.addEventListener("change", updateSignupLink);
});

[signupPassword, signupPasswordConfirm].forEach((field) => {
  field.addEventListener("input", updateSignupLink);
});

[vehicleBrand, vehicleModel, vehiclePlate].filter(Boolean).forEach((field) => {
  field.addEventListener("input", updateSignupLink);
  field.addEventListener("change", updateSignupLink);
});

if (adminDriversList) {
  adminDriversList.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest("button[data-driver-action]") : null;
    if (!button) return;

    const drivers = loadDrivers();
    const driver = drivers[Number(button.dataset.driverIndex)];
    if (!driver) return;

    if (button.dataset.driverAction === "approval") {
      driver.ativo = !driver.ativo;
      driver.status = driver.ativo ? "ativo" : "pausado";
      if (!driver.ativo) driver.online = false;
    }

    if (button.dataset.driverAction === "online" && driver.ativo) {
      driver.online = !driver.online;
    }

    driver.atualizadoEm = new Date().toISOString();
    saveDrivers(drivers);
    refreshDriversState();
  });
}

if (adminTripsList) {
  adminTripsList.addEventListener("click", (event) => {
    if (handleTripListClick(event)) return;

    const button = event.target && event.target.closest ? event.target.closest("button[data-trip-action]") : null;
    if (!button) return;

    updateTrip(button.dataset.tripId, (trip) => {
      if (button.dataset.tripAction === "assign") {
        const driver = activeOnlineDriver();
        trip.driverName = driver ? driver.nome : "A definir";
        trip.driverPhone = driver ? driver.telefone : "";
        trip.status = "motorista_designado";
      }

      if (button.dataset.tripAction === "arriving") {
        if (!trip.driverName) {
          const driver = activeOnlineDriver();
          trip.driverName = driver ? driver.nome : "A definir";
          trip.driverPhone = driver ? driver.telefone : "";
        }
        trip.status = "motorista_chegando";
        trip.etaMinutes = trip.etaMinutes || estimateArrivalMinutes(trip.distance);
      }

      if (button.dataset.tripAction === "minus") {
        trip.status = "motorista_chegando";
        trip.etaMinutes = Math.max(1, (trip.etaMinutes || estimateArrivalMinutes(trip.distance)) - 5);
      }

      if (button.dataset.tripAction === "payment") {
        trip.paymentStatus = "recebido";
      }

      if (button.dataset.tripAction === "finish") {
        trip.status = "finalizada";
        trip.etaMinutes = 0;
      }
    });
  });
}

if (driverTripsList) {
  driverTripsList.addEventListener("click", (event) => {
    if (handleTripListClick(event)) return;

    const button = event.target && event.target.closest ? event.target.closest("button[data-driver-trip-action]") : null;
    if (!button || !currentSession || currentSession.role !== "motorista") return;

    const driver = findDriverByPhone(currentSession.phone);
    if (!driver || !driver.ativo) {
      showToast("Aguardando aprovacao");
      return;
    }

    updateTrip(button.dataset.tripId, (trip) => {
      const mine = normalizePhone(trip.driverPhone) === normalizePhone(currentSession.phone);
      if (trip.driverPhone && !mine) return;

      if (button.dataset.driverTripAction === "arriving") {
        trip.status = "motorista_chegando";
        trip.etaMinutes = trip.etaMinutes || estimateArrivalMinutes(trip.distance);
      }

      if (button.dataset.driverTripAction === "minus") {
        trip.status = "motorista_chegando";
        trip.etaMinutes = Math.max(1, (trip.etaMinutes || estimateArrivalMinutes(trip.distance)) - 5);
      }

      if (button.dataset.driverTripAction === "finish") {
        trip.status = "finalizada";
        trip.etaMinutes = 0;
      }
    });
  });
}

if (tripsList) {
  tripsList.addEventListener("click", (event) => {
    if (handleClientPaymentClick(event)) return;
    handleTripListClick(event);
  });
}

if (bookRideButton) {
  bookRideButton.addEventListener("click", createTrip);
}

if (passengerLoginButton) {
  passengerLoginButton.addEventListener("click", loginPassenger);
}

if (driverLoginButton) {
  driverLoginButton.addEventListener("click", loginDriver);
}

if (driverLogoutButton) {
  driverLogoutButton.addEventListener("click", () => {
    clearSession();
    showToast("Motorista saiu");
  });
}

if (sessionLogoutButton) {
  sessionLogoutButton.addEventListener("click", () => {
    clearSession();
    showToast("Conta saiu");
  });
}

if (adminLoginButton) {
  adminLoginButton.addEventListener("click", () => {
    if (adminPassword.value !== adminPasswordValue) {
      showToast("Senha suporte incorreta");
      return;
    }

    adminUnlocked = true;
    updateAdminVisibility();
    renderAdminUsers();
    renderAdminDrivers();
    renderTrips();
    showToast("Painel liberado");
  });
}

if (adminLogoutButton) {
  adminLogoutButton.addEventListener("click", () => {
    adminUnlocked = false;
    if (adminPassword) adminPassword.value = "";
    updateAdminVisibility();
    showToast("Suporte bloqueado");
  });
}

signupLink.addEventListener("click", (event) => {
  if (signupType === "motorista") {
    event.preventDefault();
    registerDriver();
    return;
  }

  event.preventDefault();
  if (!signupName.value.trim() || !signupPhone.value.trim()) {
    showToast("Informe nome e telefone");
    return;
  }

  if (!validatePasswordFields()) return;

  saveUserAccount("passageiro").then((user) => {
    saveSession({ role: "passageiro", name: user.nome, phone: user.telefone });
    showToast("Passageiro cadastrado");
    signupName.value = "";
    signupPhone.value = "";
    signupPassword.value = "";
    signupPasswordConfirm.value = "";
  }).catch(() => {
    showToast("Erro ao salvar cadastro");
  });
});

shareBtn.addEventListener("click", async () => {
  const distance = estimateDistance();
  const price = Number(priceText.textContent.replace("EUR ", ""));
  const message = formatClientRideMessage(distance, calculateSplit(price));

  await copyText(message);
  showToast();
});

updateEstimate();
updateSignupLink();
updateAdminVisibility();
renderSession();
renderAdminUsers();
refreshDriversState();
renderTrips();
renderDriverArea();
syncFromApi();

if (apiEnabled) {
  window.setInterval(syncFromApi, 5000);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
