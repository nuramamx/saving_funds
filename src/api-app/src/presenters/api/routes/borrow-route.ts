import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { BorrowCreateCommand } from '../../../application/use-cases/commands/borrow/create/borrow-create-command-handler';
import { BorrowListQuery } from '../../../application/use-cases/queries/borrow/list/borrow-list-query-handler';
import { BorrowAnnualRateUpdateCommand } from '../../../application/use-cases/commands/borrow/rate/update/borrow-annual-rate-update-command-handler';
import { BorrowDebtorListQuery } from '../../../application/use-cases/queries/borrow/list-debtor/borrow-debtor-list-query-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function BorrowRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/borrow/rates', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowAnnualRateListQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/list/debtor', async (request, reply) => {
    const data = JSON.parse(request.body) as BorrowDebtorListQuery;
    
    if (data.page) data.offset = ((data.page - 1) * 20);

    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowDebtorListQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/borrow/list', async (request, reply) => {
    const data: BorrowListQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowListQuery', data);

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

  fastify.put<{ Body: string }>('/borrow/rates', async (request, reply) => {
    const data = JSON.parse(request.body) as BorrowAnnualRateUpdateCommand;
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowAnnualRateUpdateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default BorrowRoute;