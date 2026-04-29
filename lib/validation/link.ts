import { z } from "zod";
import { isValidHttpUrl, normalizeUrlInput } from "@/lib/utils/url";

export const createLinkSchema = z.object({
  targetUrl: z
    .string()
    .trim()
    .refine(isValidHttpUrl, "Please provide a valid HTTP or HTTPS URL.")
    .transform(normalizeUrlInput)
});
