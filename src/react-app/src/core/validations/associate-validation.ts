import { z } from "../configs/zod-i18n";
import AssociateAddressValidation from "./associate-address-validation";
import AssociateBeneficiariesValidation from "./associate-beneficiary-validation";
import AssociateDetailValidation from "./associate-detail-validation";
import AssociateWorkplaceValidation from "./associate-workplace-validation";

const AssociateValidation = z.object({
  name: z.string().min(1).max(50),
  rfc: z.string().min(1).max(250),
  gender: z.enum(['F', 'M']),
  detail: AssociateDetailValidation,
  address: AssociateAddressValidation,
  workplace: AssociateWorkplaceValidation,
  beneficiaries: AssociateBeneficiariesValidation
});

export default AssociateValidation;