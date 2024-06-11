import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import Associate from "../../../domain/entities/associate";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";

export default class QueryAssociateRepository implements QueryRepositoryInfo<Associate> {
  byName = async (data: string): Promise<any> => {
    const result = await db.sequelize.query<Object>(
      "CALL search_associate_by_name (:fullname)",
      {
        replacements: { fullname: data },
        type: QueryTypes.SELECT
      });

      return result;
  }
}