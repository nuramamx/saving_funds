import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { StatementReportGenerateQuery } from "../../../application/use-cases/queries/report/statement/generate/statement-report-generate-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StatementReportListSpec from "../../specs/list/statement-report-list-spec";

export default class StatementReportListQueryRepository implements QueryRepositoryInfo<StatementReportGenerateQuery, StatementReportListSpec> {
  async all(data: StatementReportGenerateQuery): Promise<StatementReportListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.STATEMENT_REPORT_LIST, {
          replacements: {
            p_associate_id: data.associateId
          },
          type: QueryTypes.SELECT
        }
      ) as StatementReportListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}