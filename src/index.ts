import express from "express";
import logger from "./module/logger/index.js";
import configLoader from "./module/configLoader/index.js";
import installer from "./installer/index.js";
import { app } from "./app/app.js";
import { User } from "./module/BD/model/user.model.js";
import userService from "./app/service/userService.js";

let server: any;
let connections = new Set<any>();

let configServer!: {
  ip: string;
  port: number;
};

async function startupSnapshot() {
  const appStart = express();
  appStart.use(express.json());
  if (configLoader.main.config) {
    configServer = configLoader.main.config.Server;
    let bdt = await import("./module/BD/index.js");
    let db = bdt.connection;
    await db();
    try {
      if (await User.findOne({ where: { id: 1 } })) return;
      await userService.registration("root", "root", "admin");
    } catch (e: any) {
      logger.bd.error(e);
    }
    appStart.use(app);
  } else {
    logger.app.warn("🛠 Конфиг не найден, запускаем установщик", "Installer");
    configServer = {
      ip: "0.0.0.0",
      port: 3000,
    };
    appStart.use(installer(restartApp));
  }
  server = appStart.listen(configServer.port, configServer.ip, () => {
    logger.app.log(`🚀 Сервер запущен на http://localhost:${configServer.port}`);
  });
  server.on("connection", (socket: any) => {
    connections.add(socket);
    socket.on("close", () => connections.delete(socket));
  });
}
function restartApp(): void {
  logger.app.log("Перезапуск сервера...", "App");
  for (const socket of connections) {
    socket.destroy();
  }
  connections.clear();
  if (server) {
    server.close(() => {
      logger.app.log("🔴 Старый сервер остановлен", "App");
      setTimeout(() => startupSnapshot(), 2000);
    });
  }
}
startupSnapshot();
