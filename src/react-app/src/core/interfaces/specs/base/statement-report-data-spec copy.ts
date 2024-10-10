export default interface StatementReportDataSpec {
  associateCode: string;
  associateName: string;
  frequentContribution: number;
  countFrequency: number;
  amountToWithhold: number;
  amountAvailableToWithdrawal: number;
  amountAvailableToWithdrawalRounded: number;
  netBalanceForCurrentYear: number;
  netBalance: number;
  dateRange: string;
  currentYear: number;
  isFortnightly: boolean;
}