export default interface BorrowQuoteReportDataSpec {
  currentYear: number;
  associateName: string;
  period: string;
  isFortnightly: boolean;
  requestedAmount: number;
  totalWithInterests: number;
  guaranteeFund: number;
  totalDue: number;
  payment: number;
  startAt: string;
  numberPayments: number;
}