import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import Withdrawal from "../../../domain/entities/withdrawal";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import ParseError from "../../util/check-error";

export default class WithdrawalSaveRepository  implements SaveRepositoryInfo<Withdrawal, boolean> {
  async save(data: Withdrawal): Promise<boolean> {
    const transaction = await db.sequelize.transaction();
    
    try {
      const [result] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.WITHDRAWAL_CREATE, {
        replacements: {
          p_saving_fund_id: data.savingFundId,
          p_amount: data.amount,
          p_applied_at: data.appliedAt,
          p_is_yields: data.isYields
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