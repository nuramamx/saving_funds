import fastify from "fastify";
import CommandHandler from "../../../../../../abstractions/interfaces/array-buffer-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import UserDataByUserAndPasswordQueryRepository from "../../../../../../persistence/repositories/query/user-data-by-user-and-password-query-repository";
import { UserDataByUserAndPasswordQuery } from "../../../../queries/security/user/data/user-data-by-user-and-password-query-command-handler";

type SecurityTokenCreateCommand = {
  user: string;
  password: string;
};

export default class SecurityTokenCreateCommandHandler implements CommandHandler<SecurityTokenCreateCommand, CommandResponse> {
  async execute(data: SecurityTokenCreateCommand): Promise<CommandResponse> {
    const userDataRepository = new UserDataByUserAndPasswordQueryRepository();
    const userDataQuery: UserDataByUserAndPasswordQuery = {
      user: data.user,
      password: data.password
    };

    try {
      const userDataResult = await userDataRepository.all(userDataQuery);

      if (userDataResult !== null && userDataQuery !== undefined && userDataResult.length <= 0)
        throw new Error('Los datos de inicio de sesión son incorrectos.');

      return { successful: true, message: 'Registro fue creado con éxito.', data: userDataResult[0], type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'El registro no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { SecurityTokenCreateCommand };