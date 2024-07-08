import { db } from '../../instance';
import { ProcedureName } from '../../names/procedure-name';
import { DataTypes, QueryTypes } from 'sequelize';
import Borrow from '../../../domain/entities/borrow';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import ProcedureResponseModel from '../../models/stored-procedures/procedure-response-model';

export default class SaveBorrowRepository implements SaveRepositoryInfo<Borrow, boolean> {
  save = async (data: Borrow): Promise<boolean> => {
    const transaction = await db.sequelize.transaction();

    try {
      const [saveBorrowResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.BORROW_CREATE, {
        replacements: {
          associate_id: data.associateId,
          requested_amount: data.requestedAmount,
          period: data.period,
          annual_rate: data.annualRate,
          is_fortnightly: data.isFortnightly,
          inserted_id: { type: DataTypes.INTEGER, dir: 'OUT '},
          success: { type: DataTypes.BOOLEAN, dir: 'OUT '},
          message: { type: DataTypes.TEXT, dir: 'OUT '}
        },
        type: QueryTypes.SELECT
      });
      
      if (!saveBorrowResult.success)
        throw new Error(saveBorrowResult.message);

      await transaction.commit();

      return true;
    } catch (err: any) {
      await transaction.rollback();

      if (err.parent !== null && err.parent !== undefined
        && err.parent.where !== null && err.parent.where !== undefined)
        throw new Error(`[E-201]: ${err.parent.where}`);
      else if (err.message !== null && err.message !== undefined)
        throw new Error(`[E-202]: ${err.message}`);
      else
        throw new Error(`[E-200]: ${err}`);
    }
  }
}