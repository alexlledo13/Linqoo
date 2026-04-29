import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { env } from "@/lib/config/env";
import { registerSchema } from "@/lib/validation/register";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid name, email and password." },
      { status: 400 }
    );
  }

  const { fullName, ...credentials } = parsed.data;

  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        full_name: fullName
      },
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/dashboard`
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const requiresEmailConfirmation = !data.session;

  if (data.user) {
    await supabase
      .from("profiles")
      .update({
        full_name: fullName
      })
      .eq("id", data.user.id);
  }

  return NextResponse.json({
    success: true,
    requiresEmailConfirmation
  });
}
