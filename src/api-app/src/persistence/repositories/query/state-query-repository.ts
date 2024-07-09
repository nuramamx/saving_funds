import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StateSpec from "../../specs/state-spec";

export default class StateQueryRepository implements QueryRepositoryInfo<StateSpec> {
  async all(): Promise<StateSpec[]> {
    const result = await db.sequelize.query(ViewName.STATE_ALL, { type: QueryTypes.SELECT }) as StateSpec[];
    return result;
  }
}