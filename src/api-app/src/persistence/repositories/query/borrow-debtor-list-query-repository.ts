import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import { BorrowDebtorListQuery } from '../../../application/use-cases/queries/borrow/list-debtor/borrow-debtor-list-query-handler';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import BorrowListSpec from '../../specs/list/borrow-list-spec';

export default class BorrowDebtorListQueryRepository implements QueryRepositoryInfo<BorrowDebtorListQuery, BorrowListSpec> {
  async all(data: BorrowDebtorListQuery): Promise<BorrowListSpec[]> {
    console.log(`test => ${JSON.stringify(data)}`);
    try {
      const result = await db.sequelize.query(
        FunctionName.BORROW_DEBTOR_LIST, {
          replacements: {
            p_limit: 20,
            p_offset: data.offset
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