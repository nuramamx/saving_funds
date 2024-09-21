import BorrowAnnualRateSpec from "../specs/saving-fund-annual-rate-spec";

export default interface BorrowAnnualRateUpdateCommand extends BorrowAnnualRateSpec {
  commandId?: number;
}