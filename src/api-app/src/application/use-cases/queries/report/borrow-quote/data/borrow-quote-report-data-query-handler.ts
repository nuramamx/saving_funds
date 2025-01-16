import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import BorrowQuoteReportDataQueryRepository from "../../../../../../persistence/repositories/query/borrow-quote-report-data-query-repository";
import { BorrowQuoteReportGenerateQuery } from "../generate/borrow-quote-report-generate-query-handler";

type BorrowQuoteReportDataQuery = BorrowQuoteReportGenerateQuery & {}

export default class BorrowQuoteReportDataQueryHandler implements CommandHandler<BorrowQuoteReportDataQuery, CommandResponse> {
  async execute(data: BorrowQuoteReportDataQuery): Promise<CommandResponse> {
    try {
      const repository = new BorrowQuoteReportDataQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { BorrowQuoteReportDataQuery }