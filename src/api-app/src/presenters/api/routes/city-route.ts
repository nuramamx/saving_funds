import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function CityRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/city', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('AllCityQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}

export default CityRoute;