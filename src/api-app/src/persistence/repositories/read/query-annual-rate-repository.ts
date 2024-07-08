import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import AnnualRateInfo from '../../../domain/interfaces/annual-rate-info';
import { QueryTypes } from 'sequelize';

export default class QueryAnnualRateRepository implements QueryRepositoryInfo<AnnualRateInfo> {
   all = async (): Promise<AnnualRateInfo[]> => {
    const result = await db.sequelize.query<AnnualRateInfo>(ViewName.ANNUAL_RATE_ALL, { type: QueryTypes.SELECT });

    return result;
  }
}