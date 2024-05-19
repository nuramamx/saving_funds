import { Sequelize } from "sequelize";
import { DbInfo } from "./interfaces/db-info";

const sequelize = new Sequelize('savingfunds', 'chachicha', '9834', {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
});

const db = {} as DbInfo;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export { db };