import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
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

  return {
    title: post.title,
    description:
      post.excerpt ||
      `Read "${post.title}" on the ${business.shortName} blog.`,
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

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
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
      "@id": `${business.website}/blog/${slug}`,
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
          {post.publishedAt && (
            <p className="text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
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
          </div>

          {/* CTA card */}
          <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-black mb-3">Need Concrete Work Done?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Get a free estimate from {business.shortName}. Licensed &amp;
              insured across Eastern WA &amp; Northern ID.
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
