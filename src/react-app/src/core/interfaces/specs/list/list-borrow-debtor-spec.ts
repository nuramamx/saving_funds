export default interface ListBorrowDebtorSpec {
  id: number;
  associateId: number;
  associateName: string;
  requestedAmount: number;
  totalDue: number;
  totalPaid: number;
  numberPayments: number;
  paymentsMade: number;
  isFortnightly: boolean;
  startAt: string;
  createdAt: string;
}