import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import WithdrawalDeleteRepository from "../../../../../persistence/repositories/delete/withdrawal-delete-repository";

type WithdrawalDeleteCommand = {
  id: number;
}

export default class WithdrawalDeleteCommandHandler implements CommandHandler<WithdrawalDeleteCommand, CommandResponse> {
  async execute(data: WithdrawalDeleteCommand): Promise<CommandResponse> {
    const repository = new WithdrawalDeleteRepository();

    try { 
      const result = await repository.delete(data);

      return { successful: true, message: 'Registro fue eliminado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser eliminado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { WithdrawalDeleteCommand };