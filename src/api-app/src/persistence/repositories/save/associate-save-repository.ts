
import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseModel from '../../interfaces/procedure-response-info';
import ParseError from '../../util/check-error';
import { AssociateComposerCommand } from '../../../application/use-cases/commands/associate/create/associate-create-command-handler';

export default class AssociateSaveRepository implements SaveRepositoryInfo<AssociateComposerCommand, boolean> {
  save = async (data: AssociateComposerCommand): Promise<boolean> => {
    const transaction = await db.sequelize.transaction();
    const editMode = (data.id !== null && data.id !== undefined && data.id > 0);

    console.log(`Save => ${JSON.stringify(data)}`);

    try
    {
      const [result] = await db.sequelize.query<ProcedureResponseModel>(!editMode ? FunctionName.ASSOCIATE_CREATE : FunctionName.ASSOCIATE_UPDATE, {
        replacements: {
          p_id: data.id,
          p_name: data.name,
          p_rfc: data.rfc,
          p_gender: data.gender,
          p_detail: JSON.stringify(data.detail),
          p_address: JSON.stringify(data.address),
          p_workplace: JSON.stringify(data.workplace),
          p_beneficiaries: JSON.stringify(data.beneficiaries),
          p_is_active: data.isActive ?? true
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!result.success)
        throw new Error(result.message);

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();
      throw ParseError(err);
    }
  }
}