import type { Metadata } from "next";
import { Faq5 } from "@/components/ui/faq-5";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Pricing2 } from "@/components/ui/pricing2";
import { TestimonialsColumnsSection } from "@/components/ui/testimonials-columns-1";
import { APP_DESCRIPTION, APP_KEYWORDS, APP_NAME } from "@/lib/config/app";

const features = [
  {
    title: "Detailed analytics",
    description:
      "Understand clicks, audience patterns and performance without leaving the dashboard."
  },
  {
    title: "Fast redirects",
    description:
      "Serve links quickly and keep the redirect flow ready for future monetization layers."
  },
  {
    title: "Clean management",
    description:
      "Organize links, monitor active campaigns and keep your workspace simple from day one."
  }
];

const faqs = [
  {
    question: `What is ${APP_NAME}?`,
    answer:
      `${APP_NAME} is a link shortener web app that lets users create short URLs, manage their links from a private dashboard and monitor basic click analytics.`
  },
  {
    question: "Can I shorten links without creating an account?",
    answer:
      "Visitors can generate a short-link preview on the landing page, but an account is required to save, copy and activate the final link."
  },
  {
    question: `Does ${APP_NAME} track clicks?`,
    answer:
      "Yes. The application is prepared to register clicks in Supabase so you can build analytics, traffic insights and plan limits on top of the stored events."
  },
  {
    question: "Is this ready for branded domains and premium plans?",
    answer:
      "Yes. The architecture is already prepared for future monetization features such as premium plans, branded domains and ad-based interstitial redirects."
  }
];

export const metadata: Metadata = {
  title: "URL Shortener for Clean Links and Basic Analytics",
  description:
    "Shorten links, generate short URLs, track clicks and manage your links from one SaaS-style dashboard built with Next.js and Supabase.",
  keywords: APP_KEYWORDS,
  openGraph: {
    title: `${APP_NAME} | URL Shortener for Clean Links and Basic Analytics`,
    description: APP_DESCRIPTION,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | URL Shortener`,
    description: APP_DESCRIPTION
  }
};

export default async function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A web-based URL shortener with authentication, link management and basic analytics.",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free"
      }
    ],
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <div className="pb-24 pt-0 xl:pb-28">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <GlowyWavesHero isAuthenticated={false} />

      <section className="space-y-16 pt-20 xl:pt-24">
        <div className="space-y-4 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Core platform
          </p>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Powerful features for every link
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Everything you need to manage links and prepare the product for
            analytics, premium limits and future monetization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative rounded-[2rem] border border-slate-200/70 p-[1px] shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
            >
              <GlowingEffect
                blur={0}
                borderWidth={2}
                className="rounded-[2rem]"
                disabled={false}
                glow={false}
                inactiveZone={0.05}
                proximity={90}
                spread={32}
              />
              <div className="relative h-full rounded-[calc(2rem-1px)] bg-white px-6 py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <span className="font-heading text-lg font-semibold">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10 pt-20 xl:pt-24">
        <div className="space-y-4 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">
            Use cases
          </p>
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Where short links fit in your workflow
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Use {APP_NAME} to shorten links, understand how many people enter each
            URL and prepare the platform for deeper audience insights over time.
          </p>
        </div>

        <FeaturesSectionWithHoverEffects />
      </section>

      <section className="pt-20 xl:pt-24">
        <Pricing2 />
      </section>

      <section className="pt-20 xl:pt-24">
        <TestimonialsColumnsSection />
      </section>

      <section className="pt-20 xl:pt-24">
        <Faq5
          badge="FAQ"
          description="Find out how Linqo works, why registration matters, how click counts are stored and why the analytics foundation is ready to expand over time."
          faqs={faqs}
          heading="Frequently asked questions about shortening links"
        />
      </section>
    </div>
  );
}
