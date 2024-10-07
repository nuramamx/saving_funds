import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AddressInfo from '../../../../../domain/interfaces/address-info';
import AssociateDetailInfo from '../../../../../domain/interfaces/associate-detail-info';
import BeneficiaryInfo from '../../../../../domain/interfaces/beneficiary-info';
import WorkplaceInfo from '../../../../../domain/interfaces/workplace-info';
import AssociateSaveRepository from '../../../../../persistence/repositories/save/associate-save-repository';

interface AssociateComposerCommand {
  commandId?: string;
  id: number;
  name: string;
  rfc: string;
  gender: string;
  detail: AssociateDetailInfo;
  address: AddressInfo;
  workplace: WorkplaceInfo;
  beneficiaries: BeneficiaryInfo[];
  isActive: boolean;
}

export default class AssociateCreateCommandHandler implements CommandHandler<AssociateComposerCommand, CommandResponse> {
  async execute(data: AssociateComposerCommand): Promise<CommandResponse> {
    const repository = new AssociateSaveRepository();

    try { 
      const result = await repository.save(data);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { AssociateComposerCommand };
