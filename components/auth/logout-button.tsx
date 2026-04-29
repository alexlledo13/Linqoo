"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    const response = await fetch("/api/auth/logout", {
      method: "POST"
    });

    setIsLoading(false);

    if (!response.ok) {
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <button
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
      disabled={isLoading}
      onClick={handleLogout}
      type="button"
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </button>
  );
}

