export default interface BorrowDebtorListSpec {
  id: number;
  fileNumber: string;
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