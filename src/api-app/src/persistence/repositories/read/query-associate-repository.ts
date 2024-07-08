import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import SearchAssociateInfo from '../../../domain/interfaces/procedures/search-associate-info';

export default class QueryAssociateRepository {
  byIdOrName = async (associate_id: number, name: string): Promise<SearchAssociateInfo[]> => {
    try {
      const result = await db.sequelize.query<SearchAssociateInfo>(
        ProcedureName.ASSOCIATE_SEARCH_BY_ID_OR_NAME,
        {
          replacements: { associate_id, name },
          type: QueryTypes.SELECT
        }
      );

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}