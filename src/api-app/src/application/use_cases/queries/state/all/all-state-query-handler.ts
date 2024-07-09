import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import StateQueryRepository from '../../../../../persistence/repositories/query/state-query-repository';

class AllStateQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const stateRepository = new StateQueryRepository();
    const list = await stateRepository.all();

    return { successful: true, message: 'Estados generadas correctamente.', data: JSON.stringify(list), type: 'success' } as CommandResponse;
  }
}

export default AllStateQueryHandler;