export default interface SavingFundTransactionListSpec {
  year: number;
  transactionDate: string;
  transactionType: string;
  amount: number;
  rate: number;
  runningBalance: number;
  partialYields: number;
}