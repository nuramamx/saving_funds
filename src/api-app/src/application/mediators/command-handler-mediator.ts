import CommandResponse from "../../abstractions/interfaces/command-response";
import { CommandHandlerFactory, CommandHandlerTypeMap } from "../factories/command-handler-factory";

export default class CommandHandlerMediator {
    execute = async<K extends keyof CommandHandlerTypeMap>(type: K, data?: CommandHandlerTypeMap[K]): Promise<CommandResponse> => {
        const command = CommandHandlerFactory.createCommand(type);

        return await command.execute(data);
    }
}