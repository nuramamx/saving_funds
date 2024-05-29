import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function StateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/state', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('AllStateQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}

export default StateRoute;