"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    text:
      "Linqo helped us clean up campaign links across paid social and newsletters. The shorter URLs look better and make reporting much easier.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    name: "Maya Collins",
    role: "Growth Marketing Lead"
  },
  {
    text:
      "The preview-first flow is a smart touch. Visitors can test the product instantly, and our team can still gate ownership behind signup.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    name: "Daniel Brooks",
    role: "Product Manager"
  },
  {
    text:
      "We wanted a lightweight way to share links for launches and creator campaigns. Linqo gave us something simple, fast and easy to trust.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
    name: "Sofia Ramirez",
    role: "Brand Partnerships Manager"
  },
  {
    text:
      "The dashboard keeps link management focused instead of bloated. It already covers the basics we need while leaving room for deeper analytics.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    name: "Marcus Reed",
    role: "Operations Director"
  },
  {
    text:
      "Our creators needed something they could understand in seconds. The interface feels polished, and the short-link flow reduces friction right away.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=80",
    name: "Nina Patel",
    role: "Creator Success Lead"
  },
  {
    text:
      "What stood out was how ready the platform feels for the next layer. Click tracking is in place now, but it is clearly built to grow with us.",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=160&q=80",
    name: "Ethan Walker",
    role: "Startup Founder"
  },
  {
    text:
      "We replaced messy spreadsheet workflows with one clean place to manage branded campaign links. It is a much calmer setup for the team.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    name: "Alicia Gomez",
    role: "Marketing Consultant"
  },
  {
    text:
      "Even before premium features launch, the product feels production-minded. The redirect speed and overall clarity make a strong first impression.",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=160&q=80",
    name: "Jonas Meyer",
    role: "Technical Advisor"
  },
  {
    text:
      "For a young SaaS, Linqo already solves a real workflow problem. We can shorten, share and organize links without forcing people through complexity.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    name: "Claire Bennett",
    role: "Community Manager"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {Array.from({ length: 2 }).map((_, columnIndex) => (
          <React.Fragment key={columnIndex}>
            {testimonials.map(({ text, image, name, role }) => (
              <article
                key={`${name}-${columnIndex}`}
                className="max-w-xs rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur"
              >
                <p className="text-sm leading-7 text-slate-600">{text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    alt={name}
                    className="h-11 w-11 rounded-full object-cover"
                    height={44}
                    src={image}
                    width={44}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 text-slate-950">
                      {name}
                    </span>
                    <span className="text-sm leading-5 text-slate-500">{role}</span>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsColumnsSection() {
  return (
    <section className="relative overflow-hidden px-2 py-2 sm:px-0">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700">
            Testimonials
          </div>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Teams already see the value in cleaner link workflows
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            From campaign managers to creators, Linqo helps people shorten URLs,
            keep sharing tidy and prepare for better analytics over time.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] max-h-[720px]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            className={cn("hidden md:block")}
            duration={19}
            testimonials={secondColumn}
          />
          <TestimonialsColumn
            className={cn("hidden lg:block")}
            duration={17}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </section>
  );
}
