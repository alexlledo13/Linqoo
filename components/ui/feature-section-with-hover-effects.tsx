import { cn } from "@/lib/utils";
import {
  IconAffiliate,
  IconChartBar,
  IconClick,
  IconClockHour4,
  IconLink,
  IconLock,
  IconRouteAltLeft,
  IconSparkles
} from "@tabler/icons-react";

const features = [
  {
    title: "Shorten links for campaigns",
    description:
      "Turn long campaign URLs into short, clean links that are easier to share across social posts, newsletters and ads.",
    icon: <IconLink className="h-5 w-5" />
  },
  {
    title: "See how many people clicked",
    description:
      "Track how many visits each link receives and build the base for richer analytics as the product evolves.",
    icon: <IconClick className="h-5 w-5" />
  },
  {
    title: "Prepare for deeper insights",
    description:
      "The data model is ready to grow toward referrers, countries, devices and more advanced performance metrics.",
    icon: <IconChartBar className="h-5 w-5" />
  },
  {
    title: "Fast redirect experience",
    description:
      "Keep redirects lightweight and reliable while leaving space for a future interstitial page with monetization.",
    icon: <IconRouteAltLeft className="h-5 w-5" />
  },
  {
    title: "Useful for creators and brands",
    description:
      "Share one consistent link format for videos, bios, launch pages and collaborations without exposing messy URLs.",
    icon: <IconAffiliate className="h-5 w-5" />
  },
  {
    title: "Protected account-based flow",
    description:
      "Visitors can preview the result, but registration unlocks saved links, ownership and access to the private dashboard.",
    icon: <IconLock className="h-5 w-5" />
  },
  {
    title: "Room for premium features",
    description:
      "Limits, custom domains, branded experiences and monetized redirects can be layered on top without reworking the foundation.",
    icon: <IconSparkles className="h-5 w-5" />
  },
  {
    title: "Built to save time later",
    description:
      "A clean schema and modular frontend make it easier to ship analytics, plan upgrades and better reporting over time.",
    icon: <IconClockHour4 className="h-5 w-5" />
  }
];

export function FeaturesSectionWithHoverEffects() {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)] md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

function Feature({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <article
      className={cn(
        "group/feature relative flex flex-col py-8",
        "border-slate-200/70 md:border-r",
        index % 2 === 0 && "md:border-l-0",
        index < 6 && "xl:border-b",
        index % 4 === 0 && "xl:border-l-0"
      )}
    >
      {index < 4 ? (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-brand-50/60 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      ) : (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-sky-50/60 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}

      <div className="relative z-10 mb-4 px-8 text-brand-600">{icon}</div>

      <div className="relative z-10 mb-2 px-8 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 rounded-br-full rounded-tr-full bg-slate-300 transition-all duration-200 origin-center group-hover/feature:h-8 group-hover/feature:bg-brand-500" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>

      <p className="relative z-10 max-w-xs px-8 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}

