import { db } from '../../instance';
import { ViewName } from '../../names/view-name';
import ListAssociateSpec from '../../specs/list/list-associate-spec';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import { QueryTypes } from 'sequelize';

export default class ListAssociateQueryRepository implements QueryRepositoryInfo<ListAssociateSpec> {
  async all(): Promise<ListAssociateSpec[]> {
    try {
      const result = await db.sequelize.query(ViewName.ASSOCIATE_LIST, { type: QueryTypes.SELECT }) as ListAssociateSpec[];
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}