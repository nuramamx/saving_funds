import { z } from "../configs/zod-i18n";

const AssociateDetailValidation = z.object({
  agreementId: z.number().refine((x) => x !== 0 || x < 0, 'Debe especificar un convenio válido.'),
  dependencyKey: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  salary: z.number().min(1),
  socialContribution: z.number().min(1),
  frequentContribution: z.number().min(1)
});

export default AssociateDetailValidation;