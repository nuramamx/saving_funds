import { db } from "../../instance";
import { ViewName } from "../../names/view-name";
import { QueryTypes } from "sequelize";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import AgreementListSpec from "../../specs/list/agreement-list-spec";

export default class AgreementListQueryRepository implements QueryRepositoryInfo<void, AgreementListSpec> {
  async all(): Promise<AgreementListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.AGREEMENT_ALL, {
          type: QueryTypes.SELECT
        }
      ) as AgreementListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}