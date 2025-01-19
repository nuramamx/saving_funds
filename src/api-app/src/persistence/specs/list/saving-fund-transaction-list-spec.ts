export default interface SavingFundTransactionListSpec {
  id: number;
  year: number;
  transactionDate: string;
  transactionType: string;
  amount: number;
  runningBalance: number;
  net_balance: number;
  partialYields: number;
}