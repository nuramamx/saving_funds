import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import QueryAssociateRepository from "../../../../../persistence/repositories/read/query-associate-repository";

interface ByIdOrNameAssociateQuery {
  associate_id?: number;
  name?: string;
}

class ByIdOrNameAssociateQueryHandler implements CommandHandler<ByIdOrNameAssociateQuery, CommandResponse> {
  execute = async (data: ByIdOrNameAssociateQuery): Promise<CommandResponse> => {
    try {
      const queryAssociateRepository = new QueryAssociateRepository();
      const result = await queryAssociateRepository.byIdOrName(data.associate_id ?? 0, data.name ?? '');

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: "Socio no pudo ser localizado. Ocurrió falla al buscar en la base de datos.",
        data: err.message,
        type: "danger"
      } as CommandResponse;
    }
  }
}

export type { ByIdOrNameAssociateQuery };
export default ByIdOrNameAssociateQueryHandler;