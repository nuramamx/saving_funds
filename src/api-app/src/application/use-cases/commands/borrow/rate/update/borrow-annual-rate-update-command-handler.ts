import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import BorrowAnnualRateSaveRepository from "../../../../../../persistence/repositories/save/borrow-annual-rate-save-repository";

type BorrowAnnualRateUpdateCommand = {
  id: number;
  rate: number;
};

export default class BorrowAnnualRateUpdateCommandHandler implements CommandHandler<BorrowAnnualRateUpdateCommand, CommandResponse> {
  async execute(data: BorrowAnnualRateUpdateCommand): Promise<CommandResponse> {
    const repository = new BorrowAnnualRateSaveRepository()

    try {
      const result = await repository.save(data);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'El registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { BorrowAnnualRateUpdateCommand };