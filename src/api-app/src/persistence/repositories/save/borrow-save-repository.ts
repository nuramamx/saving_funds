import { db } from '../../instance';
import { ProcedureName } from '../../names/procedure-name';
import { QueryTypes } from 'sequelize';
import Borrow from '../../../domain/entities/borrow';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseInfo from '../../interfaces/procedure-response-info';

export default class BorrowSaveRepository implements SaveRepositoryInfo<Borrow, boolean> {
  async save(data: Borrow): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [borrowSaveResult] = await db.sequelize.query<ProcedureResponseInfo>(ProcedureName.BORROW_CREATE, {
        replacements: {
          associate_id: data.associateId,
          requested_amount: data.requestedAmount.toFixed(6),
          period: data.period,
          is_fortnightly: data.isFortnightly,
          start_at: data.startAt
        },
        type: QueryTypes.SELECT
      });
      
      if (!borrowSaveResult.success)
        throw new Error(borrowSaveResult.message);

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();

      //TODO: Improve this creating a util function
      if (err.parent !== null && err.parent !== undefined
        && err.parent.where !== null && err.parent.where !== undefined)
        throw new Error(`[E-201]: ${err.parent.where}`);
      else if (err.message !== null && err.message !== undefined)
        throw new Error(`[E-202]: ${err.message}`);
      else
        throw new Error(`[E-200]: ${err}`);
    }
  }
}