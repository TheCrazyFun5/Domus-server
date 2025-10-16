import { Model, DataTypes, Sequelize } from "sequelize";

export class Weather extends Model {
  declare id: number;
  declare APIkay: string;
  declare city: string;
}
function init(sequelize: Sequelize) {
  Weather.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      APIkay: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      city: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    },
    { sequelize: sequelize, tableName: "WeatherSettings" }
  );
}

export { init };
