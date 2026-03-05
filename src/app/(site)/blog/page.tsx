import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POSTS_PAGINATED_QUERY, POSTS_COUNT_QUERY } from "@/sanity/lib/queries";
import type { SanityPost } from "@/sanity/types";

const POSTS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "Blog — Tips, News & Project Updates",
  description: `Read the latest from ${business.shortName}. Tips on roofing, storm damage, and industry news for Utah & Texas homeowners.`,
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const [posts, totalCount] = await Promise.all([
    sanityFetch<SanityPost[]>({
      query: POSTS_PAGINATED_QUERY,
      params: { start, end },
      tags: ["post"],
    }),
    sanityFetch<number>({
      query: POSTS_COUNT_QUERY,
      tags: ["post"],
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / POSTS_PER_PAGE));

  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Tips, News &amp; Updates
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Project spotlights, industry tips, and company news from{" "}
            {business.shortName}.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug?.current}`}
                    className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-1 overflow-hidden"
                  >
                    {post.featuredImage ? (
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={urlFor(post.featuredImage)
                            .width(640)
                            .height(360)
                            .url()}
                          alt={post.title || ""}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl text-gray-300">📝</span>
                      </div>
                    )}
                    <div className="p-6">
                      {post.category && (
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          {post.category.title}
                        </span>
                      )}
                      <h2 className="text-xl font-bold mt-1 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <p className="text-xs text-gray-400 mt-4">
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Blog pagination">
                  {currentPage > 1 && (
                    <Link
                      href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-sm"
                    >
                      Previous
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={page === 1 ? "/blog" : `/blog?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                        page === currentPage
                          ? "bg-blue-600 text-white"
                          : "border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-sm"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-6 block">📝</span>
              <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
              <p className="text-gray-500">
                Check back soon — we&apos;re working on some great content.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
