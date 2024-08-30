import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import CityListQueryRepository from '../../../../../persistence/repositories/query/city-list-query-repository';

class CityListQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const repository = new CityListQueryRepository();
    const list = await repository.all();

    return { successful: true, message: 'Ciudades generadas correctamente.', data: list, type: 'success' } as CommandResponse;
  }
}

export default CityListQueryHandler;