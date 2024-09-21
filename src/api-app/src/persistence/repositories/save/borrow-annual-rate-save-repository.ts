import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { QueryTypes } from "sequelize";
import { BorrowAnnualRateUpdateCommand } from "../../../application/use-cases/commands/borrow/rate/update/borrow-annual-rate-update-command-handler";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import ParseError from "../../util/check-error";

export default class BorrowAnnualRateSaveRepository implements SaveRepositoryInfo<BorrowAnnualRateUpdateCommand, boolean> {
  async save(data: BorrowAnnualRateUpdateCommand): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [result] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.BORROW_ANNUAL_RATE_UPDATE, {
        replacements: {
          p_id: data.id,
          p_rate: data.rate
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