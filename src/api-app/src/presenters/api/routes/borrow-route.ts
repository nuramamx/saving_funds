import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateBorrowCommand } from '../../../application/use-cases/commands/borrow/create/create-borrow-command-handler';
import { ListBorrowHistoryQuery } from '../../../application/use-cases/queries/borrow/list-history/list-borrow-history-query-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function BorrowRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/borrow/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListBorrowQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.get('/borrow/list/debtor', async (request, reply) => {
    console.log(JSON.stringify(request.body));
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListBorrowDebtorQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/list/history', async (request, reply) => {
    const data: ListBorrowHistoryQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListBorrowHistoryQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/create', async (request, reply) => {
    const data: CreateBorrowCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('CreateBorrowCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default BorrowRoute;