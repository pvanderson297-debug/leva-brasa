const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;
const dataDir = path.join(root, "data");
const dbFile = path.join(dataDir, "db.json");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function ensureDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ users: [], drivers: [], trips: [] }, null, 2));
  }
}

function readDb() {
  ensureDb();
  try {
    return JSON.parse(fs.readFileSync(dbFile, "utf8"));
  } catch {
    return { users: [], drivers: [], trips: [] };
  }
}

function writeDb(db) {
  ensureDb();
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) request.destroy();
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function handleApi(request, response, cleanUrl) {
  if (request.method === "GET" && cleanUrl === "/api/state") {
    sendJson(response, 200, readDb());
    return true;
  }

  const saveMatch = cleanUrl.match(/^\/api\/(users|drivers|trips)$/);
  if (request.method === "POST" && saveMatch) {
    const collection = saveMatch[1];
    const body = await readBody(request);
    const db = readDb();
    db[collection] = Array.isArray(body.items) ? body.items : [];
    writeDb(db);
    sendJson(response, 200, { ok: true, [collection]: db[collection] });
    return true;
  }

  if (cleanUrl.startsWith("/api/")) {
    sendJson(response, 404, { error: "API route not found" });
    return true;
  }

  return false;
}

const server = http.createServer(async (request, response) => {
  const cleanUrl = decodeURIComponent(request.url.split("?")[0]);

  try {
    if (await handleApi(request, response, cleanUrl)) return;
  } catch {
    sendJson(response, 400, { error: "Invalid request" });
    return;
  }

  const requestedPath = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const filePath = path.join(root, requestedPath);
  const resolvedRoot = path.resolve(root);
  const resolvedFile = path.resolve(filePath);

  if (!resolvedFile.startsWith(resolvedRoot)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(resolvedFile, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(resolvedFile)] || "application/octet-stream"
    });
    response.end(content);
  });
});

server.listen(port, () => {
  ensureDb();
  console.log(`Leva Brasa rodando em http://localhost:${port}`);
});
