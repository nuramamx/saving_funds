import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import ListPaymentByBorrowIdQueryRepository from "../../../../../persistence/repositories/query/list-payment-by-borrow-id-query-repository";

type ListPaymentByBorrowIdQuery = {
  borrowId: number;
};

class ListPaymentByBorrowIdQueryHandler implements CommandHandler<ListPaymentByBorrowIdQuery, CommandResponse> {
  async execute(data: ListPaymentByBorrowIdQuery): Promise<CommandResponse> {
    try {
      const listPaymentByBorrowIdQueryRepository = new ListPaymentByBorrowIdQueryRepository();
      const result = await listPaymentByBorrowIdQueryRepository.all(data);

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

export type { ListPaymentByBorrowIdQuery };
export default ListPaymentByBorrowIdQueryHandler;