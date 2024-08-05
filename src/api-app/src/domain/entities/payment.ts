import PaymentInfo from "../interfaces/payment-info";

export default class Payment implements PaymentInfo {
  constructor(
    readonly borrowId: number,
    readonly number: number,
    readonly paidAmount: number
  ) {}
}