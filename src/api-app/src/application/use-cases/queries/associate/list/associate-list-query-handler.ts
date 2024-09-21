import { Paginator } from '../../../../types/paginator-type';
import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import GetTotalRows from '../../../../../infrastructure/util/get-total-rows';
import AssociateListQueryRepository from '../../../../../persistence/repositories/query/associate-list-query-repository';

type AssociateListQuery = Paginator & { };

export default class AssociateListQueryHandler implements CommandHandler<AssociateListQuery, CommandResponse> {
  async execute(data: AssociateListQuery): Promise<CommandResponse> {
    try {
      const repository = new AssociateListQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, totalRows: GetTotalRows(result), type: 'success' } as CommandResponse;
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

export type { AssociateListQuery };