import State from "../../../domain/entities/state";
import { StateDb } from "../../definitions";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";

export default class QueryStateRepository implements QueryRepositoryInfo<State> {
   all = async (): Promise<State[]> => {
    const data = await StateDb.findAll();
    const result = data.map((state: StateDb) => new State(state.id, state.name));
    
    return result;
  }
}