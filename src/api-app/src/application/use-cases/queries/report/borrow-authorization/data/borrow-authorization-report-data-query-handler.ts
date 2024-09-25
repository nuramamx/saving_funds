import { BorrowAuthorizationReportGenerateQuery } from "../generate/borrow-authorization-report-generate-query-handler";
import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import BorrowAuthorizationReportDataQueryRepository from "../../../../../../persistence/repositories/query/borrow-authorization-report-data-query-repository";

export default class BorrowAuthorizationReportDataQueryHandler implements CommandHandler<BorrowAuthorizationReportGenerateQuery, CommandResponse> {
  async execute(data: BorrowAuthorizationReportGenerateQuery): Promise<CommandResponse> {
    try {
      const repository = new BorrowAuthorizationReportDataQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}