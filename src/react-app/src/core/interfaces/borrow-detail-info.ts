export default interface BorrowDetailInfo {
  borrowId: number;
  numberPayments: number;
  interestToPay: number;
  guaranteeFund: number;
  payment: number;
  totalDue: number;
  amountDelivered: number;
}