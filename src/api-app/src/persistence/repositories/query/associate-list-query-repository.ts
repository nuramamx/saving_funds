import { db } from '../../instance';
import { FunctionName } from '../../names/function-name';
import { QueryTypes } from 'sequelize';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import AssociateListSpec from '../../specs/list/associate-list-spec';
import { AssociateListQuery } from '../../../application/use-cases/queries/associate/list/associate-list-query-handler';

export default class AssociateListQueryRepository implements QueryRepositoryInfo<AssociateListQuery, AssociateListSpec> {
  async all(data: AssociateListQuery): Promise<AssociateListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.ASSOCIATE_LIST, {
          replacements: {
            p_id: data.associateId,
            p_limit: 20,
            p_offset: data.offset
          },
          type: QueryTypes.SELECT
        }
      ) as AssociateListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}