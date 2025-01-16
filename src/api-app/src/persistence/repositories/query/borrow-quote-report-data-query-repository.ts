import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { BorrowQuoteReportGenerateQuery } from "../../../application/use-cases/queries/report/borrow-quote/generate/borrow-quote-report-generate-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import BorrowQuoteReportDataSpec from "../../specs/data/borrow-autorization-report-data-spec";

export default class BorrowQuoteReportDataQueryRepository implements QueryRepositoryInfo<BorrowQuoteReportGenerateQuery, BorrowQuoteReportDataSpec> {
  async all(data: BorrowQuoteReportGenerateQuery): Promise<BorrowQuoteReportDataSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.BORROW_QUOTE_REPORT_DATA, {
          replacements: {
            p_borrow_id: data.borrowId
          },
          type: QueryTypes.SELECT
        }
      ) as BorrowQuoteReportDataSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}