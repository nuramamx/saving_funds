export default interface BorrowDetailInfo {
  borrowId: number;
  numberPayments: number;
  interests: number;
  totalDue: number;
  guaranteeFund: number;
  payment: number;
  amountDelivered: number;
}