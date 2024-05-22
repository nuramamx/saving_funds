import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import CreateAssociateCommand from "./create-associate-command";

class CreateAssociateCommandHandler implements CommandHandler<CreateAssociateCommand, CommandResponse> {
    execute(data: CreateAssociateCommand): CommandResponse {

        return { successful: true, message: "Associate created!" } as CommandResponse;
    }

}

export { CreateAssociateCommandHandler };
export type { CreateAssociateCommand };
