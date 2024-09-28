import CommandHandler from "../../../../../../abstractions/interfaces/array-buffer-handler";
import CommandResponse from "../../../../../../abstractions/interfaces/command-response";
import UserDataByUserAndPasswordQueryRepository from "../../../../../../persistence/repositories/query/user-data-by-user-and-password-query-repository";

type UserDataByUserAndPasswordQuery = {
  user: string;
  password: string;
};

export default class UserDataByUserAndPasswordQueryHandler implements CommandHandler<UserDataByUserAndPasswordQuery, CommandResponse> {
  async execute(data: UserDataByUserAndPasswordQuery): Promise<CommandResponse> {
    const userDataRepository = new UserDataByUserAndPasswordQueryRepository();

    try {
      const userDataResult = await userDataRepository.all(data);

      if (userDataResult !== null && userDataResult !== undefined && userDataResult.length <= 0)
        throw new Error('Los datos de inicio de sesión son incorrectos.');

      return { successful: true, message: 'Busqueda exitosa.', data: userDataResult[0], type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { UserDataByUserAndPasswordQuery };