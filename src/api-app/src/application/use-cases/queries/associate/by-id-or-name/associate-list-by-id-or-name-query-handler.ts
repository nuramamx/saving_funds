import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AssociateListByIdOrNameQueryRepository from '../../../../../persistence/repositories/query/associate-list-by-id-or-name-query-repository';

interface AssociateListByIdOrNameQuery {
  associate_id?: number;
  name?: string;
}

class AssociateListByIdOrNameQueryHandler implements CommandHandler<AssociateListByIdOrNameQuery, CommandResponse> {
  async execute(data: AssociateListByIdOrNameQuery): Promise<CommandResponse> {
    try {
      const repository = new AssociateListByIdOrNameQueryRepository();
      const result = await repository.byIdOrName(data.associate_id ?? 0, data.name ?? '');

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Socio no pudo ser localizado. Ocurrió falla al buscar en la base de datos.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { AssociateListByIdOrNameQuery };
export default AssociateListByIdOrNameQueryHandler;