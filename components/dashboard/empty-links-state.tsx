import { Card } from "@/components/ui/card";

export function EmptyLinksState() {
  return (
    <Card className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
        No links yet
      </div>
      <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-slate-950">
        Your first short link starts here
      </h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
        Publish your first link from the form and it will appear here with its short URL,
        destination and click totals.
      </p>
    </Card>
  );
}
