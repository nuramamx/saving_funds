export default interface BorrowHistoryListSpec {
  id: number;
  fileNumber: string;
  requestedAmount: number;
  totalDue: number;
  totalPaid: number;
  numberPayments: number;
  paymentsMade: number;
  period: number;
  isFortnightly: boolean;
  resolution: string;
  startAt: string;
  createdAt: string;
}