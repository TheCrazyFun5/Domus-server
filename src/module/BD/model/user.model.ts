import { Model, DataTypes, Sequelize } from "sequelize";

export class User extends Model {
  declare id: number;
  declare login: string;
  declare pass: string;
  declare mail: string;
  declare role: String;
  declare tgId: Number;
}
function init(sequelize: Sequelize) {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      login: { type: DataTypes.STRING, allowNull: false },
      pass: { type: DataTypes.STRING, allowNull: false },
      mail: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: "user" },
      tgId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { sequelize: sequelize, tableName: "users" }
  );
}

export { init };
