import { Plan } from "@/lib/types/plan";

export function getPlanDisplayName(
  plan: Pick<Plan, "title" | "badge">,
): string {
  return plan.badge.toLowerCase() === "premium" ? "Live Sessions" : plan.title;
}

export function getPlanDisplayNameFromTitle(title: string): string {
  return title.toLowerCase().startsWith("premium") ? "Live Sessions" : title;
}
