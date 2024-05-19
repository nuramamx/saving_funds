import { DataTypes } from "sequelize";
import { db } from "./instance";
import NameInfo from '@core/domain/interfaces/name-info';

const Associate = db.sequelize.define(
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

const Workplace = db.sequelize.define(
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

const AssociateDetail = db.sequelize.define(
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

Associate.hasOne(Workplace, { foreignKey: 'associate_id',  as: 'workplace' });
Associate.hasOne(AssociateDetail, { foreignKey: 'associate_id', as: 'associate_detail'});

Workplace.belongsTo(Associate, { foreignKey: 'associate_id' });
AssociateDetail.belongsTo(Associate, { foreignKey: 'associate_id' });

export { 
    Associate,
    Workplace,
    AssociateDetail
}