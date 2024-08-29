import CommandHandler from "../../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import SavingFundTransactionListQueryRepository from "../../../../../../persistence/repositories/query/saving-fund-transaction-list-query-repository";

type SavingFundTransactionListQuery = {
  savingFundId: number;
  year: number;
};

class SavingFundTransactionListQueryHandler implements CommandHandler<SavingFundTransactionListQuery, CommandResponse> {
  async execute(data: SavingFundTransactionListQuery): Promise<CommandResponse> {
    try {
      const savingFundTransactionListQueryRepository = new SavingFundTransactionListQueryRepository();
      const result = await savingFundTransactionListQueryRepository.all(data);

      return {
        successful: true,
        message: 'Busqueda exitosa.',
        data: result,
        type: 'success'
      } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Registros no localizados.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { SavingFundTransactionListQuery };
export default SavingFundTransactionListQueryHandler;