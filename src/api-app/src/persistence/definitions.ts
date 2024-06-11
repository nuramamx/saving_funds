import CityDb from "./models/city-db";
import StateDb from "./models/state-db";
import AgreementDb from "./models/agreement-db";
import AssociateDb from "./models/associate-db";
import WorkplaceDb from "./models/workplace-db";
import AssociateDetailDb from "./models/associate-detail-db";
import AddressDb from "./models/address-db";

AssociateDb.hasOne(WorkplaceDb, { foreignKey: { name: "associate_id", allowNull: false }, as: "workplace" });
WorkplaceDb.belongsTo(AssociateDb, { foreignKey: "associate_id", as: "associate" });

AssociateDb.hasOne(AssociateDetailDb, { foreignKey: { name: "associate_id", allowNull: false }, as: "detail" });
AssociateDetailDb.belongsTo(AssociateDb, { foreignKey: "associate_id", as: "associate" });

AssociateDb.hasOne(AddressDb, { foreignKey: { name: "associate_id", allowNull: false }, as: "address" });
AddressDb.belongsTo(AssociateDb, { foreignKey: "associate_id", as: "associate" });

CityDb.hasMany(AddressDb, { foreignKey: "city_id" });
AddressDb.belongsTo(CityDb, { foreignKey: "city_id" });

StateDb.hasMany(CityDb, { foreignKey: "state_id" });
CityDb.belongsTo(StateDb, { foreignKey: 'state_id' });

export { 
  AssociateDb,
  WorkplaceDb,
  AssociateDetailDb,
  AddressDb,
  StateDb,
  CityDb,
  AgreementDb
}