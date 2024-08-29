export default interface SavingFundListSpec {
  id: number;
  associateName: string;
  agreementName: string;
  annualRate: number;
  salary: number;
  openingBalance: number;
  balance: number;
  accruedInterest: number;
  total: number;
  contributions: number;
  withdrawals: number;
  isFortnightly: boolean;
}