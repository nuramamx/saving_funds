import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function AnnualRateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/annual_rate', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('AllAnnualRateQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}

export default AnnualRateRoute;