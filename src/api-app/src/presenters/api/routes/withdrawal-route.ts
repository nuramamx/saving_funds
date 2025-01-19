import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { WithdrawalCreateCommand } from "../../../application/use-cases/commands/withdrawal/create/withdrawal-create-command-handler";
import { WithdrawalDeleteCommand } from "../../../application/use-cases/commands/withdrawal/delete/withdrawal-delete-command-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function WithdrawalRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/withdrawal/create', async (request, reply) => {
    const data: WithdrawalCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('WithdrawalCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.delete<{ Params: { id: number } }>('/withdrawal/:id', async (request, reply) => {
    const { id } = request.params;
    const data: WithdrawalDeleteCommand = { id: id };
    const command = new CommandHandlerMediator();    
    const result = await command.execute('WithdrawalDeleteCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default WithdrawalRoute;