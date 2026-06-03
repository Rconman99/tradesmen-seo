import Image from "next/image";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { GALLERY_QUERY } from "@/sanity/lib/queries";
import type { SanityGalleryImage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: `Browse completed projects from ${business.shortName}. See our excavation, site prep, and concrete work across King & Pierce County, Washington.`,
};

export default async function GalleryPage() {
  const images = await sanityFetch<SanityGalleryImage[]>({
    query: GALLERY_QUERY,
    tags: ["galleryImage"],
  });

  // Build unique service filter options from actual data
  const serviceFilters = services
    .filter((s) => images.some((img) => img.service === s.slug))
    .map((s) => ({ slug: s.slug, name: s.shortName }));

  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Our Work
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Project Gallery
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Browse our completed excavation and concrete projects across King and Pierce County.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {images.length > 0 ? (
            <>
              {/* Service type filter pills (static — shows all, filters via CSS would need client component) */}
              {serviceFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    All Projects
                  </span>
                  {serviceFilters.map((s) => (
                    <span
                      key={s.slug}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bold"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-100 hover:border-blue-600 transition-all"
                  >
                    {img.image && (
                      <Image
                        src={urlFor(img.image).width(640).height(480).url()}
                        alt={img.alt || "Project photo"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        {img.caption && (
                          <p className="text-white font-bold text-sm">
                            {img.caption}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {img.service && (
                            <span className="text-xs text-blue-300 bg-blue-600/30 px-2 py-0.5 rounded-full">
                              {services.find((s) => s.slug === img.service)
                                ?.shortName || img.service}
                            </span>
                          )}
                          {img.city && (
                            <span className="text-xs text-gray-300">
                              {img.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-6 block">📷</span>
              <h2 className="text-2xl font-bold mb-2">Gallery Coming Soon</h2>
              <p className="text-gray-500">
                We&apos;re adding photos of our completed projects. Check back
                soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
