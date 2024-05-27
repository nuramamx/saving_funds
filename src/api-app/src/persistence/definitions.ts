import { DataTypes } from "sequelize";
import { db } from "./instance";
import CityDb from "./models/city-db";

const AssociateDb = db.sequelize.define(
    'associate',
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        fullname: { type: DataTypes.JSONB, allowNull: false, 
            get() {
                const value = this.getDataValue('fullname');
                return typeof value === 'string' ? JSON.parse(value) : value;
            }
        },
        rfc: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.CHAR, allowNull: false }
    },
    { schema: 'catalog', tableName: 'associate' }
);

const WorkplaceDb = db.sequelize.define(
    'workplace',
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        associateId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "associate_id" },
        key: { type: DataTypes.CHAR(5), allowNull: false },
        name: { type: DataTypes.STRING(50), allowNull: false },
        phone: { type: DataTypes.STRING(10), allowNull: false }
    },
    { schema: 'catalog', tableName: 'workplace' }
);

const AssociateDetailDb = db.sequelize.define(
    'associate_detail',
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        associateId: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: "associate_id" },
        dependencyKey: { type: DataTypes.STRING(10), allowNull: false, field: "dependency_key" },
        agreement: { type: DataTypes.STRING(5), allowNull: false },
        category: { type: DataTypes.STRING(8), allowNull: false },
        salary: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
        socialContribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false, field: "social_contribution" },
        fortnightlyContribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false, field: "fortnightly_contribution" },
        requestDate: { type: DataTypes.DATE, allowNull: false, field: "request_date" }
    },
    { schema: 'catalog', tableName: 'associate_detail' }
)

const StateDb = db.sequelize.define(
    'state',
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        key: { type: DataTypes.CHAR(3), allowNull: false, unique: true },
        name: { type: DataTypes.STRING(50), allowNull: false }
    },
    { schema: 'catalog', tableName: 'state' }
)

AssociateDb.hasOne(WorkplaceDb, { foreignKey: 'associate_id',  as: 'workplace' });
AssociateDb.hasOne(AssociateDetailDb, { foreignKey: 'associate_id', as: 'associate_detail'});
StateDb.hasMany(CityDb, { foreignKey: 'state_id', as: 'state' });

WorkplaceDb.belongsTo(AssociateDb, { foreignKey: 'associate_id' });
AssociateDetailDb.belongsTo(AssociateDb, { foreignKey: 'associate_id' });
CityDb.belongsTo(StateDb, { foreignKey: 'state_id' });

export { 
    AssociateDb,
    WorkplaceDb,
    AssociateDetailDb,
    StateDb,
    CityDb
}