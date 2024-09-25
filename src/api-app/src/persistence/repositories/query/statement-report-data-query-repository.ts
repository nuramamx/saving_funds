import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { StatementReportGenerateQuery } from "../../../application/use-cases/queries/report/statement/generate/statement-report-generate-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import StatementReportDataSpec from "../../specs/data/statement-report-data-spec";

export default class StatementReportDataQueryRepository implements QueryRepositoryInfo<StatementReportGenerateQuery, StatementReportDataSpec> {
  async all(data: StatementReportGenerateQuery): Promise<StatementReportDataSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.STATEMENT_REPORT_DATA, {
          replacements: {
            p_associate_id: data.associateId
          },
          type: QueryTypes.SELECT
        }
      ) as StatementReportDataSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}