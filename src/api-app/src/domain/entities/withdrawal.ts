import WithdrawalInfo from "../interfaces/withdrawal-info";

export default class Withdrawal implements WithdrawalInfo {
  constructor(
    readonly savingFundId: number,
    readonly amount: number,
    readonly isYields: boolean,
    readonly appliedAt: Date
  ) {}
}