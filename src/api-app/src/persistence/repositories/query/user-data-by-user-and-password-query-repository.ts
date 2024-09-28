import { QueryTypes } from "sequelize";
import { db } from "../../instance";
import { FunctionName } from "../../names/function-name";
import { UserDataByUserAndPasswordQuery } from "../../../application/use-cases/queries/security/user/data/user-data-by-user-and-password-query-command-handler";
import QueryRepositoryInfo from "../../interfaces/query-repository-info";
import UserDataByUserAndPasswordSpec from "../../specs/data/user-data-by-user-and-password-spec";

export default class UserDataByUserAndPasswordQueryRepository implements QueryRepositoryInfo<UserDataByUserAndPasswordQuery, UserDataByUserAndPasswordSpec> {
  async all(data: UserDataByUserAndPasswordQuery): Promise<UserDataByUserAndPasswordSpec[]> {
    try {
      const result = await db.sequelize.query(
        FunctionName.USER_DATA_BY_USER_AND_PASSWORD, {
          replacements: {
            p_user: data.user,
            p_password: data.password
          },
          type: QueryTypes.SELECT
        }
      ) as UserDataByUserAndPasswordSpec[];

      return result;
    } catch (err: any) {
      throw new Error(`[E-200]: ${err}`);
    }
  }
}