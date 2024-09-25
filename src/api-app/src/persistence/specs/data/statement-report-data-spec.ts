export default interface StatementReportDataSpec {
  current_year: number;
  associate_code: string;
  associate_name: string;
  is_fortnightly: boolean;
  count_frequency: number;
  date_range: string;
  frequent_contribution: number;
  amount_to_withhold: number;
  amount_available_to_withdrawal: number;
  amount_available_to_withdrawal_rounded: number;
  net_balance_for_current_year: number;
  net_balance: number;
}