import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import Borrow from '../../../../../domain/entities/borrow';
import SaveBorrowRepository from '../../../../../persistence/repositories/write/save-borrow-repository';

interface CreateBorrowCommand {
  associateId: number;
  requestedAmount: number;
  period: number;
  annualRate: number;
  isFortnightly: boolean;
  isSettled: boolean;
}

class CreateBorrowCommandHandler implements CommandHandler<CreateBorrowCommand, CommandResponse> {
  execute = async (data: CreateBorrowCommand): Promise<CommandResponse> => {
    const borrowSaveRepository = new SaveBorrowRepository();

    try {
      const borrow = new Borrow(
        data.associateId,
        data.requestedAmount,
        data.period,
        data.annualRate,
        data.isFortnightly,
        false
      );
      const result = await borrowSaveRepository.save(borrow);

      return { successful: true, message: 'Socio fue creado con éxito.', data: JSON.stringify(result), type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Socio no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { CreateBorrowCommand };
export default CreateBorrowCommandHandler;