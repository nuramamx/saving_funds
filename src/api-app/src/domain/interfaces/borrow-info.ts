export default interface BorrowInfo {
  associateId: number;
  requestedAmount: number;
  period: number;
  annualRate: number;
  isFortnightly: boolean;
  isSettled: boolean;
}