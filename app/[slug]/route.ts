import { NextResponse } from "next/server";
import { getNextRedirectTarget } from "@/lib/domain/redirects";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const supabase = createServiceRoleSupabaseClient();

  const { data: link } = await supabase
    .from("links")
    .select("id, slug, target_url, active, ad_enabled, click_count, created_at, expires_at")
    .eq("slug", slug)
    .maybeSingle();

  if (!link || !link.active) {
    return new Response("Not found", { status: 404 });
  }

  if (link.expires_at && new Date(link.expires_at).getTime() < Date.now()) {
    return new Response("Not found", { status: 404 });
  }

  const referrer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  const clickInsert = supabase.from("clicks").insert({
    link_id: link.id,
    referrer,
    country: request.headers.get("x-vercel-ip-country"),
    device: userAgent,
    ip_hash: await hashIp(ip)
  });

  const usageUpdate = supabase.rpc("increment_link_metrics", {
    input_link_id: link.id
  });

  await Promise.allSettled([clickInsert, usageUpdate]);

  // TODO: switch to an interstitial page when ad-enabled monetization ships.
  return NextResponse.redirect(getNextRedirectTarget(link), 307);
}

async function hashIp(value: string) {
  const encoded = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
