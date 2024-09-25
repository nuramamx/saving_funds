import Excel from "exceljs";
import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import StatementReportService from "../../../../../../infrastructure/services/reports/statement-report-service";
import StatementReportDataQueryRepository from "../../../../../../persistence/repositories/query/statement-report-data-query-repository";
import StatementReportListQueryRepository from "../../../../../../persistence/repositories/query/statement-report-list-query-repository";

type StatementReportGenerateQuery = {
  associateId: number;
};

export default class StatementReportGenerateQueryHandler implements CommandHandler<StatementReportGenerateQuery, Excel.Buffer> {
  async execute(data: StatementReportGenerateQuery): Promise<Excel.Buffer> {
    try {
      const repositoryData = new StatementReportDataQueryRepository();
      const repositoryList = new StatementReportListQueryRepository();
      const resultData = await repositoryData.all(data);
      const resultList = await repositoryList.all(data);
      const excelReport = new StatementReportService(resultData[0], resultList);
      const buffer = await excelReport.create();

      return buffer;
    } catch (err: any) {
      throw err;
    }
  }
}

export type { StatementReportGenerateQuery };