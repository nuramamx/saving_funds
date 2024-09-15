import { Sequelize } from "sequelize";
import { DbInfo } from "./interfaces/db-info";

const sequelize = new Sequelize('saving_fund', 'chachicha', '9834', {
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
  timezone: 'America/Mexico_City',
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
});

const db = {} as DbInfo;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export { db };