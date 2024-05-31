import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import QueryAgreementRepository from "../../../../../persistence/repositories/read/query-agreement-repository";

class AllAgreementQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    const queryRepository = new QueryAgreementRepository();
    const list = await queryRepository.all();

    return { successful: true, message: "Convenios generados correctamente.", data: JSON.stringify(list), type: "success" } as CommandResponse;
  }
}

export default AllAgreementQueryHandler;