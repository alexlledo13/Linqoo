import { redirect } from "next/navigation";
import { getCurrentMonthKey } from "@/lib/domain/usage";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const monthKey = getCurrentMonthKey();

  const [{ data: profile }, { data: links }, { data: usage }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, email, full_name, plan, created_at")
      .eq("id", user.id)
      .single(),
    supabase
      .from("links")
      .select("id, slug, target_url, active, ad_enabled, click_count, created_at, expires_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("usage_monthly")
      .select("links_created, clicks_served, month")
      .eq("user_id", user.id)
      .eq("month", monthKey)
      .maybeSingle()
  ]);

  return {
    createdAt: profile?.created_at ?? user.created_at ?? null,
    email: profile?.email ?? user.email ?? "user",
    fullName: profile?.full_name ?? null,
    links: links ?? [],
    linksCount: links?.length ?? 0,
    monthlyClicks: usage?.clicks_served ?? 0,
    monthlyLinks: usage?.links_created ?? 0,
    plan: profile?.plan ?? "free"
  };
}
