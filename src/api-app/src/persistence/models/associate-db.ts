import { DataTypes, Model } from "sequelize";
import { db } from "../instance";
import NameInfo from "../../domain/interfaces/name-info";
import WorkplaceDb from "./workplace-db";
import AssociateDetailDb from "./associate-detail-db";
import AddressDb from "./address-db";

class AssociateDb extends Model {
  public id!: number;
  public name!: NameInfo;
  public rfc!: string;
  public gender!: string;
}

AssociateDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.JSONB, allowNull: false,
      get() {
        const value = this.getDataValue("name");
        return typeof value === "string" ? JSON.parse(value) as NameInfo : value as NameInfo;
      }
    },
    rfc: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.CHAR, allowNull: false }
  },
  { sequelize: db.sequelize, schema: "catalog", tableName: "associate", modelName: "associate" }
);

export default AssociateDb;