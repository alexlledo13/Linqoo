import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { getDashboardData } from "@/lib/dashboard/data";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "A lightweight workspace for validating the product and sharing a few links.",
    features: ["25 links per month", "Basic click tracking", "Simple redirect management"]
  },
  {
    id: "premium",
    name: "Pro",
    price: "$10/mo",
    description: "For creators and small teams who want more volume and room to grow.",
    features: ["Unlimited links", "Priority support", "Ready for branded-domain expansion"]
  }
] as const;

export default async function DashboardPricingPage() {
  const { email, linksCount, monthlyClicks, plan } = await getDashboardData();

  return (
    <DashboardShell
      currentPath="/dashboard/pricing"
      email={email}
      linksCount={linksCount}
      monthlyClicks={monthlyClicks}
      plan={plan}
    >
      <section className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">Pricing</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Plans for the next stage of Linqoo
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            This view reinforces the SaaS positioning of the product and prepares a clearer
            path for future monetization.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {pricingPlans.map((pricingPlan) => {
            const isCurrentPlan = pricingPlan.id === plan;

            return (
              <Card
                key={pricingPlan.id}
                className={cn(
                  "p-6",
                  isCurrentPlan &&
                    "border-brand-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.88))]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                      {pricingPlan.name}
                    </p>
                    <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950">
                      {pricingPlan.price}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                      {pricingPlan.description}
                    </p>
                  </div>
                  {isCurrentPlan ? (
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                      Current plan
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 space-y-3">
                  {pricingPlan.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </DashboardShell>
  );
}
