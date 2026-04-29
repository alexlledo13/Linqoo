import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { getOptionalUser } from "@/lib/supabase/auth";

const AuthForm = dynamic(
  () => import("@/components/forms/auth-form").then((m) => m.AuthForm),
  { ssr: false }
);

export default async function LoginPage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return <AuthForm mode="login" />;
}
