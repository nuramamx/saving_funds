import { z } from "../configs/zod-i18n";

const AssociateWorkplaceValidation = z.object({
  key: z.string().min(1).max(25),
  name: z.string().min(1).max(500),
  phone: z.string().min(1).max(10),
});

export default AssociateWorkplaceValidation;