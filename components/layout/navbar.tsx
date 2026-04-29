"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/config/app";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl ${
        isDashboard ? "mb-6" : "mb-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1720px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <Link className="font-heading text-xl font-semibold tracking-tight" href="/">
          {APP_NAME}
        </Link>
        {isDashboard ? null : (
          <nav className="flex items-center gap-3">
            <>
              <Link
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:border-slate-300"
                href="/register"
              >
                Get started
              </Link>
            </>
          </nav>
        )}
      </div>
    </header>
  );
}
