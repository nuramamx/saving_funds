export default interface WithdrawalSpec {
  fileNumber: string;
  name: string;
  amount: number;
  period: number;
  startAt: string;
  annualRate: number;
  isFortnightly: string;
  isSettled: string;
}