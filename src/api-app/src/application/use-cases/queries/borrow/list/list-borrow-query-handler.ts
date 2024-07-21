import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import ListBorrowQueryRepository from "../../../../../persistence/repositories/query/list-borrow-query-repository";

export default class ListBorrowQueryHandler implements CommandHandler<boolean, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const listBorrowQueryRepository = new ListBorrowQueryRepository();
      const result = await listBorrowQueryRepository.all();

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