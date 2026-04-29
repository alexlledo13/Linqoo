import { EmptyLinksState } from "@/components/dashboard/empty-links-state";
import { LinksList } from "@/components/dashboard/links-list";
import { NewLinkForm } from "@/components/forms/new-link-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getDashboardData } from "@/lib/dashboard/data";

export default async function DashboardLinksPage() {
  const { email, links, linksCount, monthlyClicks, plan } = await getDashboardData();

  return (
    <DashboardShell
      currentPath="/dashboard/links"
      email={email}
      linksCount={linksCount}
      monthlyClicks={monthlyClicks}
      plan={plan}
    >
      <section className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Links</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Create and manage your links
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            Use this area to publish new short URLs and review every link that is already
            active in your account.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <NewLinkForm />
          {links.length > 0 ? <LinksList links={links} /> : <EmptyLinksState />}
        </div>
      </section>
    </DashboardShell>
  );
}
