import { db } from "../../instance";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StateModel from "../../models/state-model";

export default class QueryStateRepository implements QueryRepositoryInfo<StateModel> {
   all = async (): Promise<StateModel[]> => {
    const [results, metadata]: any = await db.sequelize.query(ViewName.STATE_ALL);
    
    return results;
  }
}