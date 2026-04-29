import { Sparkles } from "lucide-react";
import { LandingShortenerForm } from "@/components/forms/landing-shortener-form";
import { GlowyWavesBackdrop } from "@/components/ui/glowy-waves-backdrop";

type DashboardHomeHeroProps = {
  displayName: string;
};

const highlightPills = [
  "Create links faster",
  "Preview the final URL",
  "Same look as the landing"
] as const;

export function DashboardHomeHero({ displayName }: DashboardHomeHeroProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Home</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Welcome back, {displayName}
        </h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          This dashboard home reuses the same visual language as the landing page so the
          product feels consistent from public site to private workspace.
        </p>
      </div>

      <GlowyWavesBackdrop className="rounded-[2.5rem] border border-white/75 shadow-soft backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-8 lg:px-12 lg:py-14 xl:px-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Private link creation
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[4rem] lg:leading-[0.98]">
            Shorten links fast.
            <br />
            Publish without friction.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Paste a long URL and generate your short link from the private dashboard without
            losing the polished feel of the public landing page.
          </p>

          <div className="mx-auto mt-10 w-full max-w-[960px]">
            <LandingShortenerForm compact isAuthenticated />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {highlightPills.map((pill) => (
              <div
                key={pill}
                className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </GlowyWavesBackdrop>
    </section>
  );
}
