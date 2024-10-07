import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { error } from "console";
import { BatchUploadCommand } from "../../../application/use-cases/commands/batch/upload/batch-upload-command-handler";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import ParseError from "../../util/check-error";

export default class BatchUploadSaveRepository implements SaveRepositoryInfo<BatchUploadCommand, BatchUploadCommand> {
  async save(data: BatchUploadCommand): Promise<BatchUploadCommand> {
    const transaction = await db.sequelize.transaction();
    const messages: string[] = [];

    try {
      if (data.reader === null || data.reader === undefined) throw error('No existen filas que deban ser almacenadas.');

      for (const [index, row] of data.reader.rows.entries()) {
        const [result] = await db.sequelize.query<ProcedureResponseInfo>(data.info!.batch_function, {
          replacements: {
            ...row
          },
          type: QueryTypes.SELECT
        });
        
        if (!result.success)
          messages.push(`Error en línea ${index+2}: ${result.message}`);
      }

      data.messages = [...messages];

      await transaction.commit();

      return data;
    } catch (err: any) {
      await transaction.rollback();
      throw ParseError(err);
    }
  }
}