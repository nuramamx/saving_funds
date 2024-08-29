import { db } from '../../instance';
import { ProcedureName } from '../../names/procedure-name';
import { QueryTypes } from 'sequelize';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseInfo from '../../interfaces/procedure-response-info';
import Contribution from '../../../domain/entities/contribution';

export default class ContributionSaveRepository implements SaveRepositoryInfo<Contribution, boolean> {
  async save(data: Contribution): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [result] = await db.sequelize.query<ProcedureResponseInfo>(ProcedureName.CONTRIBUTION_CREATE, {
        replacements: {
          p_saving_fund_id: data.savingFundId,
          p_applied_at: data.appliedAt,
          p_amount: data.amount.toFixed(6)
        },
        type: QueryTypes.SELECT
      });
      
      if (!result.success)
        throw new Error(result.message);

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