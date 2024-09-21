import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import Payment from "../../../domain/entities/payment";
import ParseError from "../../util/check-error";

export default class PaymentSaveRepository implements SaveRepositoryInfo<Payment, boolean> {
  async save(data: Payment): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [paymentSaveResult] = await db.sequelize.query<ProcedureResponseInfo>(FunctionName.PAYMENT_CREATE, {
        replacements: {
          p_borrow_id: data.borrowId,
          p_number: data.number,
          p_paid_amount: data.paidAmount
        },
        type: QueryTypes.SELECT
      });

      if (!paymentSaveResult.success)
        throw new Error(paymentSaveResult.message);

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();
      throw ParseError(err);
    }
  }
} 