"use client";

import { Suspense } from "react";
import { LandingShortenerFormContent } from "./landing-shortener-form-content";

type LandingShortenerFormProps = {
  isAuthenticated: boolean;
  compact?: boolean;
};

export function LandingShortenerForm(props: LandingShortenerFormProps) {
  return (
    <Suspense>
      <LandingShortenerFormContent {...props} />
    </Suspense>
  );
}
