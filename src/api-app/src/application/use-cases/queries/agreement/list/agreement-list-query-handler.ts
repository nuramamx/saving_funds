import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AgreementListQueryRepository from '../../../../../persistence/repositories/query/agreement-list-query-repository';

export default class AgreementListQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const repository = new AgreementListQueryRepository();
    const list = await repository.all();

    return { successful: true, message: 'Convenios generados correctamente.', data: list, type: 'success' } as CommandResponse;
  }
}