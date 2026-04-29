import { PickedRedirectLink } from "@/types/domain";

export function getNextRedirectTarget(link: PickedRedirectLink) {
  if (link.ad_enabled) {
    // TODO: Route through an interstitial page before redirecting.
    return link.target_url;
  }

  return link.target_url;
}

