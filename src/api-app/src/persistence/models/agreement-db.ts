import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class AgreementDb extends Model {
  public id!: number;
  public name!: string;
}

AgreementDb.init(
  {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(50), allowNull: false }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'agreement' }
)

export default AgreementDb;