"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buildShortLinkUrl } from "@/lib/domain/links";

export function NewLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [targetUrl, setTargetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  useEffect(() => {
    const queuedTargetUrl = searchParams.get("targetUrl");

    if (queuedTargetUrl) {
      setTargetUrl(queuedTargetUrl);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setCreatedSlug(null);

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

    setTargetUrl("");
    setCreatedSlug(payload.data?.slug ?? null);
    setIsLoading(false);
    router.replace("/dashboard/links");
    router.refresh();
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.8))] px-6 py-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          Create link
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-950">
          Shorten a new URL
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          Paste a destination URL and publish a clean short link. The slug is generated
          automatically and stored with analytics-ready metadata.
        </p>
      </div>

      <div className="px-6 py-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Destination URL"
            onChange={(event) => setTargetUrl(event.target.value)}
            placeholder="https://example.com/some/long/path"
            required
            type="url"
            value={targetUrl}
          />

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/70 px-4 py-4 text-sm text-slate-600">
            Your short domain preview will use <span className="font-medium text-slate-950">{buildShortLinkUrl("")}</span>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {createdSlug ? (
            <p className="text-sm text-emerald-700">
              Link created successfully: {buildShortLinkUrl(createdSlug)}
            </p>
          ) : null}

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Creating..." : "Create short link"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
