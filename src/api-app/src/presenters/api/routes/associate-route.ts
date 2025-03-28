import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { AssociateListByIdOrNameQuery } from '../../../application/use-cases/queries/associate/by-id-or-name/associate-list-by-id-or-name-query-handler';
import { AssociateListQuery } from '../../../application/use-cases/queries/associate/list/associate-list-query-handler';
import { AssociateDataByIdQuery } from '../../../application/use-cases/queries/associate/data/byId/associate-data-by-id-query-handler';
import { AssociateComposerCommand } from '../../../application/use-cases/commands/associate/create/associate-create-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';
import { AssociateDeleteCommand } from '../../../application/use-cases/commands/associate/delete/associate-delete-command-handler';

async function AssociateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{ Params: { id: number } }>('/associate/:id', async (request, reply) => {
    const { id } = request.params;
    const data: AssociateDataByIdQuery = { id: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('AssociateDataByIdQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/list', async (request, reply) => {
    const data = JSON.parse(request.body) as AssociateListQuery;
    
    if (data.page) data.offset = ((data.page - 1) * 20);
    
    const command = new CommandHandlerMediator();
    const result = await command.execute('AssociateListQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>('/associate/create', async (request, reply) => {
    const data: AssociateComposerCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();    
    const result = await command.execute('AssociateCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.put<{ Body: string }>('/associate/update', async (request, reply) => {
    const data: AssociateComposerCommand = JSON.parse(request.body);
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

  fastify.delete<{ Params: { id: number } }>('/associate/:id', async (request, reply) => {
    const { id } = request.params;
    const data: AssociateDeleteCommand = { id: id };
    const command = new CommandHandlerMediator();    
    const result = await command.execute('AssociateDeleteCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default AssociateRoute;