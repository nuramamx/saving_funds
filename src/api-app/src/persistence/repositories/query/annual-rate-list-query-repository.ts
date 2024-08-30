import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import { QueryTypes } from 'sequelize';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import AnnualRateListSpec from '../../specs/list/annual-rate-list-spec';

export default class AnnualRateListQueryRepository implements QueryRepositoryInfo<void, AnnualRateListSpec> {
  async all(): Promise<AnnualRateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.ANNUAL_RATE_ALL, {
          type: QueryTypes.SELECT
        }
      ) as AnnualRateListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}