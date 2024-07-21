import CreateAssociateCommandHandler, { CreateAssociateCommand } from '../use-cases/commands/associate/create/create-associate-command-handler'
import ByIdOrNameAssociateQueryHandler, { ByIdOrNameAssociateQuery } from '../use-cases/queries/associate/by-id-or-name/by-id-or-name-associate-query-handler';
import CommandHandler from '../../abstractions/interfaces/command-handler';
import CommandResponse from '../../abstractions/interfaces/command-response';
import AllCityQueryHandler from '../use-cases/queries/city/all/all-city-query-handler';
import AllStateQueryHandler from '../use-cases/queries/state/all/all-state-query-handler';
import AllAgreementQueryHandler from '../use-cases/queries/agreement/all/all-agreement-query-handler';
import AllAnnualRateQueryHandler from '../use-cases/queries/annual-rate/all/all-annual-rate-query-handler';
import CreateBorrowCommandHandler, { CreateBorrowCommand } from '../use-cases/commands/borrow/create/create-borrow-command-handler';
import ListAssociateQueryHandler from '../use-cases/queries/associate/list/list-associate-query-handler';
import ListBorrowQueryHandler from '../use-cases/queries/borrow/list/list-borrow-query-handler';
import ListBorrowHistoryQueryHandler, { ListBorrowHistoryQuery } from '../use-cases/queries/borrow/list-history/list-borrow-history-query-handler';
import ListPaymentByBorrowIdQueryHandler, { ListPaymentByBorrowIdQuery } from '../use-cases/queries/payment/list-by-borrow-id/list-payment-by-borrow-id-query-handler';

type CommandHandlerTypeMap = {
  'CreateAssociateCommand': CreateAssociateCommand,
  'CreateBorrowCommand': CreateBorrowCommand,
  'AllCityQuery': void,
  'AllStateQuery': void,
  'AllAgreementQuery': void,
  'AllAnnualRateQuery': void,
  'ByIdOrNameAssociateQuery': ByIdOrNameAssociateQuery,
  'ListAssociateQuery': void,
  'ListBorrowQuery': void,
  'ListBorrowHistoryQuery': ListBorrowHistoryQuery,
  'ListPaymentByBorrowIdQuery': ListPaymentByBorrowIdQuery
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
  'ByIdOrNameAssociateQuery': ByIdOrNameAssociateQueryHandler,
  'ListAssociateQuery': ListAssociateQueryHandler,
  'ListBorrowQuery': ListBorrowQueryHandler,
  'ListBorrowHistoryQuery': ListBorrowHistoryQueryHandler,
  'ListPaymentByBorrowIdQuery': ListPaymentByBorrowIdQueryHandler
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