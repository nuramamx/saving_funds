export default interface BorrowAuthorizationReportDataSpec {
  currentYear: number;
  associateName: string;
  period: string;
  isFortnightly: boolean;
  requestedAmount: number;
  requestedAmountInWords: string;
  totalWithInterests: number;
  guaranteeFund: number;
  totalDue: number;
  payment: number;
  startAt: string;
  paymentInWords: string;
}