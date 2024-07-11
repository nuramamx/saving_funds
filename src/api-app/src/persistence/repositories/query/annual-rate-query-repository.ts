import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import AnnualRateSpec from '../../specs/annual-rate-spec';
import { QueryTypes } from 'sequelize';

export default class AnnualRateQueryRepository implements QueryRepositoryInfo<void, AnnualRateSpec> {
  async all(): Promise<AnnualRateSpec[]> {
    const result = await db.sequelize.query(ViewName.ANNUAL_RATE_ALL, { type: QueryTypes.SELECT }) as AnnualRateSpec[];
    return result;
  }
}