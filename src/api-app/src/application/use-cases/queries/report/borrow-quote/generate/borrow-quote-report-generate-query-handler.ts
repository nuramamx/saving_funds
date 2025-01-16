import Excel from "exceljs";
import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import BorrowQuoteReportService from "../../../../../../infrastructure/services/reports/borrow-quote-report-service";
import BorrowQuoteReportDataQueryRepository from "../../../../../../persistence/repositories/query/borrow-quote-report-data-query-repository";

type BorrowQuoteReportGenerateQuery = {
  borrowId: number;
};

export default class BorrowQuoteReportGenerateQueryHandler implements CommandHandler<BorrowQuoteReportGenerateQuery, Excel.Buffer> {
  async execute(data: BorrowQuoteReportGenerateQuery): Promise<Excel.Buffer> {
    try {
      const repositoryData = new BorrowQuoteReportDataQueryRepository();
      const resultData = await repositoryData.all(data);
      const excelReport = new BorrowQuoteReportService(resultData[0]);
      const buffer = await excelReport.create();

      return buffer;
    } catch (err: any) {
      throw err;
    }
  }
}

export type { BorrowQuoteReportGenerateQuery };