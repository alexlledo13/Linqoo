import { z } from "zod";
import { authSchema } from "@/lib/validation/auth";

export const registerSchema = authSchema.extend({
  fullName: z.string().trim().min(2).max(80)
});

