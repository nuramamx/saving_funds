import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class CityDb extends Model {
  public id!: number;
  public stateId!: number;
  public name!: string;
}

CityDb.init(
  {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      stateId: { type: DataTypes.INTEGER, allowNull: false, field: "state_id" },
      name: { type: DataTypes.STRING(50), allowNull: false }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'city' }
)

export default CityDb;