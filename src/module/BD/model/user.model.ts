import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index.js";

export class User extends Model {
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
