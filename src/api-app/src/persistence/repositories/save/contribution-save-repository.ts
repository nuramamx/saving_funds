import { db } from '../../instance';
import { FunctionName } from '../../names/function-name';
import { QueryTypes } from 'sequelize';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseInfo from '../../interfaces/procedure-response-info';
import Contribution from '../../../domain/entities/contribution';
import ParseError from '../../util/check-error';

export default class ContributionSaveRepository implements SaveRepositoryInfo<Contribution, boolean> {
  async save(data: Contribution): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [result] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.CONTRIBUTION_CREATE, {
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
      throw ParseError(err);
    }
  }
}