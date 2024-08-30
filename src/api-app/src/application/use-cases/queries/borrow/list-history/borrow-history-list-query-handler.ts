import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import BorrowHistoryListQueryRepository from "../../../../../persistence/repositories/query/borrow-history-list-query-repository";

type BorrowHistoryListQuery = {
  associateId: number;
};

export default class BorrowHistoryListQueryHandler implements CommandHandler<BorrowHistoryListQuery, CommandResponse> {
  async execute(data: BorrowHistoryListQuery): Promise<CommandResponse> {
    try {
      const repository = new BorrowHistoryListQueryRepository();
      const result = await repository.all(data);

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

export type { BorrowHistoryListQuery };