import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateBorrowCommand } from '../../../application/use_cases/commands/borrow/create/create-borrow-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function BorrowRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/borrow/create', async (request, reply) => {
    const data: CreateBorrowCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute('CreateBorrowCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default BorrowRoute;