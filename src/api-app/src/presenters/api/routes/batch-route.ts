import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { BatchCreateCommand } from '../../../application/use-cases/queries/batch/create/batch-create-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

export default async function BatchRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/batch', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BatchListQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });

  fastify.post<{Body: string}>('/batch/create', async (request, reply) => {
    const data: BatchCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('BatchCreateCommand', data);

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}