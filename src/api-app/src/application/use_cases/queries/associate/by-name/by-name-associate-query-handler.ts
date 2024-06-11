import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";

interface ByNameAssociateQuery {
  name: string;
}

class ByNameAssociateQueryHandler implements CommandHandler<void, CommandResponse> {
  execute = async (): Promise<CommandResponse> => {
    return {} as CommandResponse;
  }
}

export type { ByNameAssociateQuery };
export default ByNameAssociateQueryHandler;