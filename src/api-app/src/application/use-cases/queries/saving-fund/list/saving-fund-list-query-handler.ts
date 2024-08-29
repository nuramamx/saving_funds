import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import SavingFundListQueryRepository from "../../../../../persistence/repositories/query/saving-fund-list-query-repository";

type SavingFundListQuery = {
  filter: string;
  page: number;
  pageSize: number;
};

class SavingFundListQueryHandler implements CommandHandler<SavingFundListQuery, CommandResponse> {
  async execute(data: SavingFundListQuery): Promise<CommandResponse> {
    try {
      const savingFundListQueryRepository = new SavingFundListQueryRepository();
      const result = await savingFundListQueryRepository.all(data);

      console.log(result);

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

export type { SavingFundListQuery };
export default SavingFundListQueryHandler;