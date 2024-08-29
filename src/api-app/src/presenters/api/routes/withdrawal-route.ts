import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";
import { WithdrawalCreateCommand } from "../../../application/use-cases/commands/withdrawal/create/withdrawal-create-command-handler";

async function WithdrawalRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/withdrawal/create', async (request, reply) => {
    const data: WithdrawalCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('WithdrawalCreate', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default WithdrawalRoute;