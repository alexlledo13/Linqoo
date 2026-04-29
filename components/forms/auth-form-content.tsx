"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthFormContentProps = {
  mode: "login" | "register";
};

export function AuthFormContent({ mode }: AuthFormContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === "login";
  const redirectPath = searchParams.get("next") ?? "/dashboard";
  const targetUrl = searchParams.get("targetUrl");
  const alternateAuthHref = useMemo(() => {
    const params = new URLSearchParams();

    if (redirectPath) {
      params.set("next", redirectPath);
    }

    if (targetUrl) {
      params.set("targetUrl", targetUrl);
    }

    const queryString = params.toString();
    const basePath = isLogin ? "/register" : "/login";

    return queryString ? `${basePath}?${queryString}` : basePath;
  }, [isLogin, redirectPath, targetUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        isLogin ? { email, password } : { fullName, email, password }
      )
    });

    const payload = (await response.json()) as {
      error?: string;
      requiresEmailConfirmation?: boolean;
    };

    if (!response.ok) {
      setError(payload.error ?? "Something went wrong.");
      setIsLoading(false);
      return;
    }

    if (payload.requiresEmailConfirmation) {
      setMessage("Account created. Check your email to confirm your address.");
      setIsLoading(false);
      return;
    }

    const nextParams = new URLSearchParams();

    if (targetUrl) {
      nextParams.set("targetUrl", targetUrl);
    }

    const nextLocation = nextParams.toString()
      ? `${redirectPath}?${nextParams.toString()}`
      : redirectPath;

    router.push(nextLocation as Route);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <Card className="w-full p-8">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            {isLogin ? "Welcome back" : "Create account"}
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950">
            {isLogin ? "Sign in" : "Get started"}
          </h1>
          <p className="text-sm text-slate-600">
            {isLogin
              ? "Access your private dashboard and manage your links."
              : "Set up your workspace and start creating short links."}
          </p>
          {targetUrl ? (
            <div className="rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-900">
              Your link will be waiting for you after authentication.
            </div>
          ) : null}
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {!isLogin ? (
            <Input
              autoComplete="name"
              label="Name"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your name"
              required
              value={fullName}
            />
          ) : null}
          <Input
            autoComplete="email"
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
          <Input
            autoComplete={isLogin ? "current-password" : "new-password"}
            label="Password"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 8 characters"
            required
            type="password"
            value={password}
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          {isLogin ? "Need an account?" : "Already registered?"}{" "}
          <Link
            className="font-medium text-brand-700 transition hover:text-brand-800"
            href={alternateAuthHref as Route}
          >
            {isLogin ? "Create one" : "Sign in"}
          </Link>
        </p>
      </Card>
    </div>
  );
}
