import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import BatchListQueryRepository from "../../../../../persistence/repositories/query/batch-list-query-repository";

type BatchListQuery = {
  filter: string;
  page: number;
  pageSize: number;
};

export default class BatchListQueryHandler implements CommandHandler<BatchListQuery, CommandResponse> {
  async execute(data: BatchListQuery): Promise<CommandResponse> {
    try {
      const repository = new BatchListQueryRepository();
      const result = await repository.all(data);

      return {
        successful: true,
        message: 'Busqueda exitosa.',
        data: result,
        type: 'success'
      } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Registros no localizados.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { BatchListQuery };