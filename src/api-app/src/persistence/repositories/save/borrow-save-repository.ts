import { db } from '../../instance';
import { FunctionName } from '../../names/function-name';
import { QueryTypes } from 'sequelize';
import Borrow from '../../../domain/entities/borrow';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseInfo from '../../interfaces/procedure-response-info';
import ParseError from '../../util/check-error';

export default class BorrowSaveRepository implements SaveRepositoryInfo<Borrow, boolean> {
  async save(data: Borrow): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [borrowSaveResult] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.BORROW_CREATE, {
        replacements: {
          p_associate_id: data.associateId,
          p_requested_amount: data.requestedAmount.toFixed(6),
          p_period: data.period,
          p_is_fortnightly: data.isFortnightly,
          p_start_at: data.startAt
        },
        type: QueryTypes.SELECT
      });
      
      if (!borrowSaveResult.success)
        throw new Error(borrowSaveResult.message);

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();
      throw ParseError(err);
    }
  }
}