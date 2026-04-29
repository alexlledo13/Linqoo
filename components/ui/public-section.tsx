import { Card } from "@/components/ui/card";

export function PublicSection({ title }: { title: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm leading-7 text-slate-700">{title}</p>
    </Card>
  );
}

