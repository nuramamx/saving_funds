import { CreateAssociateCommand, CreateAssociateCommandHandler } from "../use_cases/commands/associate/create/create-associate-command-handler"
import CommandHandler from "../../abstractions/interfaces/command-handler";
import CommandResponse from "../../abstractions/interfaces/command-response";
import AllCityQueryHandler from "../use_cases/queries/city/all/all-city-query-handler";
import AllStateQueryHandler from "../use_cases/queries/state/all/all-state-query-handler";
import AllAgreementQueryHandler from "../use_cases/queries/agreement/all/all-agreement-query-handler";
import ByNameAssociateQueryHandler, { ByNameAssociateQuery } from "../use_cases/queries/associate/by-name/by-name-associate-query-handler";

type CommandHandlerTypeMap = {
  "CreateAssociateCommand": CreateAssociateCommand,
  "AllCityQuery": void,
  "AllStateQuery": void,
  "AllAgreementQuery": void,
  "ByNameAssociateQuery": ByNameAssociateQuery
};

const commandConstructors: {
  [K in keyof CommandHandlerTypeMap]?: new () => CommandHandler<CommandHandlerTypeMap[K], CommandResponse>
} = {
  "CreateAssociateCommand": CreateAssociateCommandHandler,
  "AllCityQuery": AllCityQueryHandler,
  "AllStateQuery": AllStateQueryHandler,
  "AllAgreementQuery": AllAgreementQueryHandler,
  "ByNameAssociateQuery": ByNameAssociateQueryHandler
};

class CommandHandlerFactory {
  static createCommand<K extends keyof CommandHandlerTypeMap>(type: K): CommandHandler<CommandHandlerTypeMap[K], CommandResponse> {
    const CommandConstructors = commandConstructors[type];

    if (!CommandConstructors) throw new Error("Comando no soportado.");

    return new CommandConstructors() as CommandHandler<CommandHandlerTypeMap[K], CommandResponse>;
  }
}

export { CommandHandlerFactory };
export type { CommandHandlerTypeMap };