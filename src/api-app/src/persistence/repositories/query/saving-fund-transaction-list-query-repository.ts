import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { SavingFundTransactionListQuery } from "../../../application/use-cases/queries/saving-fund/transaction/list/saving-fund-transaction-list-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import SavingFundTransactionListSpec from "../../specs/list/saving-fund-transaction-list-spec";

export default class SavingFundTransactionListQueryRepository implements QueryRepositoryInfo<SavingFundTransactionListQuery, SavingFundTransactionListSpec> {
  async all(data: SavingFundTransactionListQuery): Promise<SavingFundTransactionListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.SAVING_FUND_TRANSACTION_LIST, {
          replacements: {
            p_saving_fund_id: data.savingFundId,
            p_year: data.year ?? null
          },
          type: QueryTypes.SELECT
        }
      ) as SavingFundTransactionListSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}