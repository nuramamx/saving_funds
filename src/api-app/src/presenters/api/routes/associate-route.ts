import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateAssociateCommand } from '../../../application/use_cases/commands/associate/create/create-associate-command-handler';
import { ByIdOrNameAssociateQuery } from '../../../application/use_cases/queries/associate/by-id-or-name/by-id-or-name-associate-query-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function AssociateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/associate/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListAssociateQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/create', async (request, reply) => {
    const data: CreateAssociateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute('CreateAssociateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/search_by_id_or_name', async (request, reply) => {
    const data: ByIdOrNameAssociateQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute('ByIdOrNameAssociateQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default AssociateRoute;