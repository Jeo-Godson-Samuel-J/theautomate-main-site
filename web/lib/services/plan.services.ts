import { client } from "@/lib/sanity.client";
import { PLANS_QUERY } from "@/lib/queries/plan";
import { Plan } from "@/lib/types/plan";

export async function getPlans(): Promise<Plan[]> {
    return await client.fetch<Plan[]>(PLANS_QUERY);
}