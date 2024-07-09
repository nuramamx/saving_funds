import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import SearchAssociateSpec from '../../specs/search/search-associate-spec';
import QuerySearchRepositoryInfo from '../../interfaces/query-search-repository-info';

export default class SearchAssociateQueryRepository implements QuerySearchRepositoryInfo<SearchAssociateSpec> {
  async byIdOrName(id: number, name: string): Promise<SearchAssociateSpec[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.ASSOCIATE_SEARCH_BY_ID_OR_NAME,
        {
          replacements: { associate_id: id, name },
          type: QueryTypes.SELECT
        }
      ) as SearchAssociateSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}