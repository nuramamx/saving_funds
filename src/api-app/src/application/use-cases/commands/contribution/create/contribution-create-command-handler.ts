import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import Contribution from "../../../../../domain/entities/contribution";
import ContributionSaveRepository from "../../../../../persistence/repositories/save/contribution-save-repository";

type ContributionCreateCommand = {
  savingFundId: number;
  appliedAt: Date;
  amount: number;
};

class ContributionCreateCommandHandler implements CommandHandler<ContributionCreateCommand, CommandResponse> {
  async execute(data: ContributionCreateCommand): Promise<CommandResponse> {
    const repository = new ContributionSaveRepository()

    try {
      const entity = new Contribution(
        data.savingFundId,
        data.appliedAt,
        data.amount
      );

      const result = await repository.save(entity);

      return { successful: true, message: 'Aportación fue creada con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Aportación no pudo ser creada.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { ContributionCreateCommand };
export default ContributionCreateCommandHandler;