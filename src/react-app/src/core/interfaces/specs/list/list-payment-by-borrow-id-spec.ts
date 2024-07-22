export default interface ListPaymentByBorrowIdSpec {
  id: number;
  date: string;
  year: number;
  month: number;
  number: number;
  paymentAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
  resolution: string;
  createdAt: string;
  appliedAt: string;
}