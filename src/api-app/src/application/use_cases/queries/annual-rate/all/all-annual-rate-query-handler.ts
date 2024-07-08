import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import QueryAnnualRateRepository from '../../../../../persistence/repositories/read/query-annual-rate-repository';

export default class AllAnnualRateQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const annualRateRepository = new QueryAnnualRateRepository();
    const list = await annualRateRepository.all();

    return {
      successful: true,
      message: 'Valores de intereses cargados correctamente.',
      data: JSON.stringify(list),
      type: 'success'
    } as CommandResponse;
  }
}