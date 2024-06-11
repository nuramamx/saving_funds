import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class AuditDb extends Model {
  public id!: number;
  public userId!: number;
  public oldData!: string;
  public newData!: string;
}

AuditDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, field: "user_id" },
    oldData: { type: DataTypes.JSONB, allowNull: false, field: "old_data" },
    newData: { type: DataTypes.JSONB, allowNull: false,  field: "new_data" }
  },
  { sequelize: db.sequelize, schema: "log", tableName: "audit", modelName: "audit" }
)

export default AuditDb;