import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity.client";
import { LATEST_BLOGS_QUERY } from "@/lib/queries";

const BLOG_CATEGORY_LABEL = "Blog";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  readingTime?: number;
  excerpt: string;
  coverImage?: any;
  contentImage?: any;
}

function formatPublishDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Blog() {
  const blogs: Blog[] = await client.fetch(
    LATEST_BLOGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <section className="py-16 md:py-20 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Our Resources & <span className="text-brand-blue">Blogs</span>
        </h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-500 leading-7 mb-12">
          Discover valuable insights and resources to boost your learning and
          career growth on the BrightMind blog.
        </p>

        {blogs.length === 0 ? (
          <p className="text-gray-500">
            No blog posts available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {blogs.map((blog) => {
              const displayImage = blog.coverImage || blog.contentImage;

              return (
                <article
                  key={blog._id}
                  className="group relative bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative">
                    {displayImage ? (
                      <Image
                        src={urlFor(displayImage)
                          .width(900)
                          .height(600)
                          .fit("crop")
                          .url()}
                        alt={blog.title}
                        width={900}
                        height={600}
                        className="w-full h-72 md:h-80 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 md:h-80 bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-slate-900 shadow-sm">
                      {BLOG_CATEGORY_LABEL}
                    </span>
                  </div>

                  <div className="px-6 py-8 flex flex-col gap-5 flex-1">
                    <h3 className="text-2xl md:text-2xl font-semibold tracking-tight text-slate-900 line-clamp-2">
                      {blog.title}
                    </h3>

                    <div className="text-sm text-gray-500 space-x-2">
                      <span>{formatPublishDate(blog.publishedAt)}</span>
                      <span>•</span>
                      <span>{blog.readingTime ?? 5} min read</span>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-brand-blue transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
