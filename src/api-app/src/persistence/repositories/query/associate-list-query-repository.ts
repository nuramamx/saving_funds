import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import { QueryTypes } from 'sequelize';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import AssociateListSpec from '../../specs/list/associate-list-spec';

export default class AssociateListQueryRepository implements QueryRepositoryInfo<void, AssociateListSpec> {
  async all(): Promise<AssociateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.ASSOCIATE_LIST, {
          type: QueryTypes.SELECT
        }
      ) as AssociateListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}