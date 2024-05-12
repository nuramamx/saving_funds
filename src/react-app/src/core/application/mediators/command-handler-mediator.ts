import CommandResponse from "../../abstractions/interfaces/command-response";
import { CommandHandlerFactory, CommandHandlerTypeMap } from "../factories/command-handler-factory";

export default class CommandHandlerMediator {
    execute<K extends keyof CommandHandlerTypeMap>(type: K, data: CommandHandlerTypeMap[K]): CommandResponse {
        const command = CommandHandlerFactory.createCommand(type);

        return command.execute(data);
    }
}