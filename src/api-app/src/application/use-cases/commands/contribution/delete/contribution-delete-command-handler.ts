import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import ContributionDeleteRepository from "../../../../../persistence/repositories/delete/contribution-delete-repository";

type ContributionDeleteCommand = {
  id: number;
}

export default class ContributionDeleteCommandHandler implements CommandHandler<ContributionDeleteCommand, CommandResponse> {
  async execute(data: ContributionDeleteCommand): Promise<CommandResponse> {
    const repository = new ContributionDeleteRepository();

    try { 
      const result = await repository.delete(data);

      return { successful: true, message: 'Registro fue eliminado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser eliminado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { ContributionDeleteCommand };