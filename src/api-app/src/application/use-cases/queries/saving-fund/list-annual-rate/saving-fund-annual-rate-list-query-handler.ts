import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import SavingFundAnnualRateListQueryRepository from "../../../../../persistence/repositories/query/saving-fund-annual-rate-list-query-repository";

export default class SavingFundAnnualRateListQueryHandler implements CommandHandler<void, CommandResponse> {
  async execute(): Promise<CommandResponse> {
    try {
      const repository = new SavingFundAnnualRateListQueryRepository();
      const result = await repository.all();

      return { successful: true, message: 'Busqueda exitosa.', data: result, type: 'success' } as CommandResponse;;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}