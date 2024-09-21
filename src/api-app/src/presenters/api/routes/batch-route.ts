import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyMultipart } from "@fastify/multipart";
import { BatchCreateCommand } from '../../../application/use-cases/commands/batch/create/batch-create-command-handler';
import { BatchUploadCommand } from '../../../application/use-cases/commands/batch/upload/batch-upload-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

export default async function BatchRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(fastifyMultipart);

  fastify.get('/batch', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BatchListQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });

  fastify.post('/batch/upload', async (request, reply) => {
    const data = await request.file();
    const process = data?.fields?.process as { value: number };

    if (data != null || data !== undefined) {
      const upload: BatchUploadCommand = { process: process.value, filename: data.filename, file: await data.toBuffer() };
      const command = new CommandHandlerMediator();
      const result = await command.execute('BatchUploadCommand', upload);

      if (!result.successful) reply.statusCode = 400;

      return result;
    } else {
      reply.statusCode = 400;
    }
  });

  fastify.post<{Body: string}>('/batch/create', async (request, reply) => {
    const data: BatchCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('BatchCreateCommand', data);

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });
}