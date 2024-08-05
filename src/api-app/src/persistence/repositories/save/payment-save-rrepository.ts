import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { ProcedureName } from "../../names/procedure-name";
import ProcedureResponseInfo from "../../interfaces/procedure-response-info";
import SaveRepositoryInfo from "../../interfaces/save-repository-info";
import Payment from "../../../domain/entities/payment";

export default class PaymentSaveRepository implements SaveRepositoryInfo<Payment, boolean> {
  async save(data: Payment): Promise<boolean> {
    const transaction = await db.sequelize.transaction();

    try {
      const [paymentSaveResult] = await db.sequelize.query<ProcedureResponseInfo>(ProcedureName.PAYMENT_CREATE, {
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
      console.log(err);
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