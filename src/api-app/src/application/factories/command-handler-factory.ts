import CommandHandler from "../../abstractions/interfaces/command-handler";
import CommandResponse from "../../abstractions/interfaces/command-response";
import { CreateAssociateCommand, CreateAssociateCommandHandler } from "../use_cases/commands/associate/create/create-associate-command-handler"
import AllCityQueryHandler from "../use_cases/queries/city/all/all-city-query-handler";

type CommandHandlerTypeMap = {
    "CreateAssociateCommand": CreateAssociateCommand,
    "AllCityQuery": void
};

const commandConstructors: {
    [K in keyof CommandHandlerTypeMap]?: new () => CommandHandler<CommandHandlerTypeMap[K], CommandResponse>
} = {
    "CreateAssociateCommand": CreateAssociateCommandHandler,
    "AllCityQuery": AllCityQueryHandler
};

class CommandHandlerFactory {
    static createCommand<K extends keyof CommandHandlerTypeMap>(type: K): CommandHandler<CommandHandlerTypeMap[K], CommandResponse> {
        const CommandConstructors = commandConstructors[type];

        if (!CommandConstructors) {
            throw new Error("Comando no soportado.");
        }

        return new CommandConstructors() as CommandHandler<CommandHandlerTypeMap[K], CommandResponse>;
    }
}

export { CommandHandlerFactory };
export type { CommandHandlerTypeMap };