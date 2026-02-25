import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a stub that produces a placeholder URL
    return {
      width: () => ({ height: () => ({ url: () => "" }), url: () => "" }),
      height: () => ({ url: () => "" }),
      url: () => "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  return builder.image(source);
}
