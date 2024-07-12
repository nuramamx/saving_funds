import BorrowDetailInfo from "./borrow-detail-info";

export default interface BorrowInfo {
  id: number;
  associateId: number;
  requestedAmount: number;
  period: number;
  annualRate: number;
  isFortnightly: boolean;
  requestDate: Date;
  startAt: Date;
  detail: BorrowDetailInfo;
}