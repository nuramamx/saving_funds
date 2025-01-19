import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ContributionCreateCommand } from "../../../application/use-cases/commands/contribution/create/contribution-create-command-handler";
import { ContributionDeleteCommand } from "../../../application/use-cases/commands/contribution/delete/contribution-delete-command-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function ContributionRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/contribution/create', async (request, reply) => {
    const data: ContributionCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('ContributionCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.delete<{ Params: { id: number } }>('/contribution/:id', async (request, reply) => {
    const { id } = request.params;
    const data: ContributionDeleteCommand = { id: id };
    const command = new CommandHandlerMediator();    
    const result = await command.execute('ContributionDeleteCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default ContributionRoute;