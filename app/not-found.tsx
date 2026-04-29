import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-slate-950">
        This route does not exist.
      </h1>
      <p className="mt-3 text-base text-slate-600">
        The short link or page you tried to open is not available.
      </p>
      <Link
        className="mt-8 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
}

