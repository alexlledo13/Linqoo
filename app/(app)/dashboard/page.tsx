import { DashboardHomeHero } from "@/components/dashboard/dashboard-home-hero";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard/data";
import { buildShortLinkUrl } from "@/lib/domain/links";

export default async function DashboardPage() {
  const { email, fullName, linksCount, monthlyClicks, monthlyLinks, plan } =
    await getDashboardData();

  const displayName = fullName?.trim() || email.split("@")[0] || "there";
  const formattedPlan = plan === "premium" ? "Pro" : "Free";

  return (
    <DashboardShell
      currentPath="/dashboard"
      email={email}
      linksCount={linksCount}
      monthlyClicks={monthlyClicks}
      plan={plan}
    >
      <div className="space-y-6">
        <DashboardHomeHero displayName={displayName} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Plan" value={formattedPlan} />
          <MetricCard label="Links" value={String(linksCount)} />
          <MetricCard label="Clicks" value={String(monthlyClicks)} />
          <MetricCard label="This month" value={String(monthlyLinks)} />
        </div>

        <Card className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            Short domain
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950">
            {buildShortLinkUrl("")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            This block works well below the hero to keep the base short domain visible while
            users create and manage links.
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </Card>
  );
}
