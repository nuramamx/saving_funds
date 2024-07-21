import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ViewName } from '../../names/view-name';
import { ListBorrowHistoryQuery } from '../../../application/use-cases/queries/borrow/list-history/list-borrow-history-query-handler';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import ListBorrowHistorySpec from '../../specs/list/list-borrow-history-spec';

export default class ListBorrowHistoryQueryRepository implements QueryRepositoryInfo<ListBorrowHistoryQuery, ListBorrowHistorySpec> {
  async all(data: ListBorrowHistoryQuery): Promise<ListBorrowHistorySpec[]> {
    try {
      const result = await db.sequelize.query(
        ViewName.BORROW_HISTORY_LIST_BY_ASSOCIATE_ID, {
          replacements: { p_associate_id: data.associateId },
          type: QueryTypes.SELECT
        }
      ) as ListBorrowHistorySpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}