import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import Payment from "../../../../../domain/entities/payment";
import PaymentSaveRepository from "../../../../../persistence/repositories/save/payment-save-rrepository";

type PaymentCreateCommand = {
  borrowId: number;
  number: number;
  paidAmount: number;
};

class PaymentCreateCommandHandler implements CommandHandler<PaymentCreateCommand, CommandResponse> {
  async execute(data: PaymentCreateCommand): Promise<CommandResponse> {
    const repository = new PaymentSaveRepository();

    try {
      const payment = new Payment(
        data.borrowId,
        data.number,
        data.paidAmount
      );

      const result = await repository.save(payment);

      return {
        successful: true,
        message: 'Pago fue creado con éxito.',
        data: result,
        type: 'success'
      } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Pago no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { PaymentCreateCommand };
export default PaymentCreateCommandHandler;