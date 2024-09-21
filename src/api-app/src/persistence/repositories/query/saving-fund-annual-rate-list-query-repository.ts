import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import { QueryTypes } from 'sequelize';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import SavingFundAnnualRateListSpec from '../../specs/list/saving-fund-annual-rate-list-spec';

export default class SavingFundAnnualRateListQueryRepository implements QueryRepositoryInfo<void, SavingFundAnnualRateListSpec> {
  async all(): Promise<SavingFundAnnualRateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.SAVING_FUND_ANNUAL_RATE_ALL, {
          type: QueryTypes.SELECT
        }
      ) as SavingFundAnnualRateListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}