import { Badge } from "@/components/ui/badge";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is Linqo?",
    answer:
      "Linqo is a web-based link shortener that lets users create clean short URLs, manage them from a dashboard and prepare the product for analytics and monetization."
  },
  {
    question: "Can I shorten links without creating an account?",
    answer:
      "Visitors can generate a preview on the landing page, but creating an account is required to save, copy and activate the final short link."
  },
  {
    question: "Can I see how many people entered a link?",
    answer:
      "Yes. The platform is prepared to store click events so you can see how many visits each link receives and expand reporting later."
  },
  {
    question: "Will there be more analytics in the future?",
    answer:
      "Yes. The current structure is designed to grow into richer analytics such as referrers, countries, devices and other traffic insights."
  }
];

export function Faq5({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Find out how Linqo works, what the short-link flow looks like and how the analytics foundation can grow over time.",
  faqs = defaultFaqs
}: Faq5Props) {
  return (
    <section className="px-2 py-2 sm:px-0">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge className="text-[11px] font-bold uppercase tracking-[0.2em]" variant="secondary">
            {badge}
          </Badge>
          <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="mb-8 flex gap-4 rounded-[1.5rem] border border-slate-200/60 bg-slate-50/60 px-5 py-5 last:mb-0"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-50 font-mono text-xs font-semibold text-brand-700">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-heading text-xl font-semibold text-slate-950">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
