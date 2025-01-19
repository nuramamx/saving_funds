export default interface SavingFundTransactionListSpec {
  id: number;
  year: number;
  transactionDate: string;
  transactionType: string;
  amount: number;
  runningBalance: number;
  netBalance: number;
  partialYields: number;
}