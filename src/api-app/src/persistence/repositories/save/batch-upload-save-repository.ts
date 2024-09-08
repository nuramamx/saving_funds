import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { BatchUploadCommand } from "../../../application/use-cases/queries/batch/upload/batch-upload-command-handler";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import BatchDetailSpec from "../../specs/batch-detail-spec";

export default class BatchUploadSaveRepository implements SaveRepositoryInfo<BatchUploadCommand, boolean> {
  async save(data: BatchUploadCommand): Promise<boolean> {
    const transaction = await db.sequelize.transaction();
    const details = data.info?.details as BatchDetailSpec[];

    try {
      data.reader?.rows.forEach(async (row, index) => {
        const [result] = await db.sequelize.query<ProcedureResponseInfo>(data.info!.batch_function, {
          replacements: {
            ...row
          },
          type: QueryTypes.SELECT
        });
        
        if (!result.success)
          data.messages?.push(`Error en línea ${index+1}: ${JSON.stringify(result)}`);
      });

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();

      //TODO: Improve this creating a util function
      if (err.parent !== null && err.parent !== undefined
        && err.parent.where !== null && err.parent.where !== undefined)
        throw new Error(`[E-201]: ${err.parent.where}`);
      else if (err.message !== null && err.message !== undefined)
        throw new Error(`[E-202]: ${err.message}`);
      else
        throw new Error(`[E-200]: `);
    }
  }
}