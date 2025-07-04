// import "./mqttServer.mjs";
import express from "express";
import mqtt from "mqtt";
import installer from "./install/install.mjs";
import app from "./app.mjs";
import { exists } from "./module/configLoader.mjs";
import path from "path";
import { fileURLToPath } from "url";

//Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = null;
let connections = new Set();
function startApp() {
  const appStart = express();
  appStart.use(express.json());
  if (!exists(path.join(__dirname, "config.json"))) {
    console.log("🛠 Конфиг не найден, запускаем установщик");
    appStart.use(installer(restartApp));
  } else {
    appStart.use(app);
  }

  server = appStart.listen(3000, () => {
    console.log("🚀 Сервер запущен на http://localhost:3000");
  });
  server.on("connection", (socket) => {
    connections.add(socket);
    socket.on("close", () => connections.delete(socket));
  });
}

function restartApp() {
  console.log("Перезапуск сервера...");
  for (const socket of connections) {
    socket.destroy();
  }
  connections.clear();
  if (server) {
    server.close(() => {
      console.log("Старый сервер остановлен");
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
