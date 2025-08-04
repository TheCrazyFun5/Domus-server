import express from "express";
import logger from "./module/logger/index.js";
import configLoader from "./module/configLoader/index.js";
import installer from "./installer/index.js";
let server;
let connections = new Set();
let configServer;
function startupSnapshot() {
    const appStart = express();
    appStart.use(express.json());
    if (configLoader.main.config) {
        configServer = configLoader.main.config.Server;
    }
    else {
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
    server.on("connection", (socket) => {
        connections.add(socket);
        socket.on("close", () => connections.delete(socket));
    });
}
function restartApp() {
    logger.app.log("Перезапуск сервера...", "App");
    for (const socket of connections) {
        socket.destroy();
    }
    connections.clear();
    if (server) {
        server.close(() => {
            logger.app.log("🔴 Старый сервер остановлен", "App");
            setTimeout(() => startupSnapshot(), 500);
        });
    }
}
startupSnapshot();
