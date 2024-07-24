import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import ListBorrowDebtorQueryRepository from "../../../../../persistence/repositories/query/list-borrow-debtor-query-repository";

export default class ListBorrowDebtorQueryHandler implements CommandHandler<void, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const listBorrowDebtorQueryRepository = new ListBorrowDebtorQueryRepository();
      const result = await listBorrowDebtorQueryRepository.all();

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Registros no localizados.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}