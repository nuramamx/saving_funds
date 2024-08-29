import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import Address from '../../../../../domain/entities/address';
import Associate from '../../../../../domain/entities/associate';
import AssociateDetail from '../../../../../domain/entities/associate-detail';
import Workplace from '../../../../../domain/entities/workplace';
import AddressInfo from '../../../../../domain/interfaces/address-info';
import AssociateDetailInfo from '../../../../../domain/interfaces/associate-detail-info';
import BeneficiaryInfo from '../../../../../domain/interfaces/beneficiary-info';
import NameInfo from '../../../../../domain/interfaces/name-info';
import WorkplaceInfo from '../../../../../domain/interfaces/workplace-info';
import ErrorCodes from '../../../../../domain/types/error-codes';
import AssociateSaveRepository from '../../../../../persistence/repositories/save/associate-save-repository';
import CreateAssociateCommandValidator from './create-associate-command-validator';

interface CreateAssociateCommand {
  commandId?: string;
  name: NameInfo;
  rfc: string;
  gender: string;
  detail: AssociateDetailInfo;
  address: AddressInfo;
  workplace: WorkplaceInfo;
  beneficiaries: BeneficiaryInfo[];
}

class CreateAssociateCommandHandler implements CommandHandler<CreateAssociateCommand, CommandResponse> {
  async execute(data: CreateAssociateCommand): Promise<CommandResponse> {
    const validation = new CreateAssociateCommandValidator(data).validate();
    const repository = new AssociateSaveRepository();

    if (validation.length > 0) {
      return {
        successful: false,
        code: ErrorCodes.API_CMD_HANDLER_VALIDATION,
        message: 'Ocurrieron algunos errores de validación, favor de revisarlos.',
        type: 'danger',
        errors: [...validation.map((rule) => (rule.message))]
      } as CommandResponse;
    }

    try {
      const associate = new Associate(data.name, data.rfc, data.gender)
        .updateDetail(new AssociateDetail(data.detail))
        .updateAddress(new Address(data.address))
        .updateWorkplace(new Workplace(data.workplace.key, data.workplace.name, data.workplace.phone))
        .addBeneficiaries(data.beneficiaries);

      const result = await repository.save(associate);

      return { successful: true, message: 'Préstamo fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return {
        successful: false,
        message: 'Préstamo no pudo ser creado.',
        data: err.message,
        type: 'danger'
      } as CommandResponse;
    }
  }
}

export type { CreateAssociateCommand };
export default CreateAssociateCommandHandler;
