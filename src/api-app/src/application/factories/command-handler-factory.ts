import CommandHandler from '../../abstractions/interfaces/command-handler';
import CommandResponse from '../../abstractions/interfaces/command-response';
import AssociateCreateCommandHandler, { AssociateCreateCommand } from '../use-cases/commands/associate/create/associate-create-command-handler';
import BorrowCreateCommandHandler, { BorrowCreateCommand } from '../use-cases/commands/borrow/create/borrow-create-command-handler';
import ContributionCreateCommandHandler, { ContributionCreateCommand } from '../use-cases/commands/contribution/create/contribution-create-command-handler';
import PaymentCreateCommandHandler, { PaymentCreateCommand } from '../use-cases/commands/payment/create/payment-create-command-handler';
import WithdrawalCreateCommandHandler, { WithdrawalCreateCommand } from '../use-cases/commands/withdrawal/create/withdrawal-create-command-handler';
import AgreementListQueryHandler from '../use-cases/queries/agreement/list/agreement-list-query-handler';
import AnnualRateListQueryHandler from '../use-cases/queries/annual-rate/list/annual-rate-list-query-handler';
import AssociateListByIdOrNameQueryHandler, { AssociateListByIdOrNameQuery } from '../use-cases/queries/associate/by-id-or-name/associate-list-by-id-or-name-query-handler';
import AssociateListQueryHandler from '../use-cases/queries/associate/list/associate-list-query-handler';
import BatchCreateCommandHandler, { BatchCreateCommand } from '../use-cases/queries/batch/create/batch-create-command-handler';
import BatchListQueryHandler, { BatchListQuery } from '../use-cases/queries/batch/list/batch-list-query-handler';
import BorrowDebtorListQueryHandler from '../use-cases/queries/borrow/list-debtor/borrow-debtor-list-query-handler';
import BorrowHistoryListQueryHandler, { BorrowHistoryListQuery } from '../use-cases/queries/borrow/list-history/borrow-history-list-query-handler';
import BorrowListQueryHandler from '../use-cases/queries/borrow/list/borrow-list-query-handler';
import CityListQueryHandler from '../use-cases/queries/city/list/city-list-query-handler';
import PaymentListByBorrowIdQueryHandler, { PaymentListByBorrowIdQuery } from '../use-cases/queries/payment/list-by-borrow-id/payment-list-by-borrow-id-query-handler';
import SavingFundListQueryHandler, { SavingFundListQuery } from '../use-cases/queries/saving-fund/list/saving-fund-list-query-handler';
import SavingFundTransactionListQueryHandler, { SavingFundTransactionListQuery } from '../use-cases/queries/saving-fund/transaction/list/saving-fund-transaction-list-query-handler';
import StateListQueryHandler from '../use-cases/queries/state/list/state-list-query-handler';

type CommandHandlerTypeMap = {
  // Commands
  'AssociateCreateCommand': AssociateCreateCommand,
  'BorrowCreateCommand': BorrowCreateCommand,
  'PaymentCreateCommand': PaymentCreateCommand,
  'ContributionCreateCommand': ContributionCreateCommand,
  'WithdrawalCreateCommand': WithdrawalCreateCommand,
  'BatchCreateCommand': BatchCreateCommand,
  // Queries
  'CityListQuery': void,
  'StateListQuery': void,
  'AgreementListQuery': void,
  'AnnualRateListQuery': void,
  'AssociateListByIdOrNameQuery': AssociateListByIdOrNameQuery,
  'AssociateListQuery': void,
  'BorrowListQuery': void,
  'BorrowHistoryListQuery': BorrowHistoryListQuery,
  'PaymentListByBorrowIdQuery': PaymentListByBorrowIdQuery,
  'BorrowDebtorListQuery': void,
  'SavingFundListQuery': SavingFundListQuery,
  'SavingFundTransactionListQuery': SavingFundTransactionListQuery,
  'BatchListQuery': BatchListQuery
};

const commandConstructors: {
  [K in keyof CommandHandlerTypeMap]?: new () => CommandHandler<CommandHandlerTypeMap[K], CommandResponse>
} = {
  // Commands
  'AssociateCreateCommand': AssociateCreateCommandHandler,
  'BorrowCreateCommand': BorrowCreateCommandHandler,
  'PaymentCreateCommand': PaymentCreateCommandHandler,
  'ContributionCreateCommand': ContributionCreateCommandHandler,
  'WithdrawalCreateCommand': WithdrawalCreateCommandHandler,
  'BatchCreateCommand': BatchCreateCommandHandler,
  // Queries
  'CityListQuery': CityListQueryHandler,
  'StateListQuery': StateListQueryHandler,
  'AgreementListQuery': AgreementListQueryHandler,
  'AnnualRateListQuery': AnnualRateListQueryHandler,
  'AssociateListByIdOrNameQuery': AssociateListByIdOrNameQueryHandler,
  'AssociateListQuery': AssociateListQueryHandler,
  'BorrowListQuery': BorrowListQueryHandler,
  'BorrowHistoryListQuery': BorrowHistoryListQueryHandler,
  'PaymentListByBorrowIdQuery': PaymentListByBorrowIdQueryHandler,
  'BorrowDebtorListQuery': BorrowDebtorListQueryHandler,
  'SavingFundListQuery': SavingFundListQueryHandler,
  'SavingFundTransactionListQuery': SavingFundTransactionListQueryHandler,
  'BatchListQuery': BatchListQueryHandler
};

class CommandHandlerFactory {
  static createCommand<K extends keyof CommandHandlerTypeMap>(type: K): CommandHandler<CommandHandlerTypeMap[K], CommandResponse> {
    const Command = commandConstructors[type];

    if (!Command) throw new Error('Comando no soportado.');

    return new Command() as CommandHandler<CommandHandlerTypeMap[K], CommandResponse>;
  }
}

export { CommandHandlerFactory };
export type { CommandHandlerTypeMap };