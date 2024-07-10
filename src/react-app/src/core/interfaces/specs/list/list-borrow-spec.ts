export default interface ListBorrowSpec {
  id: number;
  associateId: number;
  associateName: string;
  requestedAmount: number;
  totalDue: number;
  totalPaid: number;
  period: number;
  isFortnightly: boolean;
}