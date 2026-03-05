import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityPost } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["post"],
  });
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription ||
    post.excerpt ||
    `Read "${post.title}" on the ${business.shortName} blog.`;

  return {
    title,
    description,
    openGraph: {
      title: title || undefined,
      description,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      ...(post.featuredImage && {
        images: [
          {
            url: urlFor(post.featuredImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
          },
        ],
      }),
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref: string }; alt?: string };
    }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(960).url()}
            alt={value.alt || ""}
            width={960}
            height={540}
            className="rounded-2xl"
          />
          {value.alt && (
            <figcaption className="text-sm text-gray-400 mt-2 text-center">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-black mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-bold mt-8 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 my-8 text-gray-600 italic text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-600 leading-relaxed text-lg mb-6">{children}</p>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="text-blue-600 underline hover:text-blue-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["post"],
  });

  if (!post) notFound();

  // Fetch related posts (same category)
  const relatedPosts = post.category
    ? await sanityFetch<SanityPost[]>({
        query: RELATED_POSTS_QUERY,
        params: { slug, categoryId: post.category.slug?.current || "" },
        tags: ["post"],
      })
    : [];

  // Determine related services to show
  const relatedServiceSlugs = post.relatedServices?.length
    ? post.relatedServices
    : services.slice(0, 3).map((s) => s.slug);
  const relatedServiceData = services.filter((s) =>
    relatedServiceSlugs.includes(s.slug)
  );

  const postUrl = `${business.website}/blog/${slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : {
          "@type": "Organization",
          name: business.name,
          url: business.website,
        },
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: business.website,
    },
    ...(post.featuredImage && {
      image: urlFor(post.featuredImage).width(1200).height(630).url(),
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <SchemaMarkup schema={blogPostingSchema} />

      {/* Hero */}
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>

          {post.category && (
            <span className="inline-block bg-blue-600/20 text-blue-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 border border-blue-500/20">
              {post.category.title}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.author?.name && (
              <>
                <span className="text-gray-600">|</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-8 md:p-12">
            {/* Featured image */}
            {post.featuredImage && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 -mt-2">
                <Image
                  src={urlFor(post.featuredImage)
                    .width(960)
                    .height(540)
                    .url()}
                  alt={post.title || ""}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Portable Text body */}
            {post.body && (
              <div className="prose-custom">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            )}

            {/* Social share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Share This Post
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X / Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Author bio */}
            {post.author?.name && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-5">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image)
                        .width(80)
                        .height(80)
                        .url()}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Written By
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {post.author.name}
                    </p>
                    {post.author.bio && (
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related services CTA */}
          {relatedServiceData.length > 0 && (
            <div className="mt-12">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                Related Services
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedServiceData.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all text-center"
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <span className="font-bold group-hover:text-blue-600 transition-colors text-sm">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                Related Posts
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp._id}
                    href={`/blog/${rp.slug?.current}`}
                    className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-600 transition-all overflow-hidden"
                  >
                    {rp.featuredImage ? (
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={urlFor(rp.featuredImage)
                            .width(400)
                            .height(225)
                            .url()}
                          alt={rp.title || ""}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl text-gray-300">📝</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA card */}
          <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-black mb-3">Need Roofing Work Done?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Get a free estimate from {business.shortName}. Licensed &amp;
              insured across Utah &amp; Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Get Free Estimate
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors"
              >
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
