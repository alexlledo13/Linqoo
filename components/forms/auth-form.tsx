"use client";

import { Suspense } from "react";
import { AuthFormContent } from "./auth-form-content";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  return (
    <Suspense>
      <AuthFormContent mode={mode} />
    </Suspense>
  );
}
