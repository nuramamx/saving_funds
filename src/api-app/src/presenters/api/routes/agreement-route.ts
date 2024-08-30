import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

async function AgreementRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/agreement', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('AgreementListQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}

export default AgreementRoute;