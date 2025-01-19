
import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import { ContributionDeleteCommand } from '../../../application/use-cases/commands/contribution/delete/contribution-delete-command-handler';
import ProcedureResponseModel from '../../interfaces/procedure-response-info';
import ParseError from '../../util/check-error';
import DeleteRepositoryInfo from '../../interfaces/delete-repository-info';

export default class ContributionDeleteRepository implements DeleteRepositoryInfo<ContributionDeleteCommand, boolean> {
  async delete(data: ContributionDeleteCommand): Promise<boolean> {
    try
    {
      const [result] = await db.sequelize.query<ProcedureResponseModel>(FunctionName.CONTRIBUTION_DELETE, {
        replacements: {
          p_id: data.id
        },
        type: QueryTypes.SELECT
      });

      if (!result.success)
        throw new Error(result.message);

      return true;
    } catch (err: any) {
      throw ParseError(err);
    }
  }
}