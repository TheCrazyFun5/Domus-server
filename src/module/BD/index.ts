import { Sequelize } from "sequelize";
import logger from "../logger/index.js";
import configLoader from "../configLoader/index.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const dataBD = configLoader.main.config!.BD;
const sequelize = new Sequelize(dataBD.BDname, dataBD.login, dataBD.pass, {
  host: dataBD.ip,
  port: dataBD.port,
  dialect: "mysql",
  logging: false,
});

async function init(): Promise<void> {
  try {
    const dirModel = path.join(import.meta.dirname, "/model");
    logger.bd.log("Начало инициализации моделей базы данных.");
    for (const file of fs.readdirSync(dirModel).filter((file) => file.includes(".model."))) {
      await import(pathToFileURL(path.join(dirModel, file)).href);
      logger.bd.log(`Модель ${file} инициализирована`);
    }
  } catch (err) {
    logger.bd.error(`Ошибка при инициализации моделей баз данны: ${err}`);
  }
}

async function connection(): Promise<void> {
  try {
    await init();
    await sequelize.authenticate();
    logger.bd.log("Успешное подключение к БД, начинаю синхронизацию моделей.");
    await sequelize.sync({ alter: true });
    logger.bd.log(`Процесс синхронизации моделей прошёл успешно.`);
  } catch (error) {
    logger.bd.error(`Ошибка подключения: ${error}`);
  }
}

export { sequelize, connection };
