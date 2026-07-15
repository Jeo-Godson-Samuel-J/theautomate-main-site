import { NextResponse } from "next/server";
import { getPlans } from "@/lib/services/plan.services";

export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans, { status: 200 });
  } catch (error: any) {
    console.error("Failed to load plans", error);
    return NextResponse.json(
      { error: "Failed to load plans" },
      { status: 500 },
    );
  }
}
