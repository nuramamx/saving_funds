import { DataTypes, Model } from "sequelize";
import { db } from "../instance";
import AssociateDb from "./associate-db";

class WorkplaceDb extends Model {
  public id!: number;
  public associateId!: number;
  public key!: string;
  public name!: string;
  public phone!: string;
}

WorkplaceDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    associateId: { type: DataTypes.INTEGER, unique: true, field: "associate_id", references: {
      model: AssociateDb,
      key: 'id',
    }},
    key: { type: DataTypes.CHAR(5), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    phone: { type: DataTypes.STRING(10), allowNull: false }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'workplace', modelName: "workplace" }
);

export default WorkplaceDb;