import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Sans } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/config/app";
import { cn } from "@/lib/utils";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          headingFont.variable,
          bodyFont.variable,
          "font-body text-slate-950 antialiased"
        )}
      >
        <div className="relative min-h-screen">
          <Navbar />
          <main className="mx-auto w-full max-w-[1720px] px-4 pb-16 pt-0 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
