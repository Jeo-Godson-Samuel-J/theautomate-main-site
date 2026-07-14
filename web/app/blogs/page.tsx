export const revalidate = 60; // ISR – refresh every 60 seconds

import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity.client";

/* -----------------------------
   TYPES
----------------------------- */

interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  readingTime?: number;
  excerpt: string;
  coverImage?: SanityImage;
  contentImage?: SanityImage;
}

/* -----------------------------
   GROQ QUERY
----------------------------- */

const BLOGS_QUERY = `
*[
  _type == "blog" &&
  defined(slug.current)
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  readingTime,
  excerpt,
  coverImage,
  "contentImage": content[_type == "image"][0]
}
`;

/* -----------------------------
   PAGE
----------------------------- */

export default async function BlogsPage() {
  const blogs: Blog[] = await client.fetch(
    BLOGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <main className="bg-white min-h-screen px-6 py-16 max-w-7xl mx-auto">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-8xl md:text-8xl font-bold tracking-tight">
          Our Resources & <span className="text-brand-blue">Blogs</span>
        </h1>
        <p className="max-w-4xl mx-auto mt-4 text-lg md:text-xl leading-9 text-gray-600">
          Discover valuable insights and resources to boost your learning
          <span className="block">
            and career growth on the BrightMind blog.
          </span>
        </p>
      </div>

      {/* EMPTY STATE */}
      {blogs.length === 0 && (
        <p className="text-center text-gray-500">No blogs published yet.</p>
      )}

      {/* GRID */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {blogs.map((blog) => {
          const displayImage = blog.coverImage || blog.contentImage;

          return (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug.current}`}
              className="group block"
            >
              <article className="relative bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] flex flex-col h-full">
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
                    Blog
                  </span>
                </div>

                <div className="px-6 py-8 flex flex-col gap-5 flex-1">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-brand-blue">
                    {blog.title}
                  </h2>

                  <div className="text-sm text-gray-500 space-x-2">
                    <span>
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{blog.readingTime ?? 5} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
