import { QueryTypes } from "sequelize";
import { SavingFundListQuery } from "../../../application/use-cases/queries/saving-fund/list/saving-fund-list-query-handler";
import { db } from "../../instance";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import { ProcedureName } from "../../names/procedure-name";
import SavingFundListSpec from "../../specs/list/saving-fund-list-spec";

export default class SavingFundListQueryRepository implements QueryRepositoryInfo<SavingFundListQuery, SavingFundListSpec> {
  async all(data: SavingFundListQuery): Promise<SavingFundListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.SAVING_FUND_LIST, {
          replacements: {
            p_filter: JSON.stringify({}),
            p_page: 0,
            p_page_size: 0
          },
          type: QueryTypes.SELECT
        }
      ) as SavingFundListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}