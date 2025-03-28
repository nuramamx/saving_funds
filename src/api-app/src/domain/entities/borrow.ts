import BorrowInfo from '../interfaces/borrow-info';
import BorrowDetail from './borrow-detail';

export default class Borrow implements BorrowInfo {
  private detail: BorrowDetail = undefined!;

  constructor(
    readonly associateId: number,
    readonly requestedAmount: number,
    readonly period: number,
    readonly annualRate: number,
    readonly isFortnightly: boolean,
    readonly isSettled: boolean,
    readonly startAt: Date) {}

  updateDetail(detail: BorrowDetail): Borrow {
    this.detail = detail;

    return this;
  }

  getDetail(): BorrowDetail {
    return this.detail;
  }
}