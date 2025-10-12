import express from "express";
import logger from "./module/logger/index.js";
import configLoader from "./module/configLoader/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { webSocketInit } from "./module/webSocket/index.js";
// import crypto from "crypto";

let server: any;
let connections = new Set<any>();

let configServer!: {
  ip: string;
  port: number;
};

async function startupSnapshot() {
  const appStart = express();
  appStart.use(express.json());
  appStart.use(cookieParser());
  appStart.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  if (configLoader.main.config) {
    configServer = {
      ip: "0.0.0.0",
      port: configLoader.main.config.Server.port,
    };

    const db = (await import("./module/BD/index.js")).connection;
    const app = (await import("./app/app.js")).app;
    await db();

    appStart.use(app);
  } else {
    logger.app.warn("🛠 Конфиг не найден, запускаем установщик", "Installer");
    const installer = (await import("./installer/index.js")).default;
    configServer = {
      ip: "0.0.0.0",
      port: 2302,
    };
    appStart.use(installer(restartApp));
  }

  server = appStart.listen(configServer.port, configServer.ip, () => {
    logger.app.log(`🚀 Сервер запущен на http://localhost:${configServer.port}`);
  });
  webSocketInit(server);
  server.on("connection", (socket: any) => {
    connections.add(socket);
    socket.on("close", () => connections.delete(socket));
  });
}
function restartApp(): void {
  logger.app.log("Перезапуск сервера...");
  for (const socket of connections) {
    socket.destroy();
  }
  connections.clear();
  if (server) {
    server.close(() => {
      logger.app.log("🔴 Старый сервер остановлен");
      setTimeout(() => startupSnapshot(), 2000);
    });
  }
}
startupSnapshot();
