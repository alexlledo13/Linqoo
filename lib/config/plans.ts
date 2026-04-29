import { env } from "@/lib/config/env";
import { Plan } from "@/types/domain";

type PlanLimits = {
  linksPerMonth: number;
  clicksPerMonth: number;
};

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    linksPerMonth: env.FREE_PLAN_LINK_LIMIT,
    clicksPerMonth: env.FREE_PLAN_CLICK_LIMIT
  },
  premium: {
    linksPerMonth: 10000,
    clicksPerMonth: 1000000
  }
};

export function getPlanLimits(plan: Plan): PlanLimits {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

