import { Sequelize } from "sequelize";

export interface DbInfo {
    sequelize: Sequelize,
    Sequelize: any
}