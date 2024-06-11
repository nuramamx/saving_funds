import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class BorrowDb extends Model {
  public id!: number;
  public associateId!: number;
  public requestedAmount!: number;
  public period!: number;
  public annualRate!: number;
  public requestDate!: number;
  public isFortnightly!: boolean;
}

BorrowDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    associateId: { type: DataTypes.INTEGER, field: "associate_id" },
    requestedAmount: { type: DataTypes.FLOAT(20,6), allowNull: false, field: "requested_amount" },
    period: { type: DataTypes.TINYINT, allowNull: false },
    annualRate: { type: DataTypes.TINYINT, allowNull: false },
    requestDate: { type: DataTypes.DATE, allowNull: false, field: "request_date" },
    isFortnightly: { type: DataTypes.BOOLEAN, allowNull: false, field: "is_fortnightly" }
  },
  { sequelize: db.sequelize, schema: "operation", tableName: "borrow", modelName: "borrow" }
)

export default BorrowDb;