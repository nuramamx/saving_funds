import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { FunctionName } from "../../names/function-name";
import { PaymentListByBorrowIdQuery } from "../../../application/use-cases/queries/payment/list-by-borrow-id/payment-list-by-borrow-id-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import PaymentListByBorrowIdSpec from "../../specs/list/payment-list-by-borrow-id-spec";

export default class PaymentListByBorrowIdQueryRepository implements QueryRepositoryInfo<PaymentListByBorrowIdQuery, PaymentListByBorrowIdSpec> {
  async all(data: PaymentListByBorrowIdQuery): Promise<PaymentListByBorrowIdSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.PAYMENT_LIST_BY_BORROW_ID, {
          replacements: {
            p_borrow_id: data.borrowId
          },
          type: QueryTypes.SELECT
        }
      ) as PaymentListByBorrowIdSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}