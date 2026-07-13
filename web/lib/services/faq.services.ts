import { client } from "@/lib/sanity.client";
import { FAQS_QUERY } from "../queries/faqs";
import type { FAQ } from "../types/faq";

export async function getFAQs(category: string): Promise<FAQ[]> {
  try {
    const results = await client.fetch<FAQ[]>(FAQS_QUERY, { category });
    return results ?? [];
  } catch (err: unknown) {
    // Log the full Sanity error so status code, response body, and message are visible
    const error = err as {
      statusCode?: number;
      responseBody?: string;
      message?: string;
    };
    console.error("[getFAQs] Sanity request failed", {
      category,
      statusCode: error?.statusCode,
      message: error?.message,
      responseBody: error?.responseBody,
    });
    // Re-throw so the caller (Server Component) can decide how to handle it
    throw err;
  }
}