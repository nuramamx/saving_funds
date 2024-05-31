import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class WorkplaceDb extends Model {
  public id!: number;
  public key!: string;
  public name!: string;
  public phone!: string;
}

WorkplaceDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    associateId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "associate_id" },
    key: { type: DataTypes.CHAR(5), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    phone: { type: DataTypes.STRING(10), allowNull: false }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'workplace' }
);

export default WorkplaceDb;