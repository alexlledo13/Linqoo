import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getOptionalUser() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user ?? null;
  } catch {
    return null;
  }
}
