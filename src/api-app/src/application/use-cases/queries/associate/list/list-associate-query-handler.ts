import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import ListAssociateQueryRepository from '../../../../../persistence/repositories/query/list-associate-query-repository';

export default class ListAssociateQueryHandler implements CommandHandler<void, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const listAssociateRepository = new ListAssociateQueryRepository();
      const result = await listAssociateRepository.all();

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Socios no localizados.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}