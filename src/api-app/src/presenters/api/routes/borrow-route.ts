import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { BorrowCreateCommand } from '../../../application/use-cases/commands/borrow/create/borrow-create-command-handler';
import { BorrowHistoryListQuery } from '../../../application/use-cases/queries/borrow/list-history/borrow-history-list-query-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function BorrowRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/borrow/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowListQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.get('/borrow/list/debtor', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowDebtorListQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/list/history', async (request, reply) => {
    const data: BorrowHistoryListQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowHistoryListQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/create', async (request, reply) => {
    const data: BorrowCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default BorrowRoute;