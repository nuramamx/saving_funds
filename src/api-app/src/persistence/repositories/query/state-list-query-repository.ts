import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StateListSpec from "../../specs/list/state-list-spec";

export default class StateListQueryRepository implements QueryRepositoryInfo<void, StateListSpec> {
  async all(): Promise<StateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.STATE_ALL, {
          type: QueryTypes.SELECT
        }
      ) as StateListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}