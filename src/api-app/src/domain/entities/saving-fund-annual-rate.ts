import SavingFundAnnualRateInfo from "../interfaces/saving-fund-annual-rate-info";

export class SavingFundAnnualRate implements SavingFundAnnualRateInfo {
  constructor(
    readonly id: number = 0,
    readonly year: number,
    readonly rate: number) {}
}