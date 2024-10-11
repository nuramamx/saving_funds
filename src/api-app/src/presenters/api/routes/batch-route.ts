import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyMultipart, MultipartFile } from "@fastify/multipart";
import { BatchCreateCommand } from '../../../application/use-cases/commands/batch/create/batch-create-command-handler';
import { BatchUploadCommand } from '../../../application/use-cases/commands/batch/upload/batch-upload-command-handler';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';

export default async function BatchRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(fastifyMultipart, { attachFieldsToBody: true });

  fastify.get('/batch', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('BatchListQuery');

    if (!result.successful) reply.statusCode = 400; 

    return result;
  });

  fastify.post<{Body: { file: MultipartFile, process: string, disableRules: string, validationOnly: string }}>('/batch/upload', async (request, reply) => {
    const data = request.body.file
    const process = data.fields.process as { value: string };
    const disableRules = data.fields.disableRules as { value: string };
    const validationOnly = data.fields.validationOnly as { value: string };

    if (data != null && data !== undefined && process) {
      const upload: BatchUploadCommand = {
        process: process.value,
        filename: data.filename,
        file: await data.toBuffer(),
        disableRules: disableRules.value === 'x',
        validationOnly: validationOnly.value === 'x'
      };
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