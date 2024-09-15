import { z } from "../configs/zod-i18n";

const AssociateAddressValidation = z.object({
  cityId: z.number().refine((x) => x !== 0 || x < 0, 'Debe especificar una ciudad válida.'),
  street: z.string().min(1).max(100),
  settlement: z.string().min(1).max(100),
  town: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(5),
  phone: z.string().min(1).max(10),
  mobile: z.string().min(1).max(10),
  email: z.string().email()
});

export default AssociateAddressValidation;