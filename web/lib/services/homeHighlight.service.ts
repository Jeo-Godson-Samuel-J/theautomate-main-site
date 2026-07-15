import { client } from "@/lib/sanity.client";
import { HOME_HIGHLIGHT_QUERY } from "@/lib/queries/homeHighlight";
import type { HomeHighlight } from "@/lib/types/homeHighlight";

export async function getHomeHighlight(): Promise<HomeHighlight> {

    return client.fetch(HOME_HIGHLIGHT_QUERY);

}