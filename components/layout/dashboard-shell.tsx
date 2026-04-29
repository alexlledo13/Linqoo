import Link from "next/link";
import { ReactNode } from "react";
import { CreditCard, Home, Link2, UserCircle2 } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  currentPath: string;
  email: string;
  linksCount: number;
  monthlyClicks: number;
  plan: string;
};

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/links", label: "Links", icon: Link2 },
  { href: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle2 }
] as const;

export function DashboardShell({
  children,
  currentPath,
  email,
  linksCount,
  monthlyClicks,
  plan
}: DashboardShellProps) {
  const formattedPlan = plan === "premium" ? "Pro" : "Free";

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-24 xl:self-start">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.78))] px-5 py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-600">
                Workspace
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-slate-950">
                Linqoo
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A cleaner control panel for building, tracking and organizing your short links.
              </p>
            </div>

            <div className="space-y-6 px-5 py-5">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;

                  return (
                    <Link
                      key={item.label}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        isActive
                          ? "border-brand-200 bg-brand-50/80 text-slate-950"
                          : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/80 hover:text-slate-950"
                      )}
                      href={item.href}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          isActive ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                  Current plan
                </p>
                <p className="mt-3 font-heading text-3xl font-semibold text-slate-950">
                  {formattedPlan}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {linksCount} links published and {monthlyClicks} clicks served this month.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-950 px-4 py-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Signed in
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-100">{email}</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </Card>
        </aside>

        <div className="space-y-8">{children}</div>
    </div>
  );
}
