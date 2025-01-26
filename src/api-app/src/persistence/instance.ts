import { Sequelize } from "sequelize";
import { DbInfo } from "./interfaces/db-info";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`)
});

const sequelize = new Sequelize(
  String(process.env.DB_NAME), 
  String(process.env.DB_USER), 
  String(process.env.DB_PASSWORD),
  {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectModule: require('pg'),
    timezone: '+00:00',
    retry: {
      match: [/Deadlock/i],
      max: 3, // Maximum rety 3 times
      backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  }
);

const db = {} as DbInfo;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export { db };