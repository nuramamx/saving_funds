import { DataTypes } from "sequelize";
import { db } from "./instance";

const AssociateDb = db.sequelize.define(
    'associate',
    {
        associate_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
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
        workplace_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        associate_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        key: { type: DataTypes.CHAR(5), allowNull: false },
        name: { type: DataTypes.STRING(50), allowNull: false },
        phone: { type: DataTypes.STRING(10), allowNull: false }
    },
    { schema: 'catalog', tableName: 'workplace' }
);

const AssociateDetailDb = db.sequelize.define(
    'associate_detail',
    {
        associate_detail_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        associate_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        dependency_key: { type: DataTypes.STRING(10), allowNull: false },
        agreement: { type: DataTypes.STRING(5), allowNull: false },
        category: { type: DataTypes.STRING(8), allowNull: false },
        salary: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
        social_contribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
        fortnightly_contribution: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
        request_date: { type: DataTypes.DATE, allowNull: false }
    },
    { schema: 'catalog', tableName: 'associate_detail' }
)

const StateDb = db.sequelize.define(
    'state',
    {
        state_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        key: { type: DataTypes.CHAR(3), allowNull: false, unique: true },
        name: { type: DataTypes.STRING(50), allowNull: false }
    },
    { schema: 'catalog', tableName: 'state' }
)

const CityDb = db.sequelize.define(
    'city',
    {
        city_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        state_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING(50), allowNull: false }
    },
    { schema: 'catalog', tableName: 'city' }
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