export default interface SavingFundListSpec {
  id: number;
  associateName: string;
  agreementName: string;
  annualRate: number;
  salary: number;
  openingBalance: number;
  balance: number;
  yields: number;
  total: number;
  contributions: number;
  withdrawals: number;
  isFortnightly: boolean;
  hasActiveBorrow: boolean
}