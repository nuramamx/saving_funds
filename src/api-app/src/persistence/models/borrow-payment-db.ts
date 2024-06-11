import { DataTypes, Model } from "sequelize";
import { db } from "../instance";
import BorrowPaymentStatus from "../../domain/enums/borrow-payment-status";

class BorrowPaymentDb extends Model {
  public id!: number;
  public borrowId!: number;
  public paymentNumber!: number;
  public amount!: number;
  public status!: BorrowPaymentStatus;
}

BorrowPaymentDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    borrowId: { type: DataTypes.INTEGER, field: "borrow_id" },
    paymentNumber: { type: DataTypes.TINYINT, allowNull: false, field: "payment_number" },
    amount: { type: DataTypes.FLOAT(20,6), allowNull: false },
    status: { type: DataTypes.CHAR(1), allowNull: false }
  },
  { sequelize: db.sequelize, schema: "operation", tableName: "borrow_payment", modelName: "borrow_payment" }
)

export default BorrowPaymentDb;