export default interface ListBorrowSpec {
  id: number;
  associate_id: number;
  associate_name: string;
  requested_amount: number;
  total_due: number;
  total_paid: number;
  period: number;
  is_fortnightly: boolean;
}