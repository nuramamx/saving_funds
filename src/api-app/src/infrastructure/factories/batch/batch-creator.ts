import AssociateBatchReader from "./reader/associate/associate-batch-reader";
import ContributionBatchReader from "./reader/contribution/contribution-batch-reader";
import PaymentBatchReader from "./reader/payment/payment-batch-reader";
import WithdrawalBatchReader from "./reader/withdrawal/withdrawal-batch-reader";

export default class BatchCreator {
  getBatchProcess(process: string) {
    switch (process) {
      case 'APORTACIONES':
        return new ContributionBatchReader();
      case 'RETIROS':
        return new WithdrawalBatchReader();
      case 'PAGOS':
        return new PaymentBatchReader();
      case 'SOCIOS':
        return new AssociateBatchReader();
      default:
        throw new Error('Proceso no localizado.');
    }
  }
}