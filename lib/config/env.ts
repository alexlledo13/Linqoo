import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Linqoo"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SHORT_LINK_DOMAIN: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  FREE_PLAN_LINK_LIMIT: z.coerce.number().int().positive().default(25),
  FREE_PLAN_CLICK_LIMIT: z.coerce.number().int().positive().default(5000)
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SHORT_LINK_DOMAIN: process.env.NEXT_PUBLIC_SHORT_LINK_DOMAIN,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  FREE_PLAN_LINK_LIMIT: process.env.FREE_PLAN_LINK_LIMIT,
  FREE_PLAN_CLICK_LIMIT: process.env.FREE_PLAN_CLICK_LIMIT
});
