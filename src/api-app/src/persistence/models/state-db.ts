import { DataTypes, Model } from "sequelize";
import { db } from "../instance";
import CityDb from "./city-db";

class StateDb extends Model {
  public id!: number;
  public name!: string;
}

StateDb.init(
  {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(50), allowNull: false }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'state' }
);

export default StateDb;