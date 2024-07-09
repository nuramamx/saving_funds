import { db } from "../../instance";
import { ViewName } from "../../names/view-name";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import AgreementSpec from "../../specs/agreement-spec";
import { QueryTypes } from "sequelize";

export default class AgreementQueryRepository implements QueryRepositoryInfo<AgreementSpec> {
  async all(): Promise<AgreementSpec[]> {
    const result = await db.sequelize.query(ViewName.AGREEMENT_ALL, { type: QueryTypes.SELECT }) as AgreementSpec[];
    return result;
  }
}