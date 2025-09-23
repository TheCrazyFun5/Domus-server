import { Model, DataTypes } from "sequelize";
export class User extends Model {
}
function init(sequelize) {
    User.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        login: { type: DataTypes.STRING, allowNull: false },
        pass: { type: DataTypes.STRING, allowNull: false },
        mail: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: "user" },
        tgId: { type: DataTypes.INTEGER, allowNull: true },
    }, { sequelize: sequelize, tableName: "users" });
}
export { init };
//# sourceMappingURL=user.model.js.map