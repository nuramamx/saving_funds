import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import Address from '../../../../../domain/entities/address';
import Associate from '../../../../../domain/entities/associate';
import AssociateDetail from '../../../../../domain/entities/associate-detail';
import Workplace from '../../../../../domain/entities/workplace';
import AddressInfo from '../../../../../domain/interfaces/address-info';
import AssociateDetailInfo from '../../../../../domain/interfaces/associate-detail-info';
import BeneficiaryInfo from '../../../../../domain/interfaces/beneficiary-info';
import WorkplaceInfo from '../../../../../domain/interfaces/workplace-info';
import AssociateSaveRepository from '../../../../../persistence/repositories/save/associate-save-repository';

interface AssociateCreateCommand {
  commandId?: string;
  name: string;
  rfc: string;
  gender: string;
  detail: AssociateDetailInfo;
  address: AddressInfo;
  workplace: WorkplaceInfo;
  beneficiaries: BeneficiaryInfo[];
}

export default class AssociateCreateCommandHandler implements CommandHandler<AssociateCreateCommand, CommandResponse> {
  async execute(data: AssociateCreateCommand): Promise<CommandResponse> {
    const repository = new AssociateSaveRepository();

    try {
      const associate = new Associate(data.name, data.rfc, data.gender)
        .updateDetail(new AssociateDetail(data.detail))
        .updateAddress(new Address(data.address))
        .updateWorkplace(new Workplace(data.workplace.key, data.workplace.name, data.workplace.phone))
        .addBeneficiaries(data.beneficiaries);

      console.log(associate);

      const result = await repository.save(associate);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { AssociateCreateCommand };
