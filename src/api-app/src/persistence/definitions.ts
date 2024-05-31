import CityDb from "./models/city-db";
import StateDb from "./models/state-db";
import AgreementDb from "./models/agreement-db";
import AssociateDb from "./models/associate-db";
import WorkplaceDb from "./models/workplace-db";
import AssociateDetailDb from "./models/associate-detail-db";
import AddressDb from "./models/address-db";

AssociateDb.hasOne(WorkplaceDb, { foreignKey: "associateId" });
WorkplaceDb.belongsTo(AssociateDb);

AssociateDb.hasOne(AssociateDetailDb, { foreignKey: "associateId" });
AssociateDetailDb.belongsTo(AssociateDb);

AssociateDb.hasOne(AddressDb, { foreignKey: "associate_id" });
AddressDb.belongsTo(AssociateDb);

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