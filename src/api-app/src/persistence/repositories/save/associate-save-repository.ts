
import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { FunctionName } from '../../names/function-name';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import Associate from '../../../domain/entities/associate';
import ProcedureResponseModel from '../../interfaces/procedure-response-info';
import ParseError from '../../util/check-error';

export default class AssociateSaveRepository implements SaveRepositoryInfo<Associate, boolean> {
  save = async (data: Associate): Promise<boolean> => {
    const transaction = await db.sequelize.transaction();

    try
    {
      const [result] = await db.sequelize.query<ProcedureResponseModel>(FunctionName.ASSOCIATE_CREATE, {
        replacements: {
          p_name: data.name,
          p_rfc: data.rfc,
          p_gender: data.gender,
          p_detail: JSON.stringify(data.getDetail()),
          p_address: JSON.stringify(data.getAddress()),
          p_workplace: JSON.stringify(data.getWorkplace()),
          p_beneficiaries: JSON.stringify(data.getBeneficiaries())
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