export default interface BorrowAuthorizationReportDataSpec {
  current_year: number;
  associate_name: string;
  period: string;
  is_fortnightly: boolean;
  requested_amount: number;
  requested_amount_in_words: string;
  total_with_interests: number;
  guarantee_fund: number;
  total_due: number;
  payment: number;
  start_at: string;
  payment_in_words: string;
}