import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import ListBorrowHistoryQueryRepository from "../../../../../persistence/repositories/query/list-borrow-history-query-repository";

type ListBorrowHistoryQuery = {
  associateId: number;
};

export default class ListBorrowHistoryQueryHandler implements CommandHandler<ListBorrowHistoryQuery, CommandResponse> {
  async execute(data: ListBorrowHistoryQuery): Promise<CommandResponse> {
    try {
      const listBorrowHistoryQueryRepository = new ListBorrowHistoryQueryRepository();
      const result = await listBorrowHistoryQueryRepository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: JSON.stringify(result), type: 'success' } as CommandResponse;;
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

export type { ListBorrowHistoryQuery };