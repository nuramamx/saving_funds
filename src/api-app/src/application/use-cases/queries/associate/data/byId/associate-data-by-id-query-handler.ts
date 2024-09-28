import CommandHandler from "../../../../../../abstractions/interfaces/array-buffer-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import AssociateDataByIdQueryRepository from "../../../../../../persistence/repositories/query/associate-data-by-id-query-repository";

type AssociateDataByIdQuery = {
  id: number;
};

export default class AssociateDataByIdQueryHandler implements CommandHandler<AssociateDataByIdQuery, CommandResponse> {
  async execute(data: AssociateDataByIdQuery): Promise<CommandResponse> {
    try {
      const repository = new AssociateDataByIdQueryRepository();
      const result = await repository.all(data);

      if (result.length <= 0)
        throw new Error('Socio no pudo ser localizado.');
      
      return { successful: true, message: 'Busqueda exitosa.', data: result[0], type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { AssociateDataByIdQuery };