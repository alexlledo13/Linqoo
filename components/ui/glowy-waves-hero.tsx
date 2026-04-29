"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Link2, Sparkles, Zap } from "lucide-react";
import { LandingShortenerForm } from "@/components/forms/landing-shortener-form";
import { GlowyWavesBackdrop } from "@/components/ui/glowy-waves-backdrop";

type GlowyWavesHeroProps = {
  isAuthenticated: boolean;
};

const highlightPills = [
  "Clean short links",
  "Preview before signup",
  "Analytics-ready"
] as const;

const heroStats = [
  { label: "Free plan", value: "25 links/mo" },
  { label: "Pro plan", value: "Unlimited" },
  { label: "Starting at", value: "$10/mo" }
] as const;

export function GlowyWavesHero({ isAuthenticated }: GlowyWavesHeroProps) {
  return (
    <GlowyWavesBackdrop className="relative isolate left-1/2 w-screen -translate-x-1/2">
      <div className="relative mx-auto flex min-h-[760px] max-w-6xl flex-col items-center px-5 py-12 text-center sm:px-8 lg:px-12 lg:py-16 xl:min-h-[82vh] xl:px-16 xl:py-20">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Smart link shortening for creators and teams
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl font-heading text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-[4.35rem] lg:leading-[0.96] xl:text-[5rem]">
            Shorten links fast.
            <br />
            Track what matters.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Paste any long URL, preview the short version instantly and turn that
            intent into signup only when the user wants to keep the link.
          </p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 32 }}
            transition={{ delay: 0.12, duration: 0.75, ease: "easeOut" }}
            className="mx-auto mt-10 w-full max-w-[960px]"
          >
            <LandingShortenerForm compact isAuthenticated={isAuthenticated} />
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {highlightPills.map((pill) => (
              <div
                key={pill}
                className="rounded-full border border-white/75 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur"
              >
                {pill}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              href={isAuthenticated ? "/dashboard" : "/register"}
            >
              {isAuthenticated ? "Open dashboard" : "Create free account"}
            </Link>
            <Link
              className="rounded-full border border-slate-200 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="/login"
            >
              Sign in
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/75 bg-white/65 px-4 py-4 backdrop-blur"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                  {stat.label}
                </div>
                <div className="mt-2 font-heading text-3xl font-semibold text-slate-950">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#f6d9c9] text-slate-800">
                <Link2 className="h-4 w-4" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#e9dcff] text-slate-800">
                <Zap className="h-4 w-4" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#d9f3ea] text-slate-800">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <p>Built for clean sharing, better conversion flows and future analytics.</p>
          </div>
        </motion.div>
      </div>
    </GlowyWavesBackdrop>
  );
}
