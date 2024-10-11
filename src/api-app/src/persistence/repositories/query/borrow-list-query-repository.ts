import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import { BorrowListQuery } from '../../../application/use-cases/queries/borrow/list/borrow-list-query-handler';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import BorrowListSpec from '../../specs/list/borrow-list-spec';

export default class BorrowListQueryRepository implements QueryRepositoryInfo<BorrowListQuery, BorrowListSpec> {
  async all(data: BorrowListQuery): Promise<BorrowListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.BORROW_LIST_BY_ASSOCIATE_ID, {
          replacements: {
            p_associate_id: data.associateId
          },
          type: QueryTypes.SELECT
        }
      ) as BorrowListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}