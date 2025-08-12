// interface IUserRepository {
//   getAll(): any[];
//   getById(id: string): any | null;
// }

// class ODM implements IUserRepository {
//   getAll() {
//     return ["ODM"];
//   }
//   getById(id: string) {
//     return id;
//   }
// }

// class ORM implements IUserRepository {
//   getAll() {
//     return ["ORM"];
//   }
//   getById(id: string) {
//     return id;
//   }
// }

// let test: IUserRepository;
// let bd = "ORM";

// if (bd === "ORM") test = new ORM();
// else test = new ODM();

// console.log(test.getAll());

import { Sequelize, DataTypes, Model } from "sequelize";
import logger from "../logger/index.js";
import configLoader from "../configLoader/index.js";

let configConnectBD = {
  name: configLoader.main.config ? configLoader.main.config.BD.BDname : "",
  login: configLoader.main.config ? configLoader.main.config.BD.login : "root",
  pass: configLoader.main.config ? configLoader.main.config.BD.pass : "",
  host: configLoader.main.config ? configLoader.main.config.BD.ip : "",
  port: configLoader.main.config ? configLoader.main.config.BD.port : 0,
};
const sequelize = new Sequelize(configConnectBD.name, configConnectBD.login, configConnectBD.pass, {
  host: configConnectBD.host,
  port: configConnectBD.port,
  dialect: "mysql",
  logging: false,
});
class User extends Model {
  declare firstName: string;
  declare lastName: string;
}
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING },
  },
  { sequelize, tableName: "users" }
);

class User2 extends Model {
  declare firstName: string;
  declare lastName: string;
}
User2.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING },
  },
  { sequelize, tableName: "users2" }
);

async function connection() {
  try {
    await sequelize.authenticate();
    logger.bd.log("Успешное подключение к БД, начинаю синхронизацию моделей.");
    await sequelize.sync({ alter: true });

    logger.bd.log(`Процесс синхронизации моделей для прошёл успешно.`);
  } catch (error) {
    logger.bd.error(`Ошибка подключения: ${error}`);
  }
}
export default {
  sequelize: sequelize,
  user: User,
  connection: connection,
};
