import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import PaymentListByBorrowIdQueryRepository from "../../../../../persistence/repositories/query/payment-list-by-borrow-id-query-repository";

type PaymentListByBorrowIdQuery = {
  borrowId: number;
};

class PaymentListByBorrowIdQueryHandler implements CommandHandler<PaymentListByBorrowIdQuery, CommandResponse> {
  async execute(data: PaymentListByBorrowIdQuery): Promise<CommandResponse> {
    try {
      const repository = new PaymentListByBorrowIdQueryRepository();
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

export type { PaymentListByBorrowIdQuery };
export default PaymentListByBorrowIdQueryHandler;