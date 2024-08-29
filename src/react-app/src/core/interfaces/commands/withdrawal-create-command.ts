import WithdrawalInfo from "../info/withdrawal-info";

export default interface WithdrawalCreateCommand extends WithdrawalInfo {
  commandId?: string;
}