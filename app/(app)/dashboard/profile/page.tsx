import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { buildShortLinkUrl } from "@/lib/domain/links";
import { getDashboardData } from "@/lib/dashboard/data";
import { formatDate } from "@/lib/utils/date";

export default async function DashboardProfilePage() {
  const { createdAt, email, fullName, linksCount, monthlyClicks, plan } =
    await getDashboardData();

  const displayName = fullName?.trim() || email.split("@")[0] || "there";
  const formattedPlan = plan === "premium" ? "Pro" : "Free";

  return (
    <DashboardShell
      currentPath="/dashboard/profile"
      email={email}
      linksCount={linksCount}
      monthlyClicks={monthlyClicks}
      plan={plan}
    >
      <section className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Profile</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Account details at a glance
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            A simple view for identity, current plan details and core workspace information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                  Account
                </p>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-slate-950">
                  {displayName}
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  Signed in as {email}. This section can later grow into a fuller settings
                  and billing area.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ProfileItem label="Email" value={email} />
                <ProfileItem label="Member since" value={formatDate(createdAt)} />
                <ProfileItem label="Current plan" value={formattedPlan} />
                <ProfileItem label="Short domain" value={buildShortLinkUrl("")} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                  Workspace notes
                </p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-950">
                  Good next additions
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  If you keep evolving the product, the most natural next section would be
                  Analytics.
                </p>
              </div>

              <div className="space-y-3">
                <NoteItem text="Analytics would fit naturally between Links and Pricing." />
                <NoteItem text="Profile can grow into Settings plus Billing without breaking the structure." />
                <NoteItem text="Separate routes make the panel feel more like a product and less like a landing page." />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </DashboardShell>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 break-all text-sm font-medium text-slate-950">{value}</p>
    </div>
  );
}

function NoteItem({ text }: { text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700">
      {text}
    </div>
  );
}
