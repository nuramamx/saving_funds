
import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import { AssociateComposerCommand } from '../../../application/use-cases/commands/associate/create/associate-create-command-handler';
import { AssociateDeleteCommand } from '../../../application/use-cases/commands/associate/delete/associate-delete-command-handler';
import ProcedureResponseModel from '../../interfaces/procedure-response-info';
import ParseError from '../../util/check-error';
import DeleteRepositoryInfo from '../../interfaces/delete-repository-info';

export default class AssociateDeleteRepository implements DeleteRepositoryInfo<AssociateComposerCommand, boolean> {
  async delete(data: AssociateDeleteCommand): Promise<boolean> {
    try
    {
      const [result] = await db.sequelize.query<ProcedureResponseModel>(FunctionName.ASSOCIATE_DELETE, {
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