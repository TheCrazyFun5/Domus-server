import { Sequelize } from "sequelize";
import logger from "../logger/index.js";
import configLoader from "../configLoader/index.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { dbData } from "../../module/configLoader/modelConfig.js";

let sequelize: Sequelize | null = null;
async function CreateSequelize(dbData?: dbData) {
  const dataDB = dbData ? dbData : configLoader.main.config!.BD;
  return new Sequelize(dataDB.dbName, dataDB.login, dataDB.pass, {
    host: dataDB.ip,
    port: dataDB.port,
    dialect: "mysql",
    logging: false,
  });
}

async function init(s: Sequelize): Promise<void> {
  try {
    const dirModel = path.join(import.meta.dirname, "/model");
    logger.bd.log("Начало инициализации моделей базы данных.");
    for (const file of fs.readdirSync(dirModel).filter((file) => file.includes(".model."))) {
      const test = await import(pathToFileURL(path.join(dirModel, file)).href);
      test.init(s);
      logger.bd.log(`Модель ${file} инициализирована`);
    }
  } catch (err) {
    logger.bd.error(`Ошибка при инициализации моделей баз данны: ${err}`);
  }
}

async function connection(dbData?: dbData): Promise<void | {}> {
  try {
    if (sequelize) sequelize.close();
    sequelize = await CreateSequelize(dbData);
    await init(sequelize);
    await sequelize.authenticate();
    logger.bd.log("Успешное подключение к БД, начинаю синхронизацию моделей.");
    await sequelize.sync({ alter: true });
    logger.bd.log(`Процесс синхронизации моделей прошёл успешно.`);
  } catch (error) {
    logger.bd.error(`Ошибка подключения: ${error}`);
    return { error };
  }
}

export { sequelize, connection };
