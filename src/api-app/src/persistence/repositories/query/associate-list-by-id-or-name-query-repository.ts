import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import QuerySearchRepositoryInfo from '../../interfaces/query-search-repository-info';
import AssociateListByIdOrNameQuery from '../../specs/list/associate-list-by-id-or-name-spec';

export default class AssociateListByIdOrNameQueryRepository implements QuerySearchRepositoryInfo<AssociateListByIdOrNameQuery> {
  async byIdOrName(id: number, name: string): Promise<AssociateListByIdOrNameQuery[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.ASSOCIATE_SEARCH_BY_ID_OR_NAME, {
          replacements: {
            p_associate_id: id,
            p_name: name 
          },
          type: QueryTypes.SELECT
        }
      ) as AssociateListByIdOrNameQuery[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}