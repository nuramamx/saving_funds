import { DataTypes, Model } from "sequelize";
import { db } from "../instance";

class AddressDb extends Model {
  public id!: number;
  public associateId!: number;
  public cityId!: number;
  public street!: string;
  public settlement!: string;
  public town!: string;
  public postalCode!: string;
  public phone!: string;
  public mobile!: string;
  public email!: string;
}

AddressDb.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    associateId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "associate_id" },
    cityId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "city_id" },
    street: { type: DataTypes.STRING, allowNull: false },
    settlement: { type: DataTypes.STRING, allowNull: false },
    town: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false, field: "postal_code" },
    phone: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize: db.sequelize, schema: "catalog", tableName: "address" }
);

export default AddressDb;