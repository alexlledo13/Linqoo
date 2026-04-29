"use client";

import { Suspense } from "react";
import { NewLinkFormContent } from "./new-link-form-content";

export function NewLinkForm() {
  return (
    <Suspense>
      <NewLinkFormContent />
    </Suspense>
  );
}
