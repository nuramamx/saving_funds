import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ViewName } from "../../names/view-name";
import State from "../../../domain/entities/state";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StateModel from "../../models/state-model";

export default class QueryStateRepository implements QueryRepositoryInfo<State> {
   all = async (): Promise<State[]> => {
    const [results]: any = await db.sequelize.query(
      ViewName.STATE_ALL,
      {
        type: QueryTypes.SELECT,
      }
    );

    const data = results.map((row: StateModel) => new State(row.id, row.name));
    
    return [];
  }
}