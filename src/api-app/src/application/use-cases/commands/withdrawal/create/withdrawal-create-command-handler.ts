import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import Withdrawal from "../../../../../domain/entities/withdrawal";
import WithdrawalSaveRepository from "../../../../../persistence/repositories/save/withdrawal-save-repository";

type WithdrawalCreateCommand = {
  savingFundId: number;
  amount: number;
  isInterest: boolean
};

class WithdrawalCreateCommandHandler implements CommandHandler<WithdrawalCreateCommand, CommandResponse> {
  async execute(data: WithdrawalCreateCommand): Promise<CommandResponse> {
    const repository = new WithdrawalSaveRepository()

    try {
      const entity = new Withdrawal(
        data.savingFundId,
        data.amount,
        data.isInterest
      );

      const result = await repository.save(entity);

      return { successful: true, message: 'Retiro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Retiro no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { WithdrawalCreateCommand };
export default WithdrawalCreateCommandHandler;