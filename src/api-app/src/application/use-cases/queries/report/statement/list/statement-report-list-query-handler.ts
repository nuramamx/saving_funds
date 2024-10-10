import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import StatementReportListQueryRepository from "../../../../../../persistence/repositories/query/statement-report-list-query-repository";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import { StatementReportDataQuery } from "../data/statement-report-data-query-handler";

export default class StatementReportListQueryHandler implements CommandHandler<StatementReportDataQuery, CommandResponse> {
  async execute(data: StatementReportDataQuery): Promise<CommandResponse> {
    try {
      const repository = new StatementReportListQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}