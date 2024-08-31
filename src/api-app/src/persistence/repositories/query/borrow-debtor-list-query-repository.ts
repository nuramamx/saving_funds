import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import BorrowListSpec from '../../specs/list/borrow-list-spec';

export default class BorrowDebtorListQueryRepository implements QueryRepositoryInfo<void, BorrowListSpec> {
  async all(): Promise<BorrowListSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.BORROW_DEBTOR_LIST, {
          type: QueryTypes.SELECT
        }
      ) as BorrowListSpec[];
      
      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}