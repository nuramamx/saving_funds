import Address from "../domain/entities/address";
import AssociateDetail from "../domain/entities/associate-detail";
import Beneficiary from "../domain/entities/beneficiary";
import NameInfo from "../domain/interfaces/name-info";
import { Gender } from "../domain/types/gender";

export default interface CreateAssociateCommand {
    name: NameInfo;
    rfc: string;
    gender: Gender;
    detail: AssociateDetail;
    address: Address;
    beneficiaries: Beneficiary[];
}