import { client } from "@/lib/sanity.client";
import { HOME_ABOUT_QUERY } from "@/lib/queries/homeAbout";
import type { HomeAbout } from "@/lib/types/homeAbout";

export async function getHomeAbout(): Promise<HomeAbout | null> {
  try {
    const data = await client.fetch<HomeAbout | null>(HOME_ABOUT_QUERY);
    return data ?? null;
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string };
    console.error("[getHomeAbout] Sanity request failed", {
      statusCode: error?.statusCode,
      message: error?.message,
    });
    return null;
  }
}
