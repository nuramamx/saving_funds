import Agreement from "../../../domain/entities/agreement";
import { AgreementDb } from "../../definitions";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";

export default class QueryAgreementRepository implements QueryRepositoryInfo<Agreement> {
   all = async (): Promise<Agreement[]> => {
    const data = await AgreementDb.findAll();
    const result = data.map((item: AgreementDb) => new Agreement(item.id, item.name));
    
    return result;
  }
}