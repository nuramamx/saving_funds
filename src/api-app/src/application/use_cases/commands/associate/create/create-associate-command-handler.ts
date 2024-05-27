import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import AddressInfo from "../../../../../domain/interfaces/address-info";
import AssociateDetailInfo from "../../../../../domain/interfaces/associate-detail-info";
import BeneficiaryInfo from "../../../../../domain/interfaces/beneficiary-info";
import NameInfo from "../../../../../domain/interfaces/name-info";
import WorkplaceInfo from "../../../../../domain/interfaces/workplace-info";
import CreateAssociateCommandValidator from "./create-associate-command-validator";

export default interface CreateAssociateCommand {
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
  execute = async(data: CreateAssociateCommand): Promise<CommandResponse> => {
    const validation = new CreateAssociateCommandValidator(data).validate();

    if (validation.length > 0)
      return {
        successful: false,
        message: 'Ocurrieron algunos errores de validación, favor de revisarlos.',
        type: 'danger',
        errors: [...validation.map((rule) => (rule.message))]
      } as CommandResponse;

    return { successful: true, message: "Socio fue creado con éxito.", type: 'success' } as CommandResponse;
  }
}

export type { CreateAssociateCommand };
export { CreateAssociateCommandHandler };
