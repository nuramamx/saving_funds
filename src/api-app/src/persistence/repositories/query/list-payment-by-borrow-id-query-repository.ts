import { db } from "../../instance";
import { QueryTypes } from "sequelize";
import { ProcedureName } from "../../names/procedure-name";
import { ListPaymentByBorrowIdQuery } from "../../../application/use-cases/queries/payment/list-by-borrow-id/list-payment-by-borrow-id-query-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import ListPaymentByBorrowIdSpec from "../../specs/list/list-payment-by-borrow-id-spec";

export default class ListPaymentByBorrowIdQueryRepository implements QueryRepositoryInfo<ListPaymentByBorrowIdQuery, ListPaymentByBorrowIdSpec> {
  async all(data: ListPaymentByBorrowIdQuery): Promise<ListPaymentByBorrowIdSpec[]> {
    try {
      const result = await db.sequelize.query(
        ProcedureName.PAYMENT_LIST_BY_BORROW_ID, {
          replacements: { borrow_id: data.borrowId },
          type: QueryTypes.SELECT
        }
      ) as ListPaymentByBorrowIdSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}