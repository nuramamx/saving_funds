import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import PaymentDeleteRepository from "../../../../../persistence/repositories/delete/payment-delete-repository";

type PaymentDeleteCommand = {
  id: number;
}

export default class PaymentDeleteCommandHandler implements CommandHandler<PaymentDeleteCommand, CommandResponse> {
  async execute(data: PaymentDeleteCommand): Promise<CommandResponse> {
    const repository = new PaymentDeleteRepository();

    try { 
      const result = await repository.delete(data);

      return { successful: true, message: 'Registro fue eliminado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser eliminado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { PaymentDeleteCommand };