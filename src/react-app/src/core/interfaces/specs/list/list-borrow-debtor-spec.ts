export default interface ListBorrowDebtorSpec {
  id: number;
  associateId: number;
  associateName: string;
  requestedAmount: number;
  totalDue: number;
  totalPaid: number;
  isFortnightly: boolean;
  createdAt: string;
  lastPaymentDate: string;
  latePayments: number;
}