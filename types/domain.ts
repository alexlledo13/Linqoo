export type Plan = "free" | "premium";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  plan: Plan;
  created_at: string;
};

export type Link = {
  id: string;
  user_id: string;
  slug: string;
  target_url: string;
  active: boolean;
  ad_enabled: boolean;
  click_count: number;
  created_at: string;
  expires_at: string | null;
};

export type Click = {
  id: string;
  link_id: string;
  created_at: string;
  referrer: string | null;
  country: string | null;
  device: string | null;
  ip_hash: string | null;
};

export type UsageMonthly = {
  id: string;
  user_id: string;
  month: string;
  links_created: number;
  clicks_served: number;
  created_at: string;
};

export type DashboardLink = Pick<
  Link,
  "id" | "slug" | "target_url" | "active" | "ad_enabled" | "click_count" | "created_at" | "expires_at"
>;

export type PickedRedirectLink = Pick<
  Link,
  "slug" | "target_url" | "ad_enabled"
>;
