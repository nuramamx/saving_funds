import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ViewName } from '../../names/view-name';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import ListBorrowSpec from '../../specs/list/list-borrow-spec';

export default class ListBorrowQueryRepository implements QueryRepositoryInfo<ListBorrowSpec> {
  async all(): Promise<ListBorrowSpec[]> {
    try {
      const result = await db.sequelize.query(ViewName.BORROW_LIST, { type: QueryTypes.SELECT }) as ListBorrowSpec[];
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}