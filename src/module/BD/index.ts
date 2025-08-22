/*
interface IUserRepository {
  getAll(): any[];
  getById(id: string): any | null;
}

class ODM implements IUserRepository {
  getAll() {
    return ["ODM"];
  }
  getById(id: string) {
    return id;
  }
}

class ORM implements IUserRepository {
  getAll() {
    return ["ORM"];
  }
  getById(id: string) {
    return id;
  }
}

let test: IUserRepository;
let bd = "ORM";

if (bd === "ORM") test = new ORM();
else test = new ODM();
console.log(test.getAll());*/

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
  const dirModel = path.join(import.meta.dirname, "/model");
  logger.bd.log("Начало инициализации моделей базы данных.");
  for (const file of fs.readdirSync(dirModel).filter((file) => file.includes(".model."))) {
    await import(path.join(pathToFileURL(dirModel).href, file));
    logger.bd.log(`Модель ${file} инициализирована`);
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
