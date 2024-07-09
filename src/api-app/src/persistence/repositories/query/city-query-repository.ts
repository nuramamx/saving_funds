import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import CitySpec from "../../specs/city-spec";

export default class CityQueryRepository implements QueryRepositoryInfo<CitySpec> {
  async all(): Promise<CitySpec[]> {
    const result = await db.sequelize.query(ViewName.CITY_ALL, { type: QueryTypes.SELECT }) as CitySpec[];
    return result;
  }
}