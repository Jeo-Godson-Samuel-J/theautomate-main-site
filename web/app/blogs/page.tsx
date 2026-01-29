import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";

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
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source);

const BLOGS_QUERY = `
*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  coverImage
}
`;

export default async function BlogsPage() {
  const blogs: Blog[] = await client.fetch(BLOGS_QUERY);

  return (
    <main className="bg-white min-h-screen px-6 py-16 max-w-7xl mx-auto">

      {/* TITLE */}
      <h1 className="text-4xl font-bold md:mt-12 mb-8 text-center">
        Latest Blogs
      </h1>

      {/* GRID */}
      <div className="
        grid gap-10
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      ">
        {blogs.map((blog) => (
          <div
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
            {blog.coverImage && (
              <Image
                src={urlFor(blog.coverImage).width(600).height(350).url()}
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
          </div>
        ))}
      </div>

    </main>
  );
}
