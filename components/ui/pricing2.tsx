"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyNote?: string;
  badge?: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const defaultPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "A lightweight plan for trying Linqo and managing a small set of links.",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    yearlyNote: "Free forever",
    features: [
      { text: "Up to 25 new short links per month" },
      { text: "Basic dashboard and link management" },
      { text: "Standard redirect speed" },
      { text: "Basic click tracking" }
    ],
    button: {
      text: "Start for free",
      url: "/register"
    }
  },
  {
    id: "pro",
    name: "Pro",
    description: "For creators, brands and teams that need unlimited link capacity and more control.",
    monthlyPrice: "$10",
    yearlyPrice: "$10",
    yearlyNote: "Simple launch pricing",
    badge: "Most popular",
    features: [
      { text: "Unlimited short links" },
      { text: "Everything in Free, with higher usage" },
      { text: "Advanced analytics and reporting" },
      { text: "Custom domains and priority support" }
    ],
    button: {
      text: "Join Pro waitlist",
      url: "/register"
    }
  }
];

function getAnnualBill(price: string) {
  const numericPrice = Number(price.replace("$", ""));
  return `$${numericPrice * 12}`;
}

export function Pricing2({
  heading = "Simple pricing that can grow with your product",
  description = "Use the free plan for a small monthly volume, then upgrade when you need unlimited links and deeper analytics.",
  plans = defaultPlans
}: Pricing2Props) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="px-2 py-2 sm:px-0">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Pricing
          </p>
          <h2 className="text-balance font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <span className={!isYearly ? "text-slate-950" : "text-slate-500"}>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={isYearly ? "text-slate-950" : "text-slate-500"}>Yearly</span>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const shownPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const hasDifferentYearlyPrice = plan.yearlyPrice !== plan.monthlyPrice;
            const billedText =
              shownPrice === "$0"
                ? plan.yearlyNote ?? "Free forever"
                : !hasDifferentYearlyPrice
                  ? plan.yearlyNote ?? "Simple pricing"
                  : isYearly
                  ? `${getAnnualBill(plan.yearlyPrice)} billed annually`
                  : `${getAnnualBill(plan.monthlyPrice)} yearly equivalent`;

            return (
              <Card
                key={plan.id}
                className={`flex h-full flex-col justify-between border-slate-200/80 p-0 text-left ${
                  plan.badge ? "ring-2 ring-brand-100" : ""
                }`}
              >
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription className="mt-3">{plan.description}</CardDescription>
                    </div>
                    {plan.badge ? (
                      <span className="rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-8">
                    <div className="flex items-end gap-2">
                      <span className="font-heading text-5xl font-semibold text-slate-950">
                        {shownPrice}
                      </span>
                      <span className="pb-2 text-sm text-slate-500">
                        {shownPrice === "$0" ? "" : "/ month"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{billedText}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <Separator className="mb-6" />
                  {plan.id === "pro" ? (
                    <p className="mb-4 text-sm font-semibold text-slate-900">
                      Everything in Free, plus:
                    </p>
                  ) : null}
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3 text-sm text-slate-700">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto p-8 pt-0">
                  <Button
                    asChild
                    className="w-full justify-center gap-2"
                    variant={plan.id === "pro" ? "brand" : "outline"}
                  >
                    <a href={plan.button.url}>
                      {plan.button.text}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
