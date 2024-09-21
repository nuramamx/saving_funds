import { Paginator } from "../../../../types/paginator-type";
import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import SavingFundListQueryRepository from "../../../../../persistence/repositories/query/saving-fund-list-query-repository";
import GetTotalRows from "../../../../../infrastructure/util/get-total-rows";

type SavingFundListQuery = Paginator & {
  associateId: number;
};

export default class SavingFundListQueryHandler implements CommandHandler<SavingFundListQuery, CommandResponse> {
  async execute(data: SavingFundListQuery): Promise<CommandResponse> {
    try {
      const savingFundListQueryRepository = new SavingFundListQueryRepository();
      const result = await savingFundListQueryRepository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, totalRows: GetTotalRows(result), type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { SavingFundListQuery };