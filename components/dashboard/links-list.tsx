import { Card } from "@/components/ui/card";
import { buildShortLinkUrl } from "@/lib/domain/links";
import { formatDate } from "@/lib/utils/date";
import { DashboardLink } from "@/types/domain";

type LinksListProps = {
  links: DashboardLink[];
};

export function LinksList({ links }: LinksListProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(239,246,255,0.8))] px-6 py-5">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
          Library
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-950">
          Your links
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Review your published short URLs, destination pages and current status from one place.
        </p>
      </div>
      <div className="divide-y divide-slate-200">
        {links.map((link) => (
          <div
            key={link.id}
            className="grid gap-4 px-6 py-5 transition hover:bg-white/55 md:grid-cols-[minmax(0,1fr)_auto_auto]"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-brand-700">
                {buildShortLinkUrl(link.slug)}
              </p>
              <p className="mt-1 truncate text-sm text-slate-600">{link.target_url}</p>
            </div>
            <div className="text-sm text-slate-500">
              <p>{link.click_count} clicks</p>
              <p className="mt-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  {link.active ? "Active" : "Paused"}
                </span>
              </p>
            </div>
            <div className="text-sm text-slate-500 md:text-right">
              <p>{formatDate(link.created_at)}</p>
              <p className="mt-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  {link.ad_enabled ? "Ads ready" : "Direct redirect"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
