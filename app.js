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
const notificationButton = document.querySelector("#notificationButton");
const notificationBadge = document.querySelector("#notificationBadge");
const notificationPanel = document.querySelector("#notificationPanel");
const notificationList = document.querySelector("#notificationList");
const sessionLabel = document.querySelector("#sessionLabel");
const sessionHint = document.querySelector("#sessionHint");
const sessionLogoutButton = document.querySelector("#sessionLogoutButton");
const signupTabs = document.querySelectorAll(".signup-tab");
const signupName = document.querySelector("#signupName");
const signupPhone = document.querySelector("#signupPhone");
const signupEmail = document.querySelector("#signupEmail");
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
const driverIban = document.querySelector("#driverIban");
const driverLicenseNumber = document.querySelector("#driverLicenseNumber");
const driverLicenseCategory = document.querySelector("#driverLicenseCategory");
const driverLicenseExpiry = document.querySelector("#driverLicenseExpiry");
const driverLicensePhoto = document.querySelector("#driverLicensePhoto");
const driverSelfie = document.querySelector("#driverSelfie");
const vehicleYear = document.querySelector("#vehicleYear");
const vehicleColor = document.querySelector("#vehicleColor");
const vehicleSeats = document.querySelector("#vehicleSeats");
const driverLogin = document.querySelector("#driverLogin");
const driverContent = document.querySelector("#driverContent");
const driverLoginPhone = document.querySelector("#driverLoginPhone");
const driverLoginPassword = document.querySelector("#driverLoginPassword");
const driverLoginButton = document.querySelector("#driverLoginButton");
const driverLogoutButton = document.querySelector("#driverLogoutButton");
const driverTripsList = document.querySelector("#driverTripsList");
const driverOnlineToggle = document.querySelector("#driverOnlineToggle");
const driverStatusText = document.querySelector("#driverStatusText");
const driverLocationText = document.querySelector("#driverLocationText");
const adminLogin = document.querySelector("#adminLogin");
const adminContent = document.querySelector("#adminContent");
const adminEmail = document.querySelector("#adminEmail");
const adminPassword = document.querySelector("#adminPassword");
const adminLoginButton = document.querySelector("#adminLoginButton");
const adminLogoutButton = document.querySelector("#adminLogoutButton");
const adminClientCount = document.querySelector("#adminClientCount");
const adminDriverCount = document.querySelector("#adminDriverCount");
const adminOnlineCount = document.querySelector("#adminOnlineCount");
const adminUsersList = document.querySelector("#adminUsersList");
const adminDriversList = document.querySelector("#adminDriversList");
const adminTripsList = document.querySelector("#adminTripsList");
const adminCitiesList = document.querySelector("#adminCitiesList");
const cityCountryInput = document.querySelector("#cityCountryInput");
const cityRegionInput = document.querySelector("#cityRegionInput");
const cityNameInput = document.querySelector("#cityNameInput");
const cityRadiusInput = document.querySelector("#cityRadiusInput");
const cityBaseFareInput = document.querySelector("#cityBaseFareInput");
const cityCurrencyInput = document.querySelector("#cityCurrencyInput");
const addCityButton = document.querySelector("#addCityButton");
const adminStatusFilter = document.querySelector("#adminStatusFilter");
const adminDateFilter = document.querySelector("#adminDateFilter");
const adminDriverFilter = document.querySelector("#adminDriverFilter");
const adminPassengerFilter = document.querySelector("#adminPassengerFilter");
const adminCountryFilter = document.querySelector("#adminCountryFilter");
const adminRegionFilter = document.querySelector("#adminRegionFilter");
const adminCityFilter = document.querySelector("#adminCityFilter");
const adminCityStatusFilter = document.querySelector("#adminCityStatusFilter");
const appNameInput = document.querySelector("#appNameInput");
const appLogoInput = document.querySelector("#appLogoInput");
const appPrimaryColorInput = document.querySelector("#appPrimaryColorInput");
const appSecondaryColorInput = document.querySelector("#appSecondaryColorInput");
const appDefaultCountryInput = document.querySelector("#appDefaultCountryInput");
const appDefaultCityInput = document.querySelector("#appDefaultCityInput");
const appAdminEmailInput = document.querySelector("#appAdminEmailInput");
const saveAppConfigButton = document.querySelector("#saveAppConfigButton");
const financeAccessText = document.querySelector("#financeAccessText");
const financeContent = document.querySelector("#financeContent");
const exportCsvButton = document.querySelector("#exportCsvButton");

const baseFare = 8;
const perKmFare = 1;
const minimumFare = 12;
const bagFee = 0;
const airportFee = 8;
const scheduleFee = 5;
const commissionRate = 0.15;
const paymentName = "Vanderson Pereira da Silva";
const paymentBank = "AIB";
const paymentIban = "IE31AIBK93744419731014";
const paymentPhone = "+353 89 415 1012";
const mainAdminEmail = "pvanderson297@gmail.com";
const radiusConfig = {
  initialKm: 5,
  secondKm: 10,
  thirdKm: 15,
  maxKm: 20,
  acceptSeconds: 60
};
const legacyDriversStorageKey = "bora40Drivers";
const legacyUsersStorageKey = "bora40Users";
const driversStorageKey = "levaBrasaDrivers";
const usersStorageKey = "levaBrasaUsers";
const tripsStorageKey = "levaBrasaTrips";
const sessionStorageKey = "levaBrasaSession";
const notificationsStorageKey = "levaBrasaNotifications";
const citiesStorageKey = "levaBrasaCities";
const appConfigStorageKey = "levaBrasaAppConfig";
const airports = ["Ireland West Airport Knock", "Shannon Airport", "Dublin Airport", "Cork Airport"];
const apiEnabled = window.location.protocol === "http:" || window.location.protocol === "https:";
const adminPasswordValue = "151012";
let adminUnlocked = false;
let adminIsMain = false;
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

const placeCoords = {
  "Claremorris": { lat: 53.721, lng: -8.998 },
  "Castlebar": { lat: 53.856, lng: -9.298 },
  "Knock": { lat: 53.790, lng: -8.917 },
  "Ireland West Airport Knock": { lat: 53.910, lng: -8.818 },
  "Shannon Airport": { lat: 52.702, lng: -8.925 },
  "Dublin Airport": { lat: 53.426, lng: -6.249 },
  "Cork Airport": { lat: 51.842, lng: -8.491 },
  "Ballinrobe": { lat: 53.633, lng: -9.226 },
  "Swinford": { lat: 53.944, lng: -8.951 },
  "Westport": { lat: 53.800, lng: -9.522 },
  "Outro ponto em Clare/Mayo": { lat: 53.721, lng: -8.998 },
  "Outra ate 40 km": { lat: 53.721, lng: -8.998 }
};

const defaultCities = [
  { id: "city-claremorris", pais: "Irlanda", estadoOuRegiao: "County Mayo", cidade: "Claremorris", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 8, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-castlebar", pais: "Irlanda", estadoOuRegiao: "County Mayo", cidade: "Castlebar", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 8, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-dublin", pais: "Irlanda", estadoOuRegiao: "Dublin", cidade: "Dublin", cidadeAtiva: false, raioPadraoKm: 20, taxaBaseCidade: 10, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-galway", pais: "Irlanda", estadoOuRegiao: "Galway", cidade: "Galway", cidadeAtiva: false, raioPadraoKm: 20, taxaBaseCidade: 9, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-porto", pais: "Portugal", estadoOuRegiao: "Porto", cidade: "Porto", cidadeAtiva: false, raioPadraoKm: 20, taxaBaseCidade: 8, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-goiania", pais: "Brasil", estadoOuRegiao: "Goias", cidade: "Goiania", cidadeAtiva: false, raioPadraoKm: 20, taxaBaseCidade: 15, moeda: "BRL", criadoEm: new Date().toISOString() },
  { id: "city-knock-airport", pais: "Irlanda", estadoOuRegiao: "County Mayo", cidade: "Ireland West Airport Knock", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 8, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-shannon-airport", pais: "Irlanda", estadoOuRegiao: "County Clare", cidade: "Shannon Airport", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 8, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-dublin-airport", pais: "Irlanda", estadoOuRegiao: "Dublin", cidade: "Dublin Airport", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 10, moeda: "EUR", criadoEm: new Date().toISOString() },
  { id: "city-cork-airport", pais: "Irlanda", estadoOuRegiao: "Cork", cidade: "Cork Airport", cidadeAtiva: true, raioPadraoKm: 20, taxaBaseCidade: 10, moeda: "EUR", criadoEm: new Date().toISOString() }
];

const defaultAppConfig = {
  nomeApp: "Leva Brasa",
  logoApp: "./assets/icon.svg",
  corPrincipal: "#148a55",
  corSecundaria: "#f5c542",
  paisPadrao: "Irlanda",
  cidadePadrao: "Claremorris",
  emailAdminPrincipal: "pvanderson297@gmail.com"
};

let mode = "now";
let signupType = "passageiro";
let editingCityIndex = null;

const tripStatuses = [
  "aguardando_motorista",
  "aguardando_pagamento_cliente",
  "pagamento_cliente_confirmado",
  "viagem_em_andamento",
  "aguardando_pagamento_motorista",
  "motorista_pago",
  "finalizada",
  "cancelada_pelo_passageiro",
  "cancelada_pelo_motorista",
  "cancelada_pelo_admin",
  "sem_motorista_disponivel"
];

const tripStatusText = {
  aguardando_motorista: "Aguardando motorista",
  aguardando_pagamento_cliente: "Aguardando confirmacao do pagamento",
  pagamento_cliente_confirmado: "Pagamento confirmado",
  viagem_em_andamento: "Viagem em andamento",
  aguardando_pagamento_motorista: "Viagem encerrada, pagamento do motorista pendente",
  motorista_pago: "Motorista pago",
  finalizada: "Viagem finalizada",
  cancelada_pelo_passageiro: "Cancelada pelo passageiro",
  cancelada_pelo_motorista: "Cancelada pelo motorista",
  cancelada_pelo_admin: "Cancelada pelo admin",
  sem_motorista_disponivel: "Sem motorista disponivel"
};

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

function loadNotifications() {
  try {
    return JSON.parse(localStorage.getItem(notificationsStorageKey)) || [];
  } catch {
    return [];
  }
}

function saveNotifications(notifications) {
  localStorage.setItem(notificationsStorageKey, JSON.stringify(notifications));
}

function loadCities() {
  try {
    const saved = JSON.parse(localStorage.getItem(citiesStorageKey));
    if (Array.isArray(saved) && saved.length) {
      const normalized = saved.map(normalizeCityRecord);
      defaultCities.forEach((defaultCity) => {
        const exists = normalized.some((city) => normalizeText(city.cidade) === normalizeText(defaultCity.cidade));
        if (!exists) normalized.push(normalizeCityRecord(defaultCity));
      });
      localStorage.setItem(citiesStorageKey, JSON.stringify(normalized));
      return normalized;
    }
  } catch {}
  localStorage.setItem(citiesStorageKey, JSON.stringify(defaultCities));
  return [...defaultCities];
}

function saveCities(cities) {
  localStorage.setItem(citiesStorageKey, JSON.stringify(cities.map(normalizeCityRecord)));
  saveCollectionToApi("cities", cities.map(normalizeCityRecord));
}

function loadAppConfig() {
  try {
    return { ...defaultAppConfig, ...JSON.parse(localStorage.getItem(appConfigStorageKey)) };
  } catch {
    localStorage.setItem(appConfigStorageKey, JSON.stringify(defaultAppConfig));
    return { ...defaultAppConfig };
  }
}

function saveAppConfig(config) {
  const nextConfig = { ...loadAppConfig(), ...config };
  localStorage.setItem(appConfigStorageKey, JSON.stringify(nextConfig));
  saveCollectionToApi("appConfig", nextConfig);
}

function appName() {
  return loadAppConfig().nomeApp || "Leva Brasa";
}

function applyAppConfig() {
  const config = loadAppConfig();
  document.title = `${config.nomeApp} | ${config.cidadePadrao}`;
  document.querySelectorAll("h1").forEach((heading) => {
    heading.textContent = config.nomeApp;
  });
  document.querySelectorAll("[data-app-name]").forEach((node) => {
    node.textContent = config.nomeApp;
  });
  document.documentElement.style.setProperty("--green", config.corPrincipal || "#148a55");
  document.documentElement.style.setProperty("--yellow", config.corSecundaria || "#f5c542");
  const titleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (titleMeta) titleMeta.setAttribute("content", config.nomeApp);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", config.corPrincipal || "#148a55");
}

function normalizeCityRecord(city) {
  const now = new Date().toISOString();
  return {
    id: city.id || `city-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    pais: city.pais || city.paisPadrao || "Irlanda",
    estadoOuRegiao: city.estadoOuRegiao || city.regiao || "County Mayo",
    cidade: city.cidade || "",
    cidadeAtiva: typeof city.cidadeAtiva === "boolean" ? city.cidadeAtiva : city.ativa !== false,
    raioPadraoKm: Number(city.raioPadraoKm || city.raio || radiusConfig.maxKm || 20),
    taxaBaseCidade: Number(city.taxaBaseCidade || city.taxaBase || baseFare),
    moeda: city.moeda || "EUR",
    criadoEm: city.criadoEm || now
  };
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function cityRecordByName(cityName) {
  const name = normalizeText(cityName);
  return loadCities().find((city) => normalizeText(city.cidade) === name);
}

function cityIsActive(cityName) {
  const city = cityRecordByName(cityName);
  return city ? city.cidadeAtiva !== false : false;
}

function sameConfiguredCityOrRegion(a, b) {
  const cityA = cityRecordByName(a);
  const cityB = cityRecordByName(b);
  if (!cityA || !cityB) return normalizeText(a) === normalizeText(b);
  if (cityA.cidadeAtiva === false || cityB.cidadeAtiva === false) return false;
  return normalizeText(cityA.cidade) === normalizeText(cityB.cidade) ||
    (normalizeText(cityA.pais) === normalizeText(cityB.pais) && normalizeText(cityA.estadoOuRegiao) === normalizeText(cityB.estadoOuRegiao));
}

function driverAttendsCity(driver, cityName) {
  const target = cityRecordByName(cityName);
  const attended = Array.isArray(driver.cidadesAtendidas) && driver.cidadesAtendidas.length
    ? driver.cidadesAtendidas
    : [driver.cidadePrincipal || driver.cidade];
  return attended.some((city) => {
    if (sameConfiguredCityOrRegion(city, cityName)) return true;
    const record = cityRecordByName(city);
    return target && record &&
      normalizeText(record.pais) === normalizeText(target.pais) &&
      normalizeText(record.estadoOuRegiao) === normalizeText(target.estadoOuRegiao);
  });
}

function syncCityOptions() {
  const cities = loadCities();
  const activeCityNames = cities
    .filter((city) => city.cidadeAtiva !== false)
    .map((city) => city.cidade)
    .filter(Boolean);

  [signupTown, origin, destination].filter(Boolean).forEach((select) => {
    const currentValue = select.value;
    activeCityNames.forEach((cityName) => {
      const exists = Array.from(select.options).some((option) => normalizeText(option.value || option.textContent) === normalizeText(cityName));
      if (!exists) select.add(new Option(cityName, cityName));
    });
    Array.from(select.options).forEach((option) => {
      const configured = cityRecordByName(option.value || option.textContent);
      if (configured) option.disabled = configured.cidadeAtiva === false;
    });
    if (currentValue) select.value = currentValue;
  });
}

function fillAppConfigForm() {
  const config = loadAppConfig();
  if (appNameInput) appNameInput.value = config.nomeApp || "";
  if (appLogoInput) appLogoInput.value = config.logoApp || "";
  if (appPrimaryColorInput) appPrimaryColorInput.value = config.corPrincipal || "";
  if (appSecondaryColorInput) appSecondaryColorInput.value = config.corSecundaria || "";
  if (appDefaultCountryInput) appDefaultCountryInput.value = config.paisPadrao || "";
  if (appDefaultCityInput) appDefaultCityInput.value = config.cidadePadrao || "";
  if (appAdminEmailInput) appAdminEmailInput.value = config.emailAdminPrincipal || "";
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
  renderNotifications();
  renderFinance();
}

function clearSession() {
  currentSession = null;
  localStorage.removeItem(sessionStorageKey);
  renderSession();
  renderTrips();
  renderDriverArea();
  renderNotifications();
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

function activeNotificationScope() {
  if (adminUnlocked) return { tipoUsuario: "admin", userId: "admin" };
  if (!currentSession) return null;
  return {
    tipoUsuario: currentSession.role,
    userId: normalizePhone(currentSession.phone)
  };
}

function scopedNotifications() {
  const scope = activeNotificationScope();
  if (!scope) return [];
  return loadNotifications()
    .filter((item) => item.tipoUsuario === scope.tipoUsuario && item.userId === scope.userId)
    .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
}

function renderNotifications() {
  const notifications = scopedNotifications();
  const unread = notifications.filter((item) => !item.lida).length;

  if (notificationBadge) {
    notificationBadge.textContent = unread;
    notificationBadge.classList.toggle("show", unread > 0);
  }

  if (!notificationList) return;

  notificationList.innerHTML = notifications.length
    ? notifications.map((item) => `
      <article class="notification-card ${item.lida ? "" : "unread"}">
        <div>
          <strong>${escapeHtml(item.titulo)}</strong>
          <span>${escapeHtml(item.mensagem)}</span>
          <small>${escapeHtml(formatDateTime(item.criadoEm))}</small>
        </div>
        ${item.lida ? "" : `<button type="button" data-notification-read="${item.id}">Lida</button>`}
      </article>
    `).join("")
    : '<span class="empty-state">Nenhuma notificacao.</span>';
}

function createNotification(tipoUsuario, userId, titulo, mensagem, viagemId = "") {
  if (!userId) return;
  const notifications = loadNotifications();
  notifications.push({
    id: `NT-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: String(userId),
    tipoUsuario,
    titulo,
    mensagem,
    lida: false,
    criadoEm: new Date().toISOString(),
    viagemId
  });
  saveNotifications(notifications);
  renderNotifications();
}

function notifyAdmin(titulo, mensagem, viagemId = "") {
  createNotification("admin", "admin", titulo, mensagem, viagemId);
}

function notifyPassenger(trip, titulo, mensagem) {
  createNotification("passageiro", normalizePhone(trip.passageiroTelefone || trip.clientPhone), titulo, mensagem, trip.id);
}

function notifyDriverByPhone(phone, titulo, mensagem, viagemId = "") {
  createNotification("motorista", normalizePhone(phone), titulo, mensagem, viagemId);
}

function notifyAvailableDrivers(trip) {
  const drivers = findDriversByRadius(trip);
  if (!drivers.length) {
    trip.status = "sem_motorista_disponivel";
    notifyPassenger(trip, "Sem motorista disponivel", "No momento nao encontramos motorista dentro do raio.");
    notifyAdmin("Sem motorista disponivel", `Nenhum motorista online para a viagem ${trip.id}.`, trip.id);
    return [];
  }

  drivers.forEach(({ driver, distance }) => {
    notifyDriverByPhone(driver.telefone, "Nova corrida disponivel", `${trip.origem || trip.origin} para ${trip.destino || trip.destination} - ${distance.toFixed(1)} km ate o passageiro - EUR ${trip.valorMotorista || trip.driverPrice}`, trip.id);
  });
  return drivers;
}

function toRadians(value) {
  return Number(value) * Math.PI / 180;
}

function distanceKm(a, b) {
  if (!a || !b) return 999;
  const earth = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function driverIsApprovedOnline(driver) {
  return driver.statusAprovacao === "aprovado" && driver.motoristaStatus === "online";
}

function setDriverStatus(phone, status) {
  const drivers = loadDrivers();
  const driver = drivers.find((item) => normalizePhone(item.telefone) === normalizePhone(phone));
  if (!driver) return;
  driver.motoristaStatus = status;
  driver.online = status === "online";
  driver.ultimaAtividade = new Date().toISOString();
  saveDrivers(drivers);
  refreshDriversState();
}

function findDriversByRadius(trip) {
  const tripCity = cityRecordByName(trip.cidade || trip.origem || trip.origin);
  const maxRadius = tripCity ? Number(tripCity.raioPadraoKm || radiusConfig.maxKm) : radiusConfig.maxKm;
  const originPoint = {
    lat: Number(trip.latitudeOrigem),
    lng: Number(trip.longitudeOrigem)
  };
  const available = loadDrivers()
    .filter(driverIsApprovedOnline)
    .filter((driver) => driverAttendsCity(driver, trip.cidade || trip.origem || trip.origin))
    .map((driver) => {
      const fallback = placeCoords[driver.cidade] || placeCoords.Claremorris;
      const point = {
        lat: Number(driver.latitudeAtual || fallback.lat),
        lng: Number(driver.longitudeAtual || fallback.lng)
      };
      return { driver, distance: distanceKm(point, originPoint) };
    })
    .sort((a, b) => a.distance - b.distance);

  const radiuses = [radiusConfig.initialKm, radiusConfig.secondKm, radiusConfig.thirdKm, maxRadius]
    .filter((radius, index, list) => radius <= maxRadius && list.indexOf(radius) === index);
  for (const radius of radiuses) {
    const group = available.filter((item) => item.distance <= radius);
    if (group.length) return group.map((item) => ({ ...item, radius }));
  }
  return [];
}

function addTripEvent(trip, actor, action, message) {
  trip.eventos = trip.eventos || [];
  trip.eventos.push({
    actor,
    action,
    message,
    criadoEm: new Date().toISOString()
  });
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
    if (Array.isArray(state.cities) && state.cities.length) localStorage.setItem(citiesStorageKey, JSON.stringify(state.cities.map(normalizeCityRecord)));
    if (state.appConfig) localStorage.setItem(appConfigStorageKey, JSON.stringify({ ...defaultAppConfig, ...state.appConfig }));

    applyAppConfig();
    fillAppConfigForm();
    syncCityOptions();
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
  const email = signupEmail ? signupEmail.value.trim().toLowerCase() : "";
  const city = cityRecordByName(signupTown.value);
  const normalizedPhone = normalizePhone(phone);
  const existingIndex = users.findIndex((user) => normalizePhone(user.telefone) === normalizedPhone);
  const user = {
    tipo: type,
    nome: signupName.value.trim(),
    nomeCompleto: signupName.value.trim(),
    telefone: phone,
    telefoneWhatsApp: phone,
    email,
    cidade: signupTown.value,
    status: type === "motorista" ? "aguardando" : "ativo",
    historicoViagens: [],
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

function renderAdminCities() {
  if (!adminCitiesList || !adminUnlocked) return;
  const cities = loadCities();
  adminCitiesList.innerHTML = cities.length
    ? cities.map((city, index) => {
      const trips = loadTrips().filter((trip) => normalizeText(trip.cidade || trip.origem || trip.origin) === normalizeText(city.cidade));
      const drivers = loadDrivers().filter((driver) => driverAttendsCity(driver, city.cidade));
      const revenue = trips
        .filter((trip) => trip.pagamentoClienteConfirmado)
        .reduce((total, trip) => total + Number(trip.valorTotal || trip.clientPrice || 0), 0);
      return `
      <article class="admin-city-card">
        <div>
          <strong>${escapeHtml(city.cidade)}</strong>
          <b>${city.cidadeAtiva === false ? "Inativa" : "Ativa"}</b>
        </div>
        <span>${escapeHtml(city.estadoOuRegiao)} - ${escapeHtml(city.pais)}</span>
        <span>Raio ${city.raioPadraoKm} km - Base ${city.moeda} ${city.taxaBaseCidade}</span>
        <span>${drivers.length} motoristas - ${trips.length} viagens - Faturamento ${city.moeda} ${Math.round(revenue)}</span>
        <div class="admin-actions">
          <button type="button" data-city-action="edit" data-city-index="${index}">Editar</button>
          <button type="button" data-city-action="toggle" data-city-index="${index}">${city.cidadeAtiva === false ? "Ativar" : "Desativar"}</button>
        </div>
      </article>
    `;
    }).join("")
    : '<span class="empty-state">Nenhuma cidade configurada.</span>';
}

function updateOnlineCount() {
  const activeOnlineDrivers = loadDrivers().filter(driverIsApprovedOnline);
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
      const onlineText = driver.motoristaStatus || (driver.online ? "online" : "offline");
      const approvalButton = driver.ativo ? "Pausar" : "Aprovar";
      const onlineButton = driver.motoristaStatus === "suspenso" ? "Reativar" : "Suspender";
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
          <span>Atende: ${escapeHtml((driver.cidadesAtendidas || [driver.cidadePrincipal || driver.cidade]).filter(Boolean).join(", ") || "Nao informado")}</span>
          <span>IBAN: ${escapeHtml(driver.iban || "Nao informado")}</span>
          <div class="admin-actions">
            <button type="button" data-driver-action="approval" data-driver-index="${index}">${approvalButton}</button>
            <button type="button" data-driver-action="add-city" data-driver-index="${index}">Liberar cidade</button>
            <button type="button" data-driver-action="suspend" data-driver-index="${index}">${onlineButton}</button>
            <button type="button" data-driver-action="reject" data-driver-index="${index}">Rejeitar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function refreshDriversState() {
  updateOnlineCount();
  renderAdminUsers();
  renderAdminCities();
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
  if (tripStatusText[trip.status]) return tripStatusText[trip.status];
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

function driverPaymentLabel(trip) {
  return trip.driverPaymentStatus === "pago" ? "Motorista pago" : "Pagamento do motorista pendente";
}

function isTripCancelable(trip) {
  return ![
    "finalizada",
    "motorista_pago",
    "cancelada_pelo_passageiro",
    "cancelada_pelo_motorista",
    "cancelada_pelo_admin"
  ].includes(trip.status);
}

function activeOnlineDriver() {
  return loadDrivers().find(driverIsApprovedOnline);
}

function activeOnlineDriverForTrip(trip) {
  const tripCity = trip.cidade || trip.cidadePrincipal || trip.origem || trip.origin;
  return loadDrivers().find((driver) => driverIsApprovedOnline(driver) && driverAttendsCity(driver, tripCity));
}

function filteredAdminTrips(trips) {
  if (!adminUnlocked) return [];
  const statusValue = adminStatusFilter ? adminStatusFilter.value : "";
  const dateValue = adminDateFilter ? adminDateFilter.value : "";
  const driverValue = adminDriverFilter ? adminDriverFilter.value.trim().toLowerCase() : "";
  const passengerValue = adminPassengerFilter ? adminPassengerFilter.value.trim().toLowerCase() : "";
  const countryValue = adminCountryFilter ? normalizeText(adminCountryFilter.value) : "";
  const regionValue = adminRegionFilter ? normalizeText(adminRegionFilter.value) : "";
  const cityValue = adminCityFilter ? normalizeText(adminCityFilter.value) : "";
  const cityStatusValue = adminCityStatusFilter ? adminCityStatusFilter.value : "";

  return trips.filter((trip) => {
    const tripDate = (trip.criadoEm || trip.createdAt || "").slice(0, 10);
    const driverText = `${trip.motoristaNome || trip.driverName || ""} ${trip.motoristaTelefone || trip.driverPhone || ""}`.toLowerCase();
    const passengerText = `${trip.passageiroNome || trip.clientName || ""} ${trip.passageiroTelefone || trip.clientPhone || ""}`.toLowerCase();
    const tripCityName = trip.cidade || trip.cidadePrincipal || trip.origem || trip.origin || "";
    const configuredCity = cityRecordByName(tripCityName);
    const tripCountry = normalizeText(trip.pais || (configuredCity && configuredCity.pais) || "");
    const tripRegion = normalizeText(trip.estadoOuRegiao || trip.regiao || (configuredCity && configuredCity.estadoOuRegiao) || "");
    const tripCity = normalizeText(tripCityName);
    const cityActive = configuredCity ? configuredCity.cidadeAtiva !== false : false;

    if (statusValue && trip.status !== statusValue) return false;
    if (dateValue && tripDate !== dateValue) return false;
    if (driverValue && !driverText.includes(driverValue)) return false;
    if (passengerValue && !passengerText.includes(passengerValue)) return false;
    if (countryValue && !tripCountry.includes(countryValue)) return false;
    if (regionValue && !tripRegion.includes(regionValue)) return false;
    if (cityValue && !tripCity.includes(cityValue)) return false;
    if (cityStatusValue === "ativa" && !cityActive) return false;
    if (cityStatusValue === "inativa" && cityActive) return false;
    return true;
  });
}

function populateAdminStatusFilter() {
  if (!adminStatusFilter || adminStatusFilter.dataset.ready === "true") return;
  adminStatusFilter.innerHTML = '<option value="">Todos</option>' + tripStatuses
    .map((status) => `<option value="${status}">${tripStatusText[status]}</option>`)
    .join("");
  adminStatusFilter.dataset.ready = "true";
}

function renderTrips() {
  const trips = loadTrips().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (tripsList) {
    if (currentSession && currentSession.role === "passageiro") {
      const clientTrips = trips.filter((trip) => normalizePhone(trip.passageiroTelefone || trip.clientPhone) === normalizePhone(currentSession.phone));
      tripsList.innerHTML = clientTrips.length
        ? clientTrips.map((trip) => renderTripCard(trip, "client")).join("")
        : '<span class="empty-state">Nenhuma viagem solicitada.</span>';
    } else {
      tripsList.innerHTML = '<span class="empty-state">Entre ou cadastre-se como passageiro para ver suas viagens.</span>';
    }
  }

  if (adminTripsList) {
    const adminTrips = filteredAdminTrips(trips);
    adminTripsList.innerHTML = adminUnlocked && adminTrips.length
      ? adminTrips.map((trip) => renderTripCard(trip, "support")).join("")
      : '<span class="empty-state">Nenhuma viagem pendente.</span>';
  }
}

function sameDay(dateValue, ref = new Date()) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  return date.toDateString() === ref.toDateString();
}

function sameWeek(dateValue, ref = new Date()) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  const diff = ref - date;
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
}

function sameMonth(dateValue, ref = new Date()) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  return date.getMonth() === ref.getMonth() && date.getFullYear() === ref.getFullYear();
}

function money(value) {
  return `EUR ${Math.round(Number(value || 0))}`;
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderFinance() {
  if (!financeContent || !financeAccessText) return;
  financeContent.classList.toggle("show", adminIsMain);
  financeAccessText.textContent = adminIsMain ? "Resumo financeiro da plataforma." : "Acesso permitido apenas ao administrador.";
  if (!adminIsMain) return;

  const trips = filteredAdminTrips(loadTrips());
  const received = trips.filter((trip) => trip.pagamentoClienteConfirmado);
  const paid = trips.filter((trip) => trip.pagamentoMotoristaConfirmado);
  const sum = (items, field) => items.reduce((total, trip) => total + Number(trip[field] || 0), 0);
  const recToday = received.filter((trip) => sameDay(trip.dataPagamentoCliente));
  const recWeek = received.filter((trip) => sameWeek(trip.dataPagamentoCliente));
  const recMonth = received.filter((trip) => sameMonth(trip.dataPagamentoCliente));
  const paidToday = paid.filter((trip) => sameDay(trip.dataPagamentoMotorista));
  const paidWeek = paid.filter((trip) => sameWeek(trip.dataPagamentoMotorista));
  const paidMonth = paid.filter((trip) => sameMonth(trip.dataPagamentoMotorista));

  const totalRecToday = sum(recToday, "valorTotal");
  const totalRecWeek = sum(recWeek, "valorTotal");
  const totalRecMonth = sum(recMonth, "valorTotal");
  const totalPaidToday = sum(paidToday, "valorMotorista");
  const totalPaidWeek = sum(paidWeek, "valorMotorista");
  const totalPaidMonth = sum(paidMonth, "valorMotorista");

  setText("#financeReceivedToday", money(totalRecToday));
  setText("#financeReceivedWeek", money(totalRecWeek));
  setText("#financeReceivedMonth", money(totalRecMonth));
  setText("#financePaidToday", money(totalPaidToday));
  setText("#financePaidWeek", money(totalPaidWeek));
  setText("#financePaidMonth", money(totalPaidMonth));
  setText("#financeProfitToday", money(totalRecToday - totalPaidToday));
  setText("#financeProfitWeek", money(totalRecWeek - totalPaidWeek));
  setText("#financeProfitMonth", money(totalRecMonth - totalPaidMonth));
  setText("#financeCompletedCount", trips.filter((trip) => trip.status === "finalizada").length);
  setText("#financeCanceledCount", trips.filter((trip) => String(trip.status).startsWith("cancelada_")).length);
  setText("#financePendingDriverCount", trips.filter((trip) => trip.status === "aguardando_pagamento_motorista").length);
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
    if (driverStatusText) driverStatusText.textContent = driver ? `Status: ${driver.motoristaStatus || "pendente_aprovacao"}` : "Motorista sem cadastro";
    if (driverOnlineToggle) driverOnlineToggle.textContent = "Ficar Online";
    return;
  }

  if (driverStatusText) driverStatusText.textContent = `Status: ${driver.motoristaStatus || "offline"}`;
  if (driverLocationText) {
    driverLocationText.textContent = driver.latitudeAtual && driver.longitudeAtual
      ? `Localizacao: ${Number(driver.latitudeAtual).toFixed(5)}, ${Number(driver.longitudeAtual).toFixed(5)}`
      : "Localizacao ainda nao atualizada.";
  }
  if (driverOnlineToggle) driverOnlineToggle.textContent = driver.motoristaStatus === "online" ? "Ficar Offline" : "Ficar Online";

  const trips = loadTrips().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const driverTrips = trips.filter((trip) => {
    const isOpen = trip.status === "aguardando_motorista";
    const isMine = normalizePhone(trip.motoristaTelefone || trip.driverPhone) === normalizePhone(currentSession.phone);
    const sameArea = driverAttendsCity(driver, trip.cidade || trip.cidadePrincipal || trip.origem || trip.origin);
    return isMine || (isOpen && sameArea);
  });

  driverTripsList.innerHTML = driverTrips.length
    ? driverTrips.map((trip) => renderTripCard(trip, "driver")).join("")
    : '<span class="empty-state">Nenhuma corrida disponivel.</span>';
}

function renderTripCard(trip, viewMode = "client") {
  const adminMode = viewMode === "support";
  const driverMode = viewMode === "driver";
  const tripDriverName = trip.motoristaNome || trip.driverName;
  const tripDriverPhone = trip.motoristaTelefone || trip.driverPhone;
  const tripPassengerName = trip.passageiroNome || trip.clientName;
  const tripPassengerPhone = trip.passageiroTelefone || trip.clientPhone;
  const tripClientPrice = trip.valorTotal || trip.clientPrice;
  const tripCommission = trip.taxaPlataforma || trip.commission;
  const tripDriverPrice = trip.valorMotorista || trip.driverPrice;
  const driverText = tripDriverName ? `Motorista: ${tripDriverName}` : "Motorista: aguardando confirmacao";
  const assignedDriver = tripDriverPhone ? findDriverByPhone(tripDriverPhone) : null;
  const driverPaymentInfo = driverMode ? `<p>${escapeHtml(driverPaymentLabel(trip))}</p>` : "";
  const callInfo = driverMode && trip.status === "aguardando_motorista"
    ? `<div class="call-card"><strong>Nova corrida disponivel</strong><span>Valor total EUR ${tripClientPrice} - voce recebe EUR ${tripDriverPrice}</span><span>Tempo para aceitar: ${radiusConfig.acceptSeconds} segundos</span></div>`
    : "";
  const adminDriverInfo = adminMode && (tripDriverName || assignedDriver)
    ? `
      <div class="admin-driver-payment">
        <strong>Repasse do motorista</strong>
        <span>Motorista: <b>${escapeHtml(tripDriverName || assignedDriver.nome)}</b></span>
        <span>Telefone: <b>${escapeHtml(tripDriverPhone || (assignedDriver && assignedDriver.telefone) || "")}</b></span>
        <span>IBAN: <b>${escapeHtml((assignedDriver && assignedDriver.iban) || "Nao informado")}</b></span>
        <span>Motorista deve receber: <b>EUR ${tripDriverPrice}</b></span>
        <span>Status: <b>${escapeHtml(driverPaymentLabel(trip))}</b></span>
        ${trip.driverPaidAt ? `<span>Pago em: <b>${escapeHtml(formatDateTime(trip.driverPaidAt))}</b></span>` : ""}
      </div>
    `
    : "";
  const tripDate = new Date(trip.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  let actions = "";

  if (adminMode) {
    const driverPaidButton = trip.status === "finalizada" && (tripDriverName || tripDriverPhone) && trip.driverPaymentStatus !== "pago"
      ? `<button type="button" data-trip-action="driver-paid" data-trip-id="${trip.id}">Motorista pago</button>`
      : "";
    const confirmPassengerButton = !trip.pagamentoClienteConfirmado
      ? `<button type="button" data-trip-action="confirm-client-payment" data-trip-id="${trip.id}">Confirmar pagamento do passageiro</button>`
      : "";
    const confirmDriverButton = trip.status === "aguardando_pagamento_motorista" && !trip.pagamentoMotoristaConfirmado
      ? `<button type="button" data-trip-action="confirm-driver-payment" data-trip-id="${trip.id}">Confirmar pagamento do motorista</button>`
      : "";
    const cancelAdminButton = isTripCancelable(trip)
      ? `<button type="button" data-trip-action="cancel-admin" data-trip-id="${trip.id}">Cancelar viagem</button>`
      : "";
    actions = `
      <div class="trip-actions">
        <button type="button" data-trip-action="assign" data-trip-id="${trip.id}">Atribuir</button>
        ${confirmPassengerButton}
        ${confirmDriverButton}
        ${cancelAdminButton}
        <button type="button" data-trip-action="details" data-trip-id="${trip.id}">Ver detalhes da viagem</button>
        ${driverPaidButton}
      </div>
    `;
  }

  if (driverMode) {
    const mine = currentSession && normalizePhone(tripDriverPhone) === normalizePhone(currentSession.phone);
    const acceptButton = trip.status === "aguardando_motorista"
      ? `<button type="button" data-driver-trip-action="accept" data-trip-id="${trip.id}">Aceitar viagem</button>`
      : "";
    const refuseButton = trip.status === "aguardando_motorista"
      ? `<button type="button" data-driver-trip-action="refuse" data-trip-id="${trip.id}">Recusar</button>`
      : "";
    const startButton = mine && trip.status === "pagamento_cliente_confirmado"
      ? `<button type="button" data-driver-trip-action="start" data-trip-id="${trip.id}">Iniciar viagem</button>`
      : "";
    const endButton = mine && trip.status === "viagem_em_andamento"
      ? `<button type="button" data-driver-trip-action="end" data-trip-id="${trip.id}">Encerrar viagem</button>`
      : "";
    const cancelButton = mine && isTripCancelable(trip)
      ? `<button type="button" data-driver-trip-action="cancel" data-trip-id="${trip.id}">Cancelar viagem</button>`
      : "";
    actions = `
      <div class="trip-actions">
        ${acceptButton}
        ${refuseButton}
        ${startButton}
        ${endButton}
        ${cancelButton}
      </div>
    `;
  }

  if (viewMode === "client" && isTripCancelable(trip)) {
    actions = `
      <div class="trip-actions">
        <button type="button" data-passenger-trip-action="cancel" data-trip-id="${trip.id}">Cancelar viagem</button>
      </div>
    `;
  }
  const progress = trip.status === "finalizada" || trip.status === "motorista_pago"
    ? 100
    : trip.status === "viagem_em_andamento" || trip.status === "em_andamento"
      ? 82
      : trip.status === "motorista_chegando"
        ? Math.min(78, Math.max(22, 84 - trip.etaMinutes))
        : trip.status === "motorista_designado" || trip.status === "motorista_aceitou" || trip.status === "pagamento_cliente_confirmado"
          ? 20
          : 12;
  const mapText = trip.status === "motorista_chegando"
    ? `Motorista chegando em ${trip.etaMinutes} min`
    : driverText;
  const clientChat = driverMode ? "" : renderChatBox(trip, "client", adminMode ? "Chat com cliente" : `Chat com ${appName()}`, adminMode ? "admin" : "cliente");
  const driverChat = adminMode
    ? renderChatBox(trip, "driver", "Chat com motorista", "admin")
    : driverMode
      ? renderChatBox(trip, "driver", `Chat com ${appName()}`, "motorista")
      : "";
  const paymentBox = viewMode === "client" ? renderClientPaymentBox(trip) : "";
  const clientPaymentInfo = driverMode ? "" : `<p>${escapeHtml(paymentLabel(trip))}</p>`;
  const detailsBlock = adminMode && trip.detailsOpen ? renderTripDetails(trip) : "";
  const moneyRows = adminMode
    ? `
      <span>Cliente paga <b>EUR ${tripClientPrice}</b></span>
      <span>Motorista recebe <b>EUR ${tripDriverPrice}</b></span>
      <span>Comissao ${escapeHtml(appName())} <b>EUR ${tripCommission}</b></span>
    `
    : driverMode
      ? `<span>Valor a receber <b>EUR ${tripDriverPrice}</b></span>`
      : `<span>Cliente paga <b>EUR ${tripClientPrice}</b></span>`;

  return `
    <article class="trip-card">
      <header>
        <strong>${escapeHtml(trip.origin)} → ${escapeHtml(trip.destination)}</strong>
        <span class="trip-status">${escapeHtml(statusLabel(trip))}</span>
      </header>
      <p>${escapeHtml(tripDate)} · ${escapeHtml(trip.time)} · ${trip.passengers} pessoas · ${trip.distance} km</p>
      ${adminMode && tripPassengerName ? `<p>Cliente: ${escapeHtml(tripPassengerName)} - ${escapeHtml(tripPassengerPhone || "")}</p>` : ""}
      <p>${escapeHtml(driverText)}</p>
      <div class="trip-mini-map" style="--progress: ${progress}%">
        <i class="trip-pin start"></i>
        <i class="trip-car"></i>
        <i class="trip-pin end"></i>
        <span>${escapeHtml(mapText)}</span>
      </div>
      <div class="trip-money">
        ${moneyRows}
      </div>
      ${clientPaymentInfo}
      ${callInfo}
      ${driverPaymentInfo}
      ${adminDriverInfo}
      ${detailsBlock}
      ${paymentBox}
      ${clientChat}
      ${driverChat}
      ${actions}
    </article>
  `;
}

function paymentReference(trip) {
  return `${trip.passageiroNome || trip.clientName || "Cliente"} - ${trip.destino || trip.destination}`;
}

function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatPaymentDetails(trip) {
  return `Pagamento ${appName()}\nValor total: EUR ${trip.valorTotal || trip.clientPrice}\nNome: ${paymentName}\nBanco: ${paymentBank}\nIBAN: ${paymentIban}\nTelefone: ${paymentPhone}\nReferencia: ${paymentReference(trip)}`;
}

function renderClientPaymentBox(trip) {
  return `
    <div class="payment-box">
      <strong>Pagamento</strong>
      <span>Valor total da viagem: <b>EUR ${trip.valorTotal || trip.clientPrice}</b></span>
      <p>Faca o pagamento por transferencia antes da viagem.</p>
      <span>Nome: <b>${escapeHtml(paymentName)}</b></span>
      <span>Banco: <b>${escapeHtml(paymentBank)}</b></span>
      <span>IBAN: <b>${escapeHtml(paymentIban)}</b></span>
      <span>Telefone: <b>${escapeHtml(paymentPhone)}</b></span>
      <span>Referencia: <b>${escapeHtml(paymentReference(trip))}</b></span>
      <div class="payment-actions">
        <button type="button" data-payment-action="copy" data-trip-id="${trip.id}">Copiar dados de pagamento</button>
        <button type="button" data-payment-action="sent" data-trip-id="${trip.id}">Ja fiz o pagamento</button>
      </div>
    </div>
  `;
}

function renderTripDetails(trip) {
  const events = trip.eventos || [];
  const eventRows = events.length
    ? events.map((event) => `
      <span><b>${escapeHtml(formatDateTime(event.criadoEm))}</b> - ${escapeHtml(event.actor)} - ${escapeHtml(event.action)}${event.message ? ` - ${escapeHtml(event.message)}` : ""}</span>
    `).join("")
    : '<span>Nenhum evento registrado.</span>';

  return `
    <div class="trip-details">
      <strong>Detalhes da viagem</strong>
      <span>Criada em: <b>${escapeHtml(formatDateTime(trip.criadoEm || trip.createdAt))}</b></span>
      ${trip.aceitoEm ? `<span>Aceita em: <b>${escapeHtml(formatDateTime(trip.aceitoEm))}</b></span>` : ""}
      ${trip.iniciadoEm ? `<span>Iniciada em: <b>${escapeHtml(formatDateTime(trip.iniciadoEm))}</b></span>` : ""}
      ${trip.encerradoEm ? `<span>Encerrada em: <b>${escapeHtml(formatDateTime(trip.encerradoEm))}</b></span>` : ""}
      ${trip.finalizadoEm ? `<span>Finalizada em: <b>${escapeHtml(formatDateTime(trip.finalizadoEm))}</b></span>` : ""}
      ${trip.motivoCancelamento ? `<span>Cancelamento: <b>${escapeHtml(trip.canceladoPor || "")}</b> - ${escapeHtml(trip.motivoCancelamento)}</span>` : ""}
      <strong>Historico</strong>
      ${eventRows}
    </div>
  `;
}

function renderChatBox(trip, channel, title, senderRole) {
  const messages = (trip.messages || []).filter((message) => (message.channel || "client") === channel);
  const chatMessages = messages
    .map((message) => `
      <div class="chat-message ${message.role === "admin" ? "admin" : ""}">
        <b>${message.role === "admin" ? escapeHtml(appName()) : message.role === "motorista" ? "Motorista" : "Cliente"}</b>
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
  const now = new Date().toISOString();
  const startCoords = placeCoords[origin.value] || placeCoords.Claremorris;
  const endCoords = placeCoords[destination.value] || placeCoords.Claremorris;
  const passengerCity = cityRecordByName(origin.value) || cityRecordByName(currentSession.city || origin.value);
  if (!cityIsActive(origin.value)) {
    showToast("Cidade de origem desativada");
    return;
  }
  const trip = {
    id: `LB-${Date.now()}`,
    clientName: currentSession.name,
    clientPhone: currentSession.phone,
    passageiroId: normalizePhone(currentSession.phone),
    passageiroNome: currentSession.name,
    passageiroTelefone: currentSession.phone,
    passageiroEmail: currentSession.email || "",
    motoristaId: "",
    motoristaNome: "",
    motoristaTelefone: "",
    motoristaEmail: "",
    origin: origin.value,
    destination: destination.value,
    origem: origin.value,
    destino: destination.value,
    cidade: origin.value,
    pais: passengerCity ? passengerCity.pais : loadAppConfig().paisPadrao,
    estadoOuRegiao: passengerCity ? passengerCity.estadoOuRegiao : "",
    regiao: passengerCity ? passengerCity.estadoOuRegiao : "",
    cidadePrincipal: origin.value,
    cidadeAtiva: passengerCity ? passengerCity.cidadeAtiva : true,
    raioPadraoKm: passengerCity ? passengerCity.raioPadraoKm : radiusConfig.maxKm,
    moeda: passengerCity ? passengerCity.moeda : "EUR",
    latitudeOrigem: startCoords.lat,
    longitudeOrigem: startCoords.lng,
    latitudeDestino: endCoords.lat,
    longitudeDestino: endCoords.lng,
    time: time.value,
    passengers: Number(passengers.value || 1),
    hasBags: bags.checked,
    distance,
    clientPrice: split.clientPrice,
    driverPrice: split.driverPrice,
    commission: split.commission,
    valorTotal: split.clientPrice,
    taxaPlataforma: split.commission,
    valorMotorista: split.driverPrice,
    metodoPagamentoCliente: "transferencia",
    pagamentoClienteConfirmado: false,
    dataPagamentoCliente: "",
    pagamentoMotoristaConfirmado: false,
    dataPagamentoMotorista: "",
    paymentStatus: "aguardando",
    driverPaymentStatus: "pendente",
    driverPaidAt: "",
    motivoCancelamento: "",
    canceladoPor: "",
    criadoEm: now,
    aceitoEm: "",
    iniciadoEm: "",
    encerradoEm: "",
    finalizadoEm: "",
    eventos: [],
    messages: [],
    status: "aguardando_motorista",
    etaMinutes: estimateArrivalMinutes(distance),
    driverName: "",
    driverPhone: "",
    createdAt: now
  };
  addTripEvent(trip, "passageiro", "criou", "Viagem solicitada");

  const trips = loadTrips();
  trips.push(trip);
  notifyPassenger(trip, "Sua viagem foi criada", "Aguardando motorista aceitar a viagem.");
  notifyAdmin("Nova viagem criada", `${trip.passageiroNome} solicitou ${trip.origem} para ${trip.destino}.`, trip.id);
  notifyAvailableDrivers(trip);
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
  renderNotifications();
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
      if (item.status === "aguardando_pagamento_cliente") {
        item.status = "aguardando_pagamento_cliente";
      }
      addTripEvent(item, "passageiro", "informou pagamento", "Aguardando confirmacao do admin");
      notifyAdmin("Passageiro aguardando confirmacao de pagamento", `${item.passageiroNome || item.clientName} informou pagamento da viagem ${item.id}.`, item.id);
    });
    showToast("Pagamento aguardando suporte");
  }

  return true;
}

function askCancelReason(actor) {
  if (actor === "passageiro") {
    window.alert("Apos o pagamento confirmado, o cancelamento nao gera reembolso automatico. O valor ficara retido pela plataforma e podera ser analisado pelo administrador.");
  }

  const reason = window.prompt("Informe o motivo do cancelamento:");
  if (!reason || !reason.trim()) {
    showToast("Motivo obrigatorio");
    return "";
  }
  return reason.trim();
}

function cancelTrip(trip, actor) {
  if (!isTripCancelable(trip)) {
    showToast("Viagem nao pode ser cancelada");
    return false;
  }

  const reason = askCancelReason(actor);
  if (!reason) return false;

  trip.status = actor === "passageiro"
    ? "cancelada_pelo_passageiro"
    : actor === "motorista"
      ? "cancelada_pelo_motorista"
      : "cancelada_pelo_admin";
  trip.canceladoPor = actor;
  trip.motivoCancelamento = reason;
  trip.canceladoEm = new Date().toISOString();
  addTripEvent(trip, actor, "cancelou", reason);

  notifyAdmin("Viagem cancelada", `${actor} cancelou a viagem ${trip.id}. Motivo: ${reason}`, trip.id);
  notifyPassenger(trip, "Viagem cancelada", `Viagem cancelada por ${actor}.`);
  if (trip.motoristaTelefone || trip.driverPhone) {
    notifyDriverByPhone(trip.motoristaTelefone || trip.driverPhone, "Viagem cancelada", `Viagem cancelada por ${actor}.`, trip.id);
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

  return `Oi, ${appName()}! Quero uma corrida.\nTipo: ${modeText}\nOrigem: ${origin.value}\nDestino: ${destination.value}\nHorario: ${time.value}\nPessoas: ${passengers.value}\nMalas/compras: ${bagText}\nDistancia aprox.: ${distance} km\nValor da corrida: EUR ${split.clientPrice}\nPagamento: transferencia para ${appName()} apos confirmacao.`;
}

function formatInternalRideMessage(distance, split) {
  return `${formatClientRideMessage(distance, split)}\n\nControle interno:\nMotorista recebe: EUR ${split.driverPrice}\nComissao ${appName()}: EUR ${split.commission}\nCliente paga para ${appName()}; ${appName()} repassa ao motorista por transferencia.`;
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

  saveSession({ role: "motorista", name: user.nome, phone: user.telefone, email: user.email || "", city: user.cidadePrincipal || user.cidade || "", region: user.estadoOuRegiao || user.regiao || "", country: user.pais || "" });
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

  saveSession({ role: "passageiro", name: user.nome, phone: user.telefone, email: user.email || "", city: user.cidadePrincipal || user.cidade || "", region: user.estadoOuRegiao || user.regiao || "", country: user.pais || "" });
  if (passengerLoginPassword) passengerLoginPassword.value = "";
  showToast("Passageiro conectado");
}

function getBrowserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}

async function toggleDriverOnline() {
  if (!currentSession || currentSession.role !== "motorista") return;
  const drivers = loadDrivers();
  const driver = drivers.find((item) => normalizePhone(item.telefone) === normalizePhone(currentSession.phone));
  if (!driver) return;

  if (driver.statusAprovacao !== "aprovado" || ["suspenso", "pendente_aprovacao", "rejeitado"].includes(driver.motoristaStatus)) {
    showToast("Seu cadastro precisa estar aprovado para receber corridas.");
    return;
  }

  if (driver.motoristaStatus === "online") {
    driver.motoristaStatus = "offline";
    driver.online = false;
    driver.ultimaAtividade = new Date().toISOString();
    saveDrivers(drivers);
    refreshDriversState();
    showToast("Voce esta offline.");
    return;
  }

  const location = await getBrowserLocation();
  const fallback = placeCoords[driver.cidade] || placeCoords.Claremorris;
  driver.latitudeAtual = location ? location.lat : fallback.lat;
  driver.longitudeAtual = location ? location.lng : fallback.lng;
  driver.ultimaAtualizacaoLocalizacao = new Date().toISOString();
  driver.ultimaAtividade = new Date().toISOString();
  driver.motoristaStatus = "online";
  driver.online = true;
  saveDrivers(drivers);
  refreshDriversState();
  showToast("Voce esta online e pronto para receber corridas.");
}

async function registerDriver() {
  const name = signupName.value.trim();
  const phone = signupPhone.value.trim();
  const brand = vehicleBrand ? vehicleBrand.value.trim() : "";
  const model = vehicleModel ? vehicleModel.value.trim() : "";
  const plate = vehiclePlate ? vehiclePlate.value.trim() : "";
  const iban = driverIban ? driverIban.value.trim() : "";
  const licenseNumber = driverLicenseNumber ? driverLicenseNumber.value.trim() : "";
  const licenseCategory = driverLicenseCategory ? driverLicenseCategory.value.trim() : "";
  const licenseExpiry = driverLicenseExpiry ? driverLicenseExpiry.value : "";
  const licensePhoto = driverLicensePhoto ? driverLicensePhoto.value.trim() : "";
  const selfie = driverSelfie ? driverSelfie.value.trim() : "";
  const year = vehicleYear ? vehicleYear.value : "";
  const color = vehicleColor ? vehicleColor.value.trim() : "";
  const seats = vehicleSeats ? Number(vehicleSeats.value || 4) : 4;

  if (!name || !phone || !brand || !model || !plate || !iban) {
    showToast("Preencha motorista, veiculo e IBAN");
    return;
  }

  if (!cityIsActive(signupTown.value)) {
    showToast("Cidade desativada pelo admin");
    return;
  }

  if (!validatePasswordFields()) return;

  const drivers = loadDrivers();
  const city = cityRecordByName(signupTown.value);
  const normalizedPhone = normalizePhone(phone);
  const existingIndex = drivers.findIndex((driver) => normalizePhone(driver.telefone) === normalizedPhone);
  const driver = {
    nome: name,
    nomeCompleto: name,
    telefone: phone,
    telefoneWhatsApp: phone,
    email: signupEmail ? signupEmail.value.trim().toLowerCase() : "",
    cidade: signupTown.value,
    pais: city ? city.pais : loadAppConfig().paisPadrao,
    estadoOuRegiao: city ? city.estadoOuRegiao : "",
    regiao: city ? city.estadoOuRegiao : "",
    cidadePrincipal: signupTown.value,
    pais: city ? city.pais : loadAppConfig().paisPadrao,
    estadoOuRegiao: city ? city.estadoOuRegiao : "",
    regiao: city ? city.estadoOuRegiao : "",
    cidadePrincipal: signupTown.value,
    cidadesAtendidas: [signupTown.value],
    numeroHabilitacao: licenseNumber,
    categoriaHabilitacao: licenseCategory,
    validadeHabilitacao: licenseExpiry,
    fotoHabilitacaoFrente: licensePhoto,
    selfieMotorista: selfie,
    marcaVeiculo: brand,
    modeloVeiculo: model,
    anoVeiculo: year,
    corVeiculo: color,
    placaVeiculo: plate.toUpperCase(),
    numeroLugares: seats,
    veiculo: {
      marca: brand,
      modelo: model,
      placa: plate.toUpperCase(),
      ano: year,
      cor: color,
      lugares: seats
    },
    iban: iban.toUpperCase(),
    status: "aguardando",
    motoristaStatus: "pendente_aprovacao",
    statusAprovacao: "pendente_aprovacao",
    latitudeAtual: "",
    longitudeAtual: "",
    ultimaAtividade: new Date().toISOString(),
    ultimaAtualizacaoLocalizacao: "",
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
  saveSession({ role: "motorista", name, phone, email, city: signupTown.value, region: city ? city.estadoOuRegiao : "", country: city ? city.pais : loadAppConfig().paisPadrao });
  showToast("Motorista aguardando aprovacao");
  signupName.value = "";
  signupPhone.value = "";
  if (signupEmail) signupEmail.value = "";
  signupPassword.value = "";
  signupPasswordConfirm.value = "";
  if (vehicleBrand) vehicleBrand.value = "";
  if (vehicleModel) vehicleModel.value = "";
  if (vehiclePlate) vehiclePlate.value = "";
  if (driverIban) driverIban.value = "";
  if (driverLicenseNumber) driverLicenseNumber.value = "";
  if (driverLicenseCategory) driverLicenseCategory.value = "";
  if (driverLicenseExpiry) driverLicenseExpiry.value = "";
  if (driverLicensePhoto) driverLicensePhoto.value = "";
  if (driverSelfie) driverSelfie.value = "";
  if (vehicleYear) vehicleYear.value = "";
  if (vehicleColor) vehicleColor.value = "";
  if (vehicleSeats) vehicleSeats.value = "4";
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

[signupName, signupPhone, signupEmail, signupTown].filter(Boolean).forEach((field) => {
  field.addEventListener("input", updateSignupLink);
  field.addEventListener("change", updateSignupLink);
});

[signupPassword, signupPasswordConfirm].forEach((field) => {
  field.addEventListener("input", updateSignupLink);
});

[vehicleBrand, vehicleModel, vehiclePlate, driverIban, driverLicenseNumber, driverLicenseCategory, driverLicenseExpiry, driverLicensePhoto, driverSelfie, vehicleYear, vehicleColor, vehicleSeats].filter(Boolean).forEach((field) => {
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
      driver.ativo = true;
      driver.status = "ativo";
      driver.statusAprovacao = "aprovado";
      driver.motoristaStatus = driver.motoristaStatus === "suspenso" ? "suspenso" : "offline";
      driver.online = false;
    }

    if (button.dataset.driverAction === "suspend") {
      if (driver.motoristaStatus === "suspenso") {
        driver.ativo = true;
        driver.statusAprovacao = "aprovado";
        driver.motoristaStatus = "offline";
      } else {
        driver.ativo = false;
        driver.statusAprovacao = "suspenso";
        driver.motoristaStatus = "suspenso";
        driver.online = false;
      }
    }

    if (button.dataset.driverAction === "reject") {
      driver.ativo = false;
      driver.statusAprovacao = "rejeitado";
      driver.motoristaStatus = "rejeitado";
      driver.online = false;
    }

    if (button.dataset.driverAction === "add-city") {
      const cityName = window.prompt("Digite a cidade para liberar esse motorista:");
      const city = cityRecordByName(cityName);
      if (!city || city.cidadeAtiva === false) {
        showToast("Cidade nao encontrada ou inativa");
        return;
      }
      driver.cidadesAtendidas = Array.from(new Set([...(driver.cidadesAtendidas || []), city.cidade]));
    }

    driver.atualizadoEm = new Date().toISOString();
    saveDrivers(drivers);
    refreshDriversState();
  });
}

if (addCityButton) {
  addCityButton.addEventListener("click", () => {
    const pais = cityCountryInput ? cityCountryInput.value.trim() : "";
    const estadoOuRegiao = cityRegionInput ? cityRegionInput.value.trim() : "";
    const cidade = cityNameInput ? cityNameInput.value.trim() : "";
    const raioPadraoKm = cityRadiusInput ? Number(cityRadiusInput.value || radiusConfig.maxKm) : radiusConfig.maxKm;
    const taxaBaseCidade = cityBaseFareInput ? Number(cityBaseFareInput.value || baseFare) : baseFare;
    const moeda = cityCurrencyInput ? cityCurrencyInput.value.trim().toUpperCase() : "EUR";

    if (!pais || !estadoOuRegiao || !cidade) {
      showToast("Preencha pais, regiao e cidade");
      return;
    }

    const cities = loadCities();
    const existingIndex = editingCityIndex !== null
      ? editingCityIndex
      : cities.findIndex((item) => normalizeText(item.cidade) === normalizeText(cidade));
    const cityRecord = normalizeCityRecord({
      ...(existingIndex >= 0 ? cities[existingIndex] : {}),
      id: existingIndex >= 0 ? cities[existingIndex].id : `city-${Date.now()}`,
      pais,
      estadoOuRegiao,
      cidade,
      cidadeAtiva: existingIndex >= 0 ? cities[existingIndex].cidadeAtiva !== false : true,
      raioPadraoKm,
      taxaBaseCidade,
      moeda,
      criadoEm: existingIndex >= 0 ? cities[existingIndex].criadoEm : new Date().toISOString()
    });
    if (existingIndex >= 0) {
      cities[existingIndex] = cityRecord;
    } else {
      cities.push(cityRecord);
    }

    saveCities(cities);
    syncCityOptions();
    if (cityCountryInput) cityCountryInput.value = "";
    if (cityRegionInput) cityRegionInput.value = "";
    if (cityNameInput) cityNameInput.value = "";
    if (cityRadiusInput) cityRadiusInput.value = "20";
    if (cityBaseFareInput) cityBaseFareInput.value = "8";
    if (cityCurrencyInput) cityCurrencyInput.value = "EUR";
    editingCityIndex = null;
    if (addCityButton) addCityButton.textContent = "Adicionar cidade";
    renderAdminCities();
    showToast("Cidade salva");
  });
}

if (adminCitiesList) {
  adminCitiesList.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest("button[data-city-action]") : null;
    if (!button) return;

    const cities = loadCities();
    const city = cities[Number(button.dataset.cityIndex)];
    if (!city) return;
    if (button.dataset.cityAction === "edit") {
      editingCityIndex = Number(button.dataset.cityIndex);
      if (cityCountryInput) cityCountryInput.value = city.pais || "";
      if (cityRegionInput) cityRegionInput.value = city.estadoOuRegiao || "";
      if (cityNameInput) cityNameInput.value = city.cidade || "";
      if (cityRadiusInput) cityRadiusInput.value = city.raioPadraoKm || radiusConfig.maxKm;
      if (cityBaseFareInput) cityBaseFareInput.value = city.taxaBaseCidade || baseFare;
      if (cityCurrencyInput) cityCurrencyInput.value = city.moeda || "EUR";
      if (addCityButton) addCityButton.textContent = "Salvar cidade";
      showToast("Edite os dados e salve");
      return;
    }
    if (button.dataset.cityAction === "toggle") {
      city.cidadeAtiva = city.cidadeAtiva === false;
    }
    saveCities(cities);
    syncCityOptions();
    renderAdminCities();
    showToast(city.cidadeAtiva === false ? "Cidade desativada" : "Cidade ativada");
  });
}

if (saveAppConfigButton) {
  saveAppConfigButton.addEventListener("click", () => {
    saveAppConfig({
      nomeApp: appNameInput ? appNameInput.value.trim() || defaultAppConfig.nomeApp : defaultAppConfig.nomeApp,
      logoApp: appLogoInput ? appLogoInput.value.trim() || defaultAppConfig.logoApp : defaultAppConfig.logoApp,
      corPrincipal: appPrimaryColorInput ? appPrimaryColorInput.value.trim() || defaultAppConfig.corPrincipal : defaultAppConfig.corPrincipal,
      corSecundaria: appSecondaryColorInput ? appSecondaryColorInput.value.trim() || defaultAppConfig.corSecundaria : defaultAppConfig.corSecundaria,
      paisPadrao: appDefaultCountryInput ? appDefaultCountryInput.value.trim() || defaultAppConfig.paisPadrao : defaultAppConfig.paisPadrao,
      cidadePadrao: appDefaultCityInput ? appDefaultCityInput.value.trim() || defaultAppConfig.cidadePadrao : defaultAppConfig.cidadePadrao,
      emailAdminPrincipal: appAdminEmailInput ? appAdminEmailInput.value.trim().toLowerCase() || defaultAppConfig.emailAdminPrincipal : defaultAppConfig.emailAdminPrincipal
    });
    applyAppConfig();
    fillAppConfigForm();
    showToast("Configuracao salva");
  });
}

[adminStatusFilter, adminDateFilter, adminDriverFilter, adminPassengerFilter, adminCountryFilter, adminRegionFilter, adminCityFilter, adminCityStatusFilter].filter(Boolean).forEach((field) => {
  field.addEventListener("input", renderTrips);
  field.addEventListener("change", renderTrips);
  field.addEventListener("input", renderFinance);
  field.addEventListener("change", renderFinance);
});

if (notificationButton && notificationPanel) {
  notificationButton.addEventListener("click", () => {
    notificationPanel.classList.toggle("show");
    renderNotifications();
  });
}

if (notificationList) {
  notificationList.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest("button[data-notification-read]") : null;
    if (!button) return;

    const notifications = loadNotifications();
    const item = notifications.find((notification) => notification.id === button.dataset.notificationRead);
    if (item) item.lida = true;
    saveNotifications(notifications);
    renderNotifications();
  });
}

function exportTripsCsv() {
  if (!adminIsMain) {
    showToast("Acesso permitido apenas ao administrador.");
    return;
  }

  const header = [
    "id da viagem",
    "passageiro",
    "motorista",
    "origem",
    "destino",
    "pais",
    "regiao",
    "cidade",
    "valor total",
    "taxa plataforma",
    "valor motorista",
    "status",
    "pagamento cliente confirmado",
    "pagamento motorista confirmado",
    "data pagamento cliente",
    "data pagamento motorista",
    "finalizadoEm"
  ];
  const rows = filteredAdminTrips(loadTrips()).map((trip) => [
    trip.id,
    trip.passageiroNome || trip.clientName || "",
    trip.motoristaNome || trip.driverName || "",
    trip.origem || trip.origin || "",
    trip.destino || trip.destination || "",
    trip.pais || "",
    trip.estadoOuRegiao || trip.regiao || "",
    trip.cidade || trip.cidadePrincipal || trip.origem || trip.origin || "",
    trip.valorTotal || trip.clientPrice || "",
    trip.taxaPlataforma || trip.commission || "",
    trip.valorMotorista || trip.driverPrice || "",
    trip.status || "",
    trip.pagamentoClienteConfirmado ? "sim" : "nao",
    trip.pagamentoMotoristaConfirmado ? "sim" : "nao",
    trip.dataPagamentoCliente || "",
    trip.dataPagamentoMotorista || "",
    trip.finalizadoEm || ""
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  copyText(csv).then(() => showToast("Relatorio CSV copiado"));
}

if (exportCsvButton) {
  exportCsvButton.addEventListener("click", exportTripsCsv);
}

if (adminTripsList) {
  adminTripsList.addEventListener("click", (event) => {
    if (handleTripListClick(event)) return;

    const button = event.target && event.target.closest ? event.target.closest("button[data-trip-action]") : null;
    if (!button) return;

    updateTrip(button.dataset.tripId, (trip) => {
      if (button.dataset.tripAction === "assign") {
        const driver = activeOnlineDriverForTrip(trip);
        if (!driver) {
          trip.status = "sem_motorista_disponivel";
          notifyPassenger(trip, "Sem motorista disponivel", "No momento nao encontramos motorista ativo para essa cidade.");
          notifyAdmin("Sem motorista disponivel", `Nenhum motorista ativo para ${trip.cidade || trip.origem || trip.origin}.`, trip.id);
          showToast("Nenhum motorista ativo nessa cidade");
          return;
        }
        trip.driverName = driver ? driver.nome : "A definir";
        trip.driverPhone = driver ? driver.telefone : "";
        trip.motoristaId = driver ? normalizePhone(driver.telefone) : "";
        trip.motoristaNome = driver ? driver.nome : "A definir";
        trip.motoristaTelefone = driver ? driver.telefone : "";
        trip.aceitoEm = trip.aceitoEm || new Date().toISOString();
        trip.driverPaymentStatus = trip.driverPaymentStatus || "pendente";
        trip.status = "aguardando_pagamento_cliente";
        addTripEvent(trip, "admin", "atribuiu motorista", trip.motoristaNome);
        notifyPassenger(trip, "Motorista aceitou sua viagem", `${trip.motoristaNome} esta aguardando confirmacao do pagamento.`);
        if (driver) notifyDriverByPhone(driver.telefone, "Voce recebeu uma viagem", `${trip.origem || trip.origin} para ${trip.destino || trip.destination}`, trip.id);
        notifyAdmin("Motorista aceitou viagem", `${trip.motoristaNome} esta na viagem ${trip.id}.`, trip.id);
      }

      if (button.dataset.tripAction === "confirm-client-payment" || button.dataset.tripAction === "payment") {
        trip.pagamentoClienteConfirmado = true;
        trip.dataPagamentoCliente = new Date().toISOString();
        trip.paymentStatus = "recebido";
        trip.status = "pagamento_cliente_confirmado";
        addTripEvent(trip, "admin", "confirmou pagamento do passageiro", "");
        notifyPassenger(trip, "Pagamento confirmado", "Seu pagamento foi confirmado.");
        if (trip.motoristaTelefone || trip.driverPhone) {
          notifyDriverByPhone(trip.motoristaTelefone || trip.driverPhone, "Pagamento do passageiro confirmado", "Voce ja pode iniciar a viagem.", trip.id);
        }
      }

      if (button.dataset.tripAction === "confirm-driver-payment" || button.dataset.tripAction === "driver-paid") {
        trip.pagamentoMotoristaConfirmado = true;
        trip.dataPagamentoMotorista = new Date().toISOString();
        trip.driverPaymentStatus = "pago";
        trip.driverPaidAt = new Date().toISOString();
        trip.status = "motorista_pago";
        addTripEvent(trip, "admin", "confirmou pagamento do motorista", "");
        notifyPassenger(trip, "Viagem finalizada", "A viagem foi finalizada.");
        if (trip.motoristaTelefone || trip.driverPhone) {
          notifyDriverByPhone(trip.motoristaTelefone || trip.driverPhone, "Seu pagamento foi confirmado pelo administrador", "Repasse marcado como pago.", trip.id);
          setDriverStatus(trip.motoristaTelefone || trip.driverPhone, "online");
        }
        trip.status = "finalizada";
        trip.finalizadoEm = new Date().toISOString();
      }

      if (button.dataset.tripAction === "finish") {
        trip.status = "finalizada";
        trip.etaMinutes = 0;
        trip.driverPaymentStatus = trip.driverPaymentStatus || "pendente";
      }

      if (button.dataset.tripAction === "cancel-admin") {
        cancelTrip(trip, "admin");
      }

      if (button.dataset.tripAction === "details") {
        trip.detailsOpen = !trip.detailsOpen;
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
      const mine = normalizePhone(trip.motoristaTelefone || trip.driverPhone) === normalizePhone(currentSession.phone);

      if (button.dataset.driverTripAction === "accept" && trip.status === "aguardando_motorista") {
        if (!driverIsApprovedOnline(driver)) {
          showToast("Seu cadastro precisa estar aprovado e online.");
          return;
        }
        if (trip.motoristaId || trip.driverPhone) {
          showToast("Essa corrida ja foi aceita por outro motorista.");
          return;
        }
        trip.motoristaId = normalizePhone(driver.telefone);
        trip.motoristaNome = driver.nome;
        trip.motoristaTelefone = driver.telefone;
        trip.motoristaEmail = driver.email || "";
        trip.driverName = driver.nome;
        trip.driverPhone = driver.telefone;
        trip.aceitoEm = new Date().toISOString();
        trip.status = "aguardando_pagamento_cliente";
        trip.driverPaymentStatus = trip.driverPaymentStatus || "pendente";
        const drivers = loadDrivers();
        const currentDriver = drivers.find((item) => normalizePhone(item.telefone) === normalizePhone(driver.telefone));
        if (currentDriver) {
          currentDriver.motoristaStatus = "ocupado";
          currentDriver.online = false;
          currentDriver.ultimaAtividade = new Date().toISOString();
          saveDrivers(drivers);
        }
        addTripEvent(trip, "motorista", "aceitou", driver.nome);
        notifyPassenger(trip, "Motorista aceitou sua viagem", `${driver.nome} aceitou sua viagem.`);
        notifyAdmin("Motorista aceitou viagem", `${driver.nome} aceitou a viagem ${trip.id}. Passageiro aguardando confirmacao de pagamento.`, trip.id);
        notifyDriverByPhone(driver.telefone, "Voce aceitou uma viagem", `${trip.origem || trip.origin} para ${trip.destino || trip.destination}`, trip.id);
        return;
      }

      if (button.dataset.driverTripAction === "refuse" && trip.status === "aguardando_motorista") {
        trip.recusas = trip.recusas || [];
        trip.recusas.push({
          motoristaId: normalizePhone(driver.telefone),
          motoristaNome: driver.nome,
          viagemId: trip.id,
          recusadoEm: new Date().toISOString(),
          distancia: "",
          motivo: "Recusada pelo motorista"
        });
        addTripEvent(trip, "motorista", "recusou", driver.nome);
        notifyAdmin("Motorista recusou viagem", `${driver.nome} recusou a viagem ${trip.id}.`, trip.id);
        showToast("Corrida recusada");
        return;
      }

      if (!mine) return;

      if (button.dataset.driverTripAction === "start") {
        if (trip.status !== "pagamento_cliente_confirmado") {
          showToast("Aguarde pagamento confirmado");
          return;
        }
        trip.status = "viagem_em_andamento";
        trip.iniciadoEm = new Date().toISOString();
        addTripEvent(trip, "motorista", "iniciou", driver.nome);
        notifyPassenger(trip, "Viagem iniciada", "Seu motorista iniciou a viagem.");
        notifyAdmin("Motorista iniciou viagem", `${driver.nome} iniciou a viagem ${trip.id}.`, trip.id);
        notifyDriverByPhone(driver.telefone, "Viagem iniciada com sucesso", "Boa viagem.", trip.id);
      }

      if (button.dataset.driverTripAction === "end") {
        if (trip.status !== "viagem_em_andamento") return;
        trip.status = "aguardando_pagamento_motorista";
        trip.encerradoEm = new Date().toISOString();
        addTripEvent(trip, "motorista", "encerrou", driver.nome);
        notifyAdmin("Motorista encerrou viagem", `${driver.nome} aguarda pagamento da viagem ${trip.id}.`, trip.id);
        notifyAdmin("Pagamento pendente para motorista", `Pagar EUR ${trip.valorMotorista || trip.driverPrice} para ${driver.nome}.`, trip.id);
        notifyDriverByPhone(driver.telefone, "Viagem encerrada", "Aguarde o pagamento do administrador.", trip.id);
      }

      if (button.dataset.driverTripAction === "cancel") {
        if (cancelTrip(trip, "motorista")) {
          setDriverStatus(currentSession.phone, "online");
        }
      }
    });
  });
}

if (tripsList) {
  tripsList.addEventListener("click", (event) => {
    if (handleClientPaymentClick(event)) return;
    if (handleTripListClick(event)) return;

    const button = event.target && event.target.closest ? event.target.closest("button[data-passenger-trip-action]") : null;
    if (!button || !currentSession || currentSession.role !== "passageiro") return;

    updateTrip(button.dataset.tripId, (trip) => {
      const mine = normalizePhone(trip.passageiroTelefone || trip.clientPhone) === normalizePhone(currentSession.phone);
      if (!mine) return;
      if (button.dataset.passengerTripAction === "cancel") {
        cancelTrip(trip, "passageiro");
      }
    });
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

if (driverOnlineToggle) {
  driverOnlineToggle.addEventListener("click", toggleDriverOnline);
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
    adminIsMain = adminEmail && adminEmail.value.trim().toLowerCase() === loadAppConfig().emailAdminPrincipal;
    populateAdminStatusFilter();
    updateAdminVisibility();
    renderAdminUsers();
    renderAdminCities();
    renderAdminDrivers();
    renderTrips();
    renderNotifications();
    renderFinance();
    showToast("Painel liberado");
  });
}

if (adminLogoutButton) {
  adminLogoutButton.addEventListener("click", () => {
    adminUnlocked = false;
    adminIsMain = false;
    if (adminPassword) adminPassword.value = "";
    if (adminEmail) adminEmail.value = "";
    updateAdminVisibility();
    renderNotifications();
    renderFinance();
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

  if (!cityIsActive(signupTown.value)) {
    showToast("Cidade desativada pelo admin");
    return;
  }

  if (!validatePasswordFields()) return;

  saveUserAccount("passageiro").then((user) => {
    saveSession({ role: "passageiro", name: user.nome, phone: user.telefone, email: user.email || "", city: user.cidadePrincipal || user.cidade || "", region: user.estadoOuRegiao || user.regiao || "", country: user.pais || "" });
    showToast("Passageiro cadastrado");
    signupName.value = "";
    signupPhone.value = "";
    if (signupEmail) signupEmail.value = "";
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

applyAppConfig();
fillAppConfigForm();
syncCityOptions();
updateEstimate();
updateSignupLink();
updateAdminVisibility();
populateAdminStatusFilter();
renderSession();
renderAdminUsers();
renderAdminCities();
refreshDriversState();
renderTrips();
renderDriverArea();
renderNotifications();
renderFinance();
syncFromApi();

if (apiEnabled) {
  window.setInterval(syncFromApi, 5000);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
