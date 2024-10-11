import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import BorrowListQueryRepository from "../../../../../persistence/repositories/query/borrow-list-query-repository";

type BorrowListQuery = {
  associateId: number;
};

export default class BorrowListQueryHandler implements CommandHandler<BorrowListQuery, CommandResponse> {
  async execute(data: BorrowListQuery): Promise<CommandResponse> {
    try {
      const repository = new BorrowListQueryRepository();
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

export type { BorrowListQuery };