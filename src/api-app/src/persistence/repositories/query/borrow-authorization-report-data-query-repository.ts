import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { BorrowAuthorizationReportGenerateQuery } from "../../../application/use-cases/queries/report/borrow-authorization/generate/borrow-authorization-report-generate-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import BorrowAuthorizationReportDataSpec from "../../specs/data/borrow-autorization-report-data-spec";

export default class BorrowAuthorizationReportDataQueryRepository implements QueryRepositoryInfo<BorrowAuthorizationReportGenerateQuery, BorrowAuthorizationReportDataSpec> {
  async all(data: BorrowAuthorizationReportGenerateQuery): Promise<BorrowAuthorizationReportDataSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.BORROW_AUTHORIZATION_REPORT_DATA, {
          replacements: {
            p_borrow_id: data.borrowId
          },
          type: QueryTypes.SELECT
        }
      ) as BorrowAuthorizationReportDataSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}