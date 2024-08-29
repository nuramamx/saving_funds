
import { db } from '../../instance';
import { QueryTypes } from 'sequelize';
import { ProcedureName } from '../../names/procedure-name';
import SaveRepositoryInfo from '../../interfaces/save-repository-info';
import Associate from '../../../domain/entities/associate';
import AssociateDetail from '../../../domain/entities/associate-detail';
import Address from '../../../domain/entities/address';
import Workplace from '../../../domain/entities/workplace';
import Beneficiary from '../../../domain/entities/beneficiary';
import ProcedureResponseModel from '../../interfaces/procedure-response-info';

export default class AssociateSaveRepository implements SaveRepositoryInfo<Associate, boolean> {
  save = async (data: Associate): Promise<boolean> => {
    const transaction = await db.sequelize.transaction();
    const listBeneficiariesSaveResult: ProcedureResponseModel[] = [];
    const associateDetail: AssociateDetail = data.getDetail();
    const associateAddress: Address = data.getAddress();
    const associateWorkplace: Workplace = data.getWorkplace();
    const associateBeneficiaries: Beneficiary[] = data.getBeneficiaries();

    try
    {
      const [saveAssociateResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.ASSOCIATE_CREATE, {
        replacements: {
          firstname: data.name.firstname,
          middlename: data.name.middlename,
          paternal_lastname: data.name.paternalLastname,
          maternal_lastname: data.name.maternalLastname,
          rfc: data.rfc,
          gender: data.gender
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!saveAssociateResult.success)
        throw new Error(saveAssociateResult.message);

      const associateId = saveAssociateResult.inserted_id;

      const [saveDetailResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.ASSOCIATE_DETAIL_CREATE, {
        replacements: {
          associate_id: associateId,
          agreement_id: associateDetail.agreementId,
          dependency_key: associateDetail.dependencyKey,
          category: associateDetail.category,
          salary: associateDetail.salary,
          social_contribution: associateDetail.socialContribution,
          fortnightly_contribution: associateDetail.fortnightlyContribution
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!saveDetailResult.success)
        throw new Error(saveDetailResult.message);

      const [saveAddressResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.ADDRESS_CREATE, {
        replacements: {
          associate_id: associateId,
          city_id: associateAddress.cityId,
          street: associateAddress.street,
          settlement: associateAddress.settlement,
          town: associateAddress.town,
          postal_code: associateAddress.postalCode,
          phone: associateAddress.phone,
          mobile: associateAddress.mobile,
          email: associateAddress.email
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!saveAddressResult.success)
        throw new Error(saveAddressResult.message);

      const [saveWorkspaceResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.WORKPLACE_CREATE, {
        replacements: {
          associate_id: associateId,
          key: associateWorkplace.key,
          name: associateWorkplace.name,
          phone: associateWorkplace.phone
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!saveWorkspaceResult.success)
        throw new Error(saveWorkspaceResult.message);

      const [saveBeneficiariesResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.BENEFICIARY_CREATE, {
        replacements: {
          associate_id: associateId,
          beneficiaries: JSON.stringify(associateBeneficiaries),
        },
        type: QueryTypes.SELECT,
        transaction
      });

      if (!saveBeneficiariesResult.success)
        throw new Error(saveBeneficiariesResult.message);

      listBeneficiariesSaveResult.map((x) => {
        if (!x.success)
          throw new Error(x.message);
      });

      const [saveSavingFundResult] = await db.sequelize.query<ProcedureResponseModel>(ProcedureName.SAVING_FUND_CREATE, {
        replacements: {
          p_associate_id: associateId,
          p_opening_balance: associateDetail.socialContribution.toFixed(2),
          p_is_fortnightly: true
        },
        type: QueryTypes.SELECT,
        transaction
      });

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