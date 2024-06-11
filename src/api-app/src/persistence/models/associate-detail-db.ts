import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class AssociateDetailDb extends Model {
  public id!: number;
  public associateId!: number;
  public agreementId!: number;
  public dependencyKey!: string;
  public category!: string;
  public salary!: number;
  public socialContribution!: number;
  public fortnightlyContribution!: number;
  public requestDate!: Date
}

AssociateDetailDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    associateId: { type: DataTypes.INTEGER, unique: true, field: "associate_id" },
    agreementId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "agreement_id" },
    dependencyKey: { type: DataTypes.STRING(10), allowNull: false, field: "dependency_key" },
    category: { type: DataTypes.STRING(8), allowNull: false },
    salary: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
    socialContribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false, field: "social_contribution" },
    fortnightlyContribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false, field: "fortnightly_contribution" },
    requestDate: { type: DataTypes.DATE, allowNull: true, field: "request_date" }
  },
  { sequelize: db.sequelize, schema: 'catalog', tableName: 'associate_detail', modelName: "detail" }
);

export default AssociateDetailDb;