import CreateAssociateCommandHandler, { CreateAssociateCommand } from '../use_cases/commands/associate/create/create-associate-command-handler'
import ByIdOrNameAssociateQueryHandler, { ByIdOrNameAssociateQuery } from '../use_cases/queries/associate/by-id-or-name/by-id-or-name-associate-query-handler';
import CommandHandler from '../../abstractions/interfaces/command-handler';
import CommandResponse from '../../abstractions/interfaces/command-response';
import AllCityQueryHandler from '../use_cases/queries/city/all/all-city-query-handler';
import AllStateQueryHandler from '../use_cases/queries/state/all/all-state-query-handler';
import AllAgreementQueryHandler from '../use_cases/queries/agreement/all/all-agreement-query-handler';
import AllAnnualRateQueryHandler from '../use_cases/queries/annual-rate/all/all-annual-rate-query-handler';
import CreateBorrowCommandHandler, { CreateBorrowCommand } from '../use_cases/commands/borrow/create/create-borrow-command-handler';

type CommandHandlerTypeMap = {
  'CreateAssociateCommand': CreateAssociateCommand,
  'CreateBorrowCommand': CreateBorrowCommand,
  'AllCityQuery': void,
  'AllStateQuery': void,
  'AllAgreementQuery': void,
  'AllAnnualRateQuery': void,
  'ByIdOrNameAssociateQuery': ByIdOrNameAssociateQuery
};

const commandConstructors: {
  [K in keyof CommandHandlerTypeMap]?: new () => CommandHandler<CommandHandlerTypeMap[K], CommandResponse>
} = {
  'CreateAssociateCommand': CreateAssociateCommandHandler,
  'CreateBorrowCommand': CreateBorrowCommandHandler,
  'AllCityQuery': AllCityQueryHandler,
  'AllStateQuery': AllStateQueryHandler,
  'AllAgreementQuery': AllAgreementQueryHandler,
  'AllAnnualRateQuery': AllAnnualRateQueryHandler,
  'ByIdOrNameAssociateQuery': ByIdOrNameAssociateQueryHandler
};

class CommandHandlerFactory {
  static createCommand<K extends keyof CommandHandlerTypeMap>(type: K): CommandHandler<CommandHandlerTypeMap[K], CommandResponse> {
    const CommandConstructors = commandConstructors[type];

    if (!CommandConstructors) throw new Error('Comando no soportado.');

    return new CommandConstructors() as CommandHandler<CommandHandlerTypeMap[K], CommandResponse>;
  }
}

export { CommandHandlerFactory };
export type { CommandHandlerTypeMap };