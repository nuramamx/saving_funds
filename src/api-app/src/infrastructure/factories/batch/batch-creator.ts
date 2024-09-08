import ContributionBatchReader from "./reader/contribution/contribution-batch-reader";
import WithdrawalBatchReader from "./reader/withdrawal/withdrawal-batch-reader";

export default class BatchCreator {
  getBatchProcess(process: number) {
    switch (Number(process)) {
      case 1:
        return new ContributionBatchReader();
      case 2:
        return new WithdrawalBatchReader();
      default:
        throw new Error('Proceso no localizado.');
    }
  }
}