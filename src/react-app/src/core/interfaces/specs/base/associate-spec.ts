import AssociateAddressSpec from "./associate-address-spec";
import AssociateBeneficiarySpec from "./associate-beneficiary-spec";
import AssociateDetailSpec from "./associate-detail-spec";
import AssociateWorkplaceSpec from "./associate-workplace-spec";

export default interface AssociateSpec {
  name: string;
  rfc: string;
  gender: string;
  detail: AssociateDetailSpec;
  address: AssociateAddressSpec;
  workplace: AssociateWorkplaceSpec;
  beneficiaries: AssociateBeneficiarySpec[];
}