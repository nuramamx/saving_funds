import { db } from "../../instance";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import AgreementModel from "../../models/agreement-model";

export default class QueryAgreementRepository implements QueryRepositoryInfo<AgreementModel> {
   all = async (): Promise<AgreementModel[]> => {
    const [results, metadata]: any = await db.sequelize.query(ViewName.AGREEMENT_ALL);
    
    return results;
  }
}