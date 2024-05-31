import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import QueryCityRepository from "../../../../../persistence/repositories/read/query-city-repository";

class AllCityQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const queryRepository = new QueryCityRepository();
    const list = await queryRepository.all();

    return { successful: true, message: "Ciudades generadas correctamente.", data: JSON.stringify(list), type: 'success' } as CommandResponse;
  }
}

export default AllCityQueryHandler;