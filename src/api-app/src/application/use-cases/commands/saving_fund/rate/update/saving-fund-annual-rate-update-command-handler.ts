import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import SavingFundAnnualRateSaveRepository from "../../../../../../persistence/repositories/save/saving-fund-annual-rate-save-repository";

type SavingFundAnnualRateUpdateCommand = {
  id: number;
  rate: number;
};

export default class SavingFundAnnualRateUpdateCommandHandler implements CommandHandler<SavingFundAnnualRateUpdateCommand, CommandResponse> {
  async execute(data: SavingFundAnnualRateUpdateCommand): Promise<CommandResponse> {
    const repository = new SavingFundAnnualRateSaveRepository()

    try {
      const result = await repository.save(data);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'El registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { SavingFundAnnualRateUpdateCommand };