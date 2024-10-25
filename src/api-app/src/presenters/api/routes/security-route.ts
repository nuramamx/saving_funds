import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserDataByUserAndPasswordQuery } from "../../../application/use-cases/queries/security/user/data/user-data-by-user-and-password-query-command-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";
import UserDataByUserAndPasswordSpec from "../../../persistence/specs/data/user-data-by-user-and-password-spec";
import CommandResponse from "../../../abstractions/interfaces/command-response";

export default async function SecurityRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Body: string }>('/security/token', async (request, reply) => {
    const data: UserDataByUserAndPasswordQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('UserDataByUserAndPasswordQuery', data);

    if (!result.successful) {
      const response = { successful: true, data: undefined, message: 'Datos de inicio de sesión incorrectos.', type: 'danger', errors: [] } as CommandResponse;
      reply.statusCode = 400;

      return response;
    }

    const userData = (result.data as UserDataByUserAndPasswordSpec);
    const token = fastify.jwt.sign({
      user: userData.user,
      role: userData.role
    }, {
      expiresIn: undefined
    });
    userData.token = token;

    const response: CommandResponse = { successful: true, data: userData, message: 'Usuario obtenido con éxito.', type: 'success', errors: [] };

    return response;
  });
}