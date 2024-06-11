import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class BorrowDb extends Model {
  public id!: number;
  public borrowId!: number;
  public numberPayments!: number;
  public interestToPay!: number;
  public guaranteeFund!: number;
  public payment!: number;
  public totalDue!: number;
  public amountDelivered!: number;
}

BorrowDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    borrowId: { type: DataTypes.INTEGER, unique: true, field: "borrow_id" },
    numberPayments: { type: DataTypes.TINYINT, allowNull: false, field: "number_payments" },
    interestToPay: { type: DataTypes.FLOAT(20,6), allowNull: false },
    guaranteeFund: { type: DataTypes.FLOAT(20,6), allowNull: false, field: "guarantee_fund" },
    payment: { type: DataTypes.FLOAT(20,6), allowNull: false },
    total: { type: DataTypes.FLOAT(20,6), allowNull: false, field: "total_due" },
    paidAmount: { type: DataTypes.FLOAT(20,6), allowNull: false, field: "paid_amount" },
  },
  { sequelize: db.sequelize, schema: "operation", tableName: "borrow_detail", modelName: "borrow_detail" }
)

export default BorrowDb;