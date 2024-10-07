export default interface BorrowDebtorListSpec {
  id: number;
  fileNumber: string;
  associate_id: number;
  associate_name: string;
  requested_amount: number;
  total_due: number;
  total_paid: number;
  number_payments: number;
  payments_made: number;
  is_fortnightly: boolean;
  start_at: string;
  created_at: string;
}