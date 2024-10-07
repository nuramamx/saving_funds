import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import Borrow from '../../../../../domain/entities/borrow';
import BorrowSaveRepository from '../../../../../persistence/repositories/save/borrow-save-repository';

type BorrowCreateCommand = {
  associateId: number;
  requestedAmount: number;
  period: number;
  annualRate: number;
  isFortnightly: boolean;
  isSettled: boolean;
  startAt: Date;
};

export default class BorrowCreateCommandHandler implements CommandHandler<BorrowCreateCommand, CommandResponse> {
  async execute (data: BorrowCreateCommand): Promise<CommandResponse> {
    const borrowSaveRepository = new BorrowSaveRepository();

    try {
      const borrow = new Borrow(
        data.associateId,
        data.requestedAmount,
        data.period,
        data.annualRate,
        data.isFortnightly,
        false,
        data.startAt
      );

      const result = await borrowSaveRepository.save(borrow);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { BorrowCreateCommand };