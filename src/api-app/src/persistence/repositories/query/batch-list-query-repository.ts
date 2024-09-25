import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { BatchListQuery } from "../../../application/use-cases/queries/batch/list/batch-list-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import BatchListSpec from "../../specs/list/batch-list-spec";

export default class BatchListQueryRepository implements QueryRepositoryInfo<BatchListQuery, BatchListSpec> {
  async all(data?: BatchListQuery): Promise<BatchListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.BATCH_LIST, {
          type: QueryTypes.SELECT
        }
      ) as BatchListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}