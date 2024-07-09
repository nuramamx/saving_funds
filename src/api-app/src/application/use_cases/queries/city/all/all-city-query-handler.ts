import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import CityQueryRepository from '../../../../../persistence/repositories/query/city-query-repository';

class AllCityQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const cityRepository = new CityQueryRepository();
    const list = await cityRepository.all();

    return { successful: true, message: 'Ciudades generadas correctamente.', data: JSON.stringify(list), type: 'success' } as CommandResponse;
  }
}

export default AllCityQueryHandler;