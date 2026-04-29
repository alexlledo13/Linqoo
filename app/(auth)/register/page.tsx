import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/forms/auth-form";
import { getOptionalUser } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Suspense>
      <AuthForm mode="register" />
    </Suspense>
  );
}
