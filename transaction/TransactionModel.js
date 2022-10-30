import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Transaction = db.define('transactions', {
    type: DataTypes.STRING,
    username: DataTypes.STRING,
    amount: DataTypes.DECIMAL
}, {
    freezeTableName: true
});

export default Transaction;

(async () => {
    await db.sync();
})();