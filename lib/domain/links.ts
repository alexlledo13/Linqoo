export function buildShortLinkUrl(slug: string) {
  const base = (
    process.env.NEXT_PUBLIC_SHORT_LINK_DOMAIN ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
  return slug ? `${base}/${slug}` : base;
}
