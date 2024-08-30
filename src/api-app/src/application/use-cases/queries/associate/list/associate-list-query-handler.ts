import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AssociateListQueryRepository from '../../../../../persistence/repositories/query/associate-list-query-repository';

export default class AssociateListQueryHandler implements CommandHandler<void, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const repository = new AssociateListQueryRepository();
      const result = await repository.all();

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