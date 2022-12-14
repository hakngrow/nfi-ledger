import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        get() {
            const rawValue = this.getDataValue('balance');
            return parseFloat(rawValue);
        }
    }
}, {
    freezeTableName: true
});

export default User;

(async () => {
    await db.sync();
})();