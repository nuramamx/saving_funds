import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import Address from "../../../../../domain/entities/address";
import Beneficiary from "../../../../../domain/entities/beneficiary";
import AssociateDetail from "../../../../../domain/entities/associate-detail";
import Gender from "../../../../../domain/enums/gender";
import NameInfo from "../../../../../domain/interfaces/name-info";

interface CreateAssociateCommand {
    name: NameInfo;
    rfc: string;
    gender: Gender;
    detail: AssociateDetail;
    address: Address;
    beneficiaries: Beneficiary[];
}

class CreateAssociateCommandHandler implements CommandHandler<CreateAssociateCommand, CommandResponse> {
    execute(data: CreateAssociateCommand): CommandResponse {
        return { successful: true, message: "Associate created!" } as CommandResponse;
    }

}

export { CreateAssociateCommandHandler };
export type { CreateAssociateCommand };
