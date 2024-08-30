import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AnnualRateListQueryRepository from '../../../../../persistence/repositories/query/annual-rate-list-query-repository';

export default class AnnualRateListQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const repository = new AnnualRateListQueryRepository();
    const list = await repository.all();

    return {
      successful: true,
      message: 'Valores de intereses cargados correctamente.',
      data: JSON.stringify(list),
      type: 'success'
    } as CommandResponse;
  }
}