import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import BatchCreator from "../../../../../infrastructure/factories/batch/batch-creator";
import BatchReaderResult from "../../../../../infrastructure/factories/batch/batch-reader-result";
import BatchListQueryRepository from "../../../../../persistence/repositories/query/batch-list-query-repository";
import BatchUploadSaveRepository from "../../../../../persistence/repositories/save/batch-upload-save-repository";
import BatchListSpec from "../../../../../persistence/specs/list/batch-list-spec";

type BatchUploadCommand = {
  process: string;
  filename: string;
  file: Buffer;
  disableRules: boolean;
  validationOnly: boolean;
  reader?: BatchReaderResult;
  messages?: string[];
  info?: BatchListSpec;
};

export default class BatchUploadCommandHandler implements CommandHandler<BatchUploadCommand, CommandResponse> {
  async execute(data: BatchUploadCommand): Promise<CommandResponse> {
    const repository = new BatchUploadSaveRepository();
    const repositoryList = new BatchListQueryRepository();

    try {
      const processList = await repositoryList.all();
      const batchProcess = new BatchCreator().getBatchProcess(data.process);
      data.reader = await batchProcess.execute(data.file);

      if (data.reader.rows.length === 0) {
        if (data.reader.messages !== null && data.reader.messages !== undefined && data.reader.messages.length > 0)
          return { successful: true, message: 'Ocurrió error en la carga.', data: data.reader.messages, type: 'danger' } as CommandResponse;
      }

      data.info = processList.find(x => x.name === data.process);
      const result = await repository.save(data);

      return { successful: true, message: 'Carga fue realizada con éxito.', data: result.messages, type: (result.messages?.length! > 0) ? 'warning' : 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Carga no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { BatchUploadCommand };