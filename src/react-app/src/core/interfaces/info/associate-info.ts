import AddressInfo from "./address-info";
import AssociateDetailInfo from "./associate-detail-info";
import BeneficiaryInfo from "./beneficiary-info";
import NameInfo from "./name-info";
import WorkplaceInfo from "./workplace-info";

export default interface AssociateInfo {
  name: NameInfo;
  rfc: string;
  gender: string;
  detail: AssociateDetailInfo;
  address: AddressInfo;
  workplace: WorkplaceInfo;
  beneficiaries: BeneficiaryInfo[];
}