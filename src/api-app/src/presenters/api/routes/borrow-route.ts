import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateBorrowCommand } from '../../../application/use-cases/commands/borrow/create/create-borrow-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';
import { ListBorrowHistoryQuery } from '../../../application/use-cases/queries/borrow/list-history/list-borrow-history-query-handler';

async function BorrowRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/borrow/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListBorrowQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/list/history', async (request, reply) => {
    console.log(JSON.stringify(request.body));
    const data: ListBorrowHistoryQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListBorrowHistoryQuery', data);

    console.log(data);
    console.log(result);

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