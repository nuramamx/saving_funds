export default interface ListBorrowDebtorSpec {
  id: number;
  associateId: number;
  associateName: string;
  requestedAmount: number;
  totalDue: number;
  totalPaid: number;
  isFortnightly: boolean;
  createdAt: string;
  startAt: string;
  lastPaymentDate: string;
  latePayments: number;
}