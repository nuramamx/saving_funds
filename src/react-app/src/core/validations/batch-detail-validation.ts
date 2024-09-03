import { z } from "../configs/zod-i18n";

const BatchDetailValidation = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  type: z.enum(['varchar', 'text', 'integer', 'numeric', 'timestamp', 'boolean']),
  parameter: z.string().min(1).max(50),
});

export default BatchDetailValidation;