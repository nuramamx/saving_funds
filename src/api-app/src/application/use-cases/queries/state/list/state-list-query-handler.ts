import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import StateListQueryRepository from '../../../../../persistence/repositories/query/state-list-query-repository';

class StateListQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const repository = new StateListQueryRepository();
    const list = await repository.all();

    return { successful: true, message: 'Estados generadas correctamente.', data: JSON.stringify(list), type: 'success' } as CommandResponse;
  }
}

export default StateListQueryHandler;