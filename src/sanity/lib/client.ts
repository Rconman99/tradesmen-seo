import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Check if Sanity is configured with a real project ID
const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  if (!client) {
    return [] as unknown as T;
  }

  return client.fetch(query, params, {
    cache: "force-cache",
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
