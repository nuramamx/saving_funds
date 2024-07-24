import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import QueryRepositoryInfo from '../../interfaces/query-repository-info';
import ListBorrowDebtorSpec from '../../specs/list/list-borrow-debtor-spec';

export default class ListBorrowDebtorQueryRepository implements QueryRepositoryInfo<void, ListBorrowDebtorSpec> {
  async all(): Promise<ListBorrowDebtorSpec[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.BORROW_DEBTOR_LIST, {
          type: QueryTypes.SELECT
        }
      ) ;

      console.log(`Debtor: ${JSON.stringify(result)}`);
      
      return result as any;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}