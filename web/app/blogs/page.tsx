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
    { next: { revalidate: 60 } }
  );

  return (
    <main className="bg-white min-h-screen px-6 py-16 max-w-7xl mx-auto">
      {/* TITLE */}
      <h1 className="text-4xl font-bold md:mt-12 mb-12 text-center">
        Latest Blogs
      </h1>

      {/* EMPTY STATE */}
      {blogs.length === 0 && (
        <p className="text-center text-gray-500">
          No blogs published yet.
        </p>
      )}

      {/* GRID */}
      <div
        className="
          grid gap-10
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {blogs.map((blog) => {
          // Determine which image to show: coverImage > contentImage (first inline image)
          const displayImage = blog.coverImage || blog.contentImage;

          return (
            <article
              key={blog._id}
              className="
                bg-white rounded-xl overflow-hidden
                border border-gray-200
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
                flex flex-col
              "
            >
              {/* IMAGE */}
              {displayImage && (
                <Image
                  src={urlFor(displayImage)
                    .width(600)
                    .height(350)
                    .fit("crop")
                    .url()}
                  alt={blog.title}
                  width={600}
                  height={350}
                  className="w-full h-56 object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-6 flex flex-col grow">
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blogs/${blog.slug.current}`}
                  className="
                    mt-auto
                    text-blue-600 font-medium
                    hover:text-blue-800
                    transition-colors
                  "
                >
                  Read More →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
