import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import { QueryTypes } from 'sequelize';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import BorrowAnnualRateListSpec from '../../specs/list/borrow-annual-rate-list-spec';

export default class BorrowAnnualRateListQueryRepository implements QueryRepositoryInfo<void, BorrowAnnualRateListSpec> {
  async all(): Promise<BorrowAnnualRateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.BORROW_ANNUAL_RATE_ALL, {
          type: QueryTypes.SELECT
        }
      ) as BorrowAnnualRateListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}