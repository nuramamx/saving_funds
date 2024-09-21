import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import Batch from "../../../../../domain/entities/batch";
import BatchSaveRepository from "../../../../../persistence/repositories/save/batch-save-repository";

type BatchCreateCommand = {
  name: string;
  batchFunction: string;
  details: string;
};

export default class BatchCreateCommandHandler implements CommandHandler<BatchCreateCommand, CommandResponse> {
  async execute(data: BatchCreateCommand): Promise<CommandResponse> {
    const repository = new BatchSaveRepository()

    try {
      const entity = new Batch(
        data.name,
        data.batchFunction,
        data.details
      );

      const result = await repository.save(entity);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'El registro no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { BatchCreateCommand };