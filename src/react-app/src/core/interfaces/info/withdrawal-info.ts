export default interface WithdrawalInfo {
  savingFundId: number;
  amount: number;
  isYields: boolean;
  appliedAt: Date;
  isLeave: boolean;
  isDecease: boolean;
}