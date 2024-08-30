import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import CityListSpec from "../../specs/list/city-list-spec";

export default class CityListQueryRepository implements QueryRepositoryInfo<void, CityListSpec> {
  async all(): Promise<CityListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.CITY_ALL, {
          type: QueryTypes.SELECT
        }
      ) as CityListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}