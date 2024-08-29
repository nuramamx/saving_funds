export default interface SavingFundTransactionListSpec {
  year: number;
  transactionDate: string;
  transactionType: string;
  amount: number;
  runningBalance: number;
  partialInterest: number;
}