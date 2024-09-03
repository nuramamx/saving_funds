import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { AssociateCreateCommand } from '../../../application/use-cases/commands/associate/create/associate-create-command-handler';
import { AssociateListByIdOrNameQuery } from '../../../application/use-cases/queries/associate/by-id-or-name/associate-list-by-id-or-name-query-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function AssociateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/associate/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('AssociateListQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/create', async (request, reply) => {
    const data: AssociateCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();    
    const result = await command.execute('AssociateCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/search_by_id_or_name', async (request, reply) => {
    const data: AssociateListByIdOrNameQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();    
    const result = await command.execute('AssociateListByIdOrNameQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default AssociateRoute;