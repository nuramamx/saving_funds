import { z } from "../configs/zod-i18n";

const BorrowValidation = z.object({
  associateId: z.number().min(1),
  requestedAmount: z.number().min(100),
  period: z.number().min(1),
  isFortnightly: z.boolean(),
  startAt: z.date()
});

export default BorrowValidation;