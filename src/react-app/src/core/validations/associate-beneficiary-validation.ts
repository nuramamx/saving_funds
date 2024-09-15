import { z } from "../configs/zod-i18n";

const AssociateBeneficiaryValidation = z.object({
  name: z.string().optional(),
  percentage: z.number().optional().default(0),
})
.refine(data => !(data.percentage && !data.name), {
  message: "El nombre es requerido.",
  path: ["name"],
})
.refine(data => !(data.name && (!data.percentage || data.percentage === 0)), {
  message: "El porcentaje es requerido.",
  path: ["percentage"],
});

const AssociateBeneficiariesValidation = z.array(AssociateBeneficiaryValidation).refine((items) => {
  const namedItems = items.filter(item => item.name);
  const totalPercentage = namedItems.reduce((sum, item) => sum + (item.percentage || 0), 0);
  return totalPercentage === 100;
}, { path: ['summarized'], message: 'El porcentaje total debe ser del 100%.' });

export default AssociateBeneficiariesValidation;