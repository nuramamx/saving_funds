import ContributionInfo from "../interfaces/contribution-info";

export default class Contribution implements ContributionInfo {
  constructor(
    readonly savingFundId: number,
    readonly appliedAt: Date,
    readonly amount: number
  ) {}
}