import { z } from "../configs/zod-i18n";

const batchValidation = z.object({
  name: z.string().min(1).max(50),
  batchFunction: z.string().min(1).max(5000)
});

export default batchValidation;