"use client";

import type { Route } from "next";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generateShortSlug } from "@/lib/domain/generate-slug";
import { buildShortLinkUrl } from "@/lib/domain/links";
import { isValidHttpUrl } from "@/lib/utils/url";

type LandingShortenerFormProps = {
  isAuthenticated: boolean;
  compact?: boolean;
};

export function LandingShortenerForm({
  compact = false,
  isAuthenticated
}: LandingShortenerFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [targetUrl, setTargetUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [guestSlug, setGuestSlug] = useState<string | null>(null);

  const previewUrl = useMemo(() => buildShortLinkUrl("******"), []);
  const guestPreviewUrl = guestSlug ? buildShortLinkUrl(guestSlug) : null;

  useEffect(() => {
    const queuedTargetUrl = searchParams.get("targetUrl");

    if (queuedTargetUrl) {
      setTargetUrl(queuedTargetUrl);
    }
  }, [searchParams]);

  function getRegisterHref() {
    return targetUrl
      ? `/register?next=%2Fdashboard%2Flinks&targetUrl=${encodeURIComponent(targetUrl)}`
      : "/register";
  }

  function getLoginHref() {
    return targetUrl
      ? `/login?next=%2Fdashboard%2Flinks&targetUrl=${encodeURIComponent(targetUrl)}`
      : "/login";
  }

  function handleGuestCopy() {
    router.push(getRegisterHref() as Route);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setCreatedSlug(null);

    if (!isValidHttpUrl(targetUrl)) {
      setError("Enter a valid HTTP or HTTPS URL.");
      return;
    }

    if (!isAuthenticated) {
      setGuestSlug(generateShortSlug());
      return;
    }

    setIsLoading(true);

    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ targetUrl })
    });

    const payload = (await response.json()) as {
      error?: string;
      data?: {
        slug: string;
      };
    };

    if (!response.ok) {
      setError(payload.error ?? "Could not create link.");
      setIsLoading(false);
      return;
    }

    setGuestSlug(null);
    setCreatedSlug(payload.data?.slug ?? null);
    setTargetUrl("");
    setIsLoading(false);
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <div
      className={`relative w-full ${
        compact
          ? "max-w-[960px]"
          : "rounded-[2rem] border border-slate-200/70 bg-white p-3 shadow-[0_32px_80px_rgba(94,25,230,0.14)] xl:ml-auto xl:max-w-[640px] 2xl:max-w-[700px]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          compact
            ? "bg-transparent p-0"
            : "bg-gradient-to-br from-[#f3edff] via-white to-[#eef4ff] rounded-[1.6rem] border border-slate-200 p-5 sm:p-8 xl:p-9"
        }`}
      >
        {!compact ? (
          <>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-300/25 blur-3xl" />
            <div className="absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-sky-200/30 blur-3xl" />
          </>
        ) : null}

        <div className="relative space-y-6 xl:space-y-7">
          {compact ? (
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                Shorten a link
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Paste a long URL to generate a short link preview instantly.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                Smart shortening
              </div>
              <h2 className="max-w-xl font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl xl:text-[3.6rem] xl:leading-[0.96]">
                Shorten, track and share links without clutter.
              </h2>
              <p className="max-w-xl text-base leading-7 text-slate-600 xl:text-[1.08rem] xl:leading-8">
                Paste any long URL and start the flow instantly. Guests are guided
                to sign up before unlocking their final short link.
              </p>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div
              className={`flex flex-col gap-3 ${
                compact
                  ? "sm:flex-row sm:items-center"
                  : "rounded-[1.35rem] border border-white/70 bg-white/80 p-3 shadow-lg shadow-brand-100/40 sm:flex-row sm:items-center"
              }`}
            >
              <input
                className={`min-w-0 flex-1 border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100 ${
                  compact ? "rounded-full shadow-[0_12px_28px_rgba(15,23,42,0.08)]" : "rounded-[1rem]"
                }`}
                onChange={(event) => setTargetUrl(event.target.value)}
                placeholder="Paste a long URL here"
                type="url"
                value={targetUrl}
              />
              <Button
                className={`min-w-[190px] px-6 py-4 text-base ${
                  compact ? "rounded-full bg-slate-950 hover:bg-slate-800" : "bg-brand-600 hover:bg-brand-700"
                }`}
                disabled={isLoading}
                type="submit"
              >
                {isAuthenticated
                  ? isLoading
                    ? "Creating..."
                    : "Create short link"
                  : guestSlug
                    ? "Refresh preview"
                    : "Generate preview"}
              </Button>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {createdSlug ? (
              <p className="text-sm text-emerald-700">
                Your short link is ready: {buildShortLinkUrl(createdSlug)}
              </p>
            ) : null}
          </form>

          {!isAuthenticated ? (
            <div
              className={`${
                compact
                  ? "bg-transparent p-0 shadow-none"
                  : "rounded-[1.35rem] border border-brand-100 bg-white/80 p-5"
              }`}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                    {guestSlug ? "Your preview is ready" : "Preview"}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-slate-950 sm:text-3xl">
                    {guestPreviewUrl ?? previewUrl}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                    {guestSlug
                      ? "The link looks ready. Create an account or sign in to copy and activate it for real."
                      : "Generate a preview first, then we will ask for sign up only when you want to copy and keep the link."}
                  </p>
                </div>

                {guestSlug ? (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      onClick={handleGuestCopy}
                      type="button"
                    >
                      Copy link
                    </button>
                    <Link
                      className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      href={getLoginHref() as Route}
                    >
                      I already have an account
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {!compact ? (
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f6d9c9] text-[10px] font-bold text-slate-700">
                  AR
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f0e0ff] text-[10px] font-bold text-slate-700">
                  LU
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#d9f3ea] text-[10px] font-bold text-slate-700">
                  MX
                </span>
              </div>
              <p>Trusted by creators, indie teams and small brands.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
