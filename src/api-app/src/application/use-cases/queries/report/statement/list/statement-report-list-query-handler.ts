import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import StatementReportService from "../../../../../../infrastructure/services/reports/statement-report-service";
import Excel from "exceljs";
import StatementReportListQueryRepository from "../../../../../../persistence/repositories/query/statement-report-list-query-repository";
import StatementReportDataQueryRepository from "../../../../../../persistence/repositories/query/statement-report-data-query-repository";

type StatementReportDataQuery = {
  associateId: number;
};

export default class StatementReportListQueryHandler implements CommandHandler<StatementReportDataQuery, Excel.Buffer> {
  async execute(data: StatementReportDataQuery): Promise<Excel.Buffer> {
    try {
      const repository = new StatementReportListQueryRepository();
      const repositoryData = new StatementReportDataQueryRepository();
      const result = await repository.all(data);
      const resultData = await repositoryData.all(data);
      const excelReport = new StatementReportService(resultData[0], result);
      const buffer = await excelReport.create();

      return buffer
    } catch (err: any) {
      throw err;
    }
  }
}

export type { StatementReportDataQuery };