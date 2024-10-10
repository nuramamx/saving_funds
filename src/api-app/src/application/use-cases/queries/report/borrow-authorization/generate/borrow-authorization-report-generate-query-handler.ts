import Excel from "exceljs";
import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import BorrowAuthorizationReportDataQueryRepository from "../../../../../../persistence/repositories/query/borrow-authorization-report-data-query-repository";
import BorrowAuthorizationReportService from "../../../../../../infrastructure/services/reports/borrow-authorization-report-service";

type BorrowAuthorizationReportGenerateQuery = {
  borrowId: number;
};

export default class BorrowAuthorizationReportGenerateQueryHandler implements CommandHandler<BorrowAuthorizationReportGenerateQuery, Excel.Buffer> {
  async execute(data: BorrowAuthorizationReportGenerateQuery): Promise<Excel.Buffer> {
    try {
      const repositoryData = new BorrowAuthorizationReportDataQueryRepository();
      const resultData = await repositoryData.all(data);
      const excelReport = new BorrowAuthorizationReportService(resultData[0]);
      const buffer = await excelReport.create();

      return buffer;
    } catch (err: any) {
      throw err;
    }
  }
}

export type { BorrowAuthorizationReportGenerateQuery };