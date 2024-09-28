import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { AssociateDataByIdQuery } from "../../../application/use-cases/queries/associate/data/byId/associate-data-by-id-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import AssociateDataByIdSpec from "../../specs/data/associate-data-by-id-spec";

export default class AssociateDataByIdQueryRepository implements QueryRepositoryInfo<AssociateDataByIdQuery, AssociateDataByIdSpec> {
  async all(data: AssociateDataByIdQuery): Promise<AssociateDataByIdSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.ASSOCIATE_DATA_BY_ID, {
          replacements: {
            p_id: data.id
          },
          type: QueryTypes.SELECT
        }
      ) as AssociateDataByIdSpec[];

      console.log(JSON.stringify(result));

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}