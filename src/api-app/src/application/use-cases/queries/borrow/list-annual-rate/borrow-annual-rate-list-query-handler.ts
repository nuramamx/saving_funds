import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import BorrowAnnualRateListQueryRepository from '../../../../../persistence/repositories/query/borrow-annual-rate-list-query-repository';

export default class BorrowAnnualRateListQueryHandler implements CommandHandler<void, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const repository = new BorrowAnnualRateListQueryRepository();
      const result = await repository.all();

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}