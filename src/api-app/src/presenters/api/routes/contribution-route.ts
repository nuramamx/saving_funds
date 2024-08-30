import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ContributionCreateCommand } from "../../../application/use-cases/commands/contribution/create/contribution-create-command-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function ContributionRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/contribution/create', async (request, reply) => {
    const data: ContributionCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('ContributionCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default ContributionRoute;