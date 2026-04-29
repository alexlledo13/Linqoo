import { NextResponse } from "next/server";
import { getPlanLimits } from "@/lib/config/plans";
import { generateShortSlug } from "@/lib/domain/generate-slug";
import { getCurrentMonthKey } from "@/lib/domain/usage";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createLinkSchema } from "@/lib/validation/link";

const MAX_SLUG_ATTEMPTS = 5;

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createLinkSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid target URL." },
      { status: 400 }
    );
  }

  const [{ data: profile }, { data: usageRow }] = await Promise.all([
    supabase.from("profiles").select("plan").eq("id", user.id).single(),
    supabase
      .from("usage_monthly")
      .select("id, links_created")
      .eq("user_id", user.id)
      .eq("month", getCurrentMonthKey())
      .maybeSingle()
  ]);

  const plan = profile?.plan ?? "free";
  const limits = getPlanLimits(plan);
  const linksCreated = usageRow?.links_created ?? 0;

  if (linksCreated >= limits.linksPerMonth) {
    return NextResponse.json(
      { error: "You reached the monthly limit for your current plan." },
      { status: 403 }
    );
  }

  let slug = "";
  let attempts = 0;

  while (attempts < MAX_SLUG_ATTEMPTS) {
    attempts += 1;
    const candidate = generateShortSlug();
    const { data: existing } = await supabase
      .from("links")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (!existing) {
      slug = candidate;
      break;
    }
  }

  if (!slug) {
    return NextResponse.json(
      { error: "Could not generate a unique slug. Please try again." },
      { status: 500 }
    );
  }

  const { data: insertedLink, error: insertError } = await supabase
    .from("links")
    .insert({
      user_id: user.id,
      slug,
      target_url: parsed.data.targetUrl,
      active: true,
      ad_enabled: false
    })
    .select("id, slug, target_url, active, ad_enabled, click_count, created_at, expires_at")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  const month = getCurrentMonthKey();
  const usagePromise = usageRow
    ? supabase
        .from("usage_monthly")
        .update({
          links_created: usageRow.links_created + 1
        })
        .eq("id", usageRow.id)
    : supabase.from("usage_monthly").insert({
        user_id: user.id,
        month,
        links_created: 1,
        clicks_served: 0
      });

  const { error: usageError } = await usagePromise;

  if (usageError) {
    return NextResponse.json({ error: usageError.message }, { status: 400 });
  }

  return NextResponse.json({ data: insertedLink }, { status: 201 });
}
