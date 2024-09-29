import { z } from "../configs/zod-i18n";

const BatchUploadValidation = z.object({
  filename: z.string(),
  process: z.string().min(1),
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo.' })
});

export default BatchUploadValidation;