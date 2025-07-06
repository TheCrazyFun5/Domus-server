import express from "express";
import logger from "./module/logger.mjs";
import { startMQTTServer } from "./module/mqttServer.mjs";
import installer from "./install/install.mjs";
import { app, MQTTconnect } from "./app.mjs";
import { exists, getMainConfig } from "./module/configLoader.mjs";
import path from "path";
import { fileURLToPath } from "url";

//Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = null;
let connections = new Set();
let serverSettings;
let config = null;

async function startApp() {
  const appStart = express();
  appStart.use(express.json());
  if (!exists(path.join(__dirname, "config.json"))) {
    serverSettings = {
      ip: "0.0.0.0",
      port: 3000,
    };
    logger("🛠 Конфиг не найден, запускаем установщик", "Installer");
    appStart.use(installer(restartApp));
  } else {
    config = getMainConfig();
    serverSettings = config.Server;
    if (config.MQTT.builtIn) {
      logger("Запускаем встроенный MQTT", "App");
      await startMQTTServer(config.MQTT);
    }
    MQTTconnect();
    appStart.use(app);
  }

  server = appStart.listen(serverSettings.port, serverSettings.ip, () => {
    logger(`🚀 Сервер запущен на http://localhost:${serverSettings.port}`);
  });
  server.on("connection", (socket) => {
    connections.add(socket);
    socket.on("close", () => connections.delete(socket));
  });
}

function restartApp() {
  logger("Перезапуск сервера...", "App");
  for (const socket of connections) {
    socket.destroy();
  }
  connections.clear();
  if (server) {
    server.close(() => {
      logger("🔴 Старый сервер остановлен", "App");
      setTimeout(() => startApp(), 500);
    });
  }
}
startApp();
// const app = express();
// app.use(express.json());

// app.listen(300, () => {
//   console.log("🚀 Запуск express");
// });

// const mqttClient = mqtt.connect("mqtt://localhost:1883", {
//   username: "f",
//   password: "f",
// });

// mqttClient.on("connect", () => {
//   console.log("🔗 Express подключился к MQTT");
// });

// app.use("/led", (req, res) => {
//   mqttClient.publish("home/led", "d");
// });
