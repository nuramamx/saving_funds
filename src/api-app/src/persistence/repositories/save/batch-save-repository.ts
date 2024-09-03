import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { QueryTypes } from "sequelize";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import Batch from "../../../domain/entities/batch";

export default class BatchSaveRepository implements SaveRepositoryInfo<Batch, boolean> {
  async save(data: Batch): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [result] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.BATCH_CREATE, {
        replacements: {
          p_name: data.name,
          p_batch_function: data.batchFunction,
          p_details: data.details
        },
        type: QueryTypes.SELECT
      });
      
      if (!result.success)
        throw new Error(result.message);

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