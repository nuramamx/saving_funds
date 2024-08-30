import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import { BorrowHistoryListQuery } from '../../../application/use-cases/queries/borrow/list-history/borrow-history-list-query-handler';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import BorrowHistoryListSpec from '../../specs/list/borrow-history-list-spec';

export default class BorrowHistoryListQueryRepository implements QueryRepositoryInfo<BorrowHistoryListQuery, BorrowHistoryListSpec> {
  async all(data: BorrowHistoryListQuery): Promise<BorrowHistoryListSpec[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.BORROW_HISTORY_LIST_BY_ASSOCIATE_ID, {
          replacements: {
            p_associate_id: data.associateId
          },
          type: QueryTypes.SELECT
        }
      ) as BorrowHistoryListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}