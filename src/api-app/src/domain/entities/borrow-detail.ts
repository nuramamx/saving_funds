import BorrowDetailInfo from "../interfaces/borrow-detail-info";

export default class BorrowDetail implements BorrowDetailInfo {
  constructor(
    readonly borrowId: number,
    readonly numberPayments: number,
    readonly interests: number,
    readonly totalDue: number,
    readonly guaranteeFund: number,
    readonly payment: number,
    readonly amountDelivered: number) {}
}