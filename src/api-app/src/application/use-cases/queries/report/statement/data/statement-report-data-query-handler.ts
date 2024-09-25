import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import StatementReportDataQueryRepository from "../../../../../../persistence/repositories/query/statement-report-data-query-repository";
import { StatementReportDataQuery } from "../list/statement-report-list-query-handler";

export default class StatementReportDataQueryHandler implements CommandHandler<StatementReportDataQuery, CommandResponse> {
  async execute(data: StatementReportDataQuery): Promise<CommandResponse> {
    try {
      const repository = new StatementReportDataQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { StatementReportDataQuery };