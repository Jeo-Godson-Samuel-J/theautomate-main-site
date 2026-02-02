import { client } from "@/lib/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface SanityCode {
  _type: 'code';
  code: string;
  language?: string;
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source);

const BLOG_QUERY = `
*[_type == "blog" && slug.current == $slug][0]{
  title,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  content
}
`;

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "blog" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug: string) => ({ slug }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const blog = await client.fetch(BLOG_QUERY, { slug });

  if (!blog) return notFound();

  return (
    <main className="bg-white min-h-screen">

      {/* ARTICLE WRAPPER */}
      <article className="
        max-w-3xl mx-auto
        px-6 py-16
      ">

        {/* TITLE */}
        <h1 className="
          text-3xl md:text-4xl
          font-bold
          leading-tight
          mb-6
        ">
          {blog.title}
        </h1>

        {/* META */}
        <div className="
          flex gap-4
          text-gray-500 text-sm
          mb-8
        ">
          {blog.publishedAt && (
            <span>
              {new Date(blog.publishedAt).toDateString()}
            </span>
          )}

          {blog.readingTime && (
            <span>• {blog.readingTime} min read</span>
          )}
        </div>

        {/* HERO IMAGE */}
        {blog.coverImage && (
          <div className="mb-10">
            <Image
              src={urlFor(blog.coverImage).width(1200).url()}
              alt={blog.title}
              width={1200}
              height={700}
              className="rounded-lg w-full object-cover"
              priority
            />
          </div>
        )}

        {/* EXCERPT */}
        {blog.excerpt && (
          <p className="
            text-lg text-gray-700
            mb-10
          ">
            {blog.excerpt}
          </p>
        )}

        {/* CONTENT */}
        <div className="
          prose prose-lg
          max-w-none
          prose-headings:font-semibold
          prose-h2:mt-12
          prose-h3:mt-8
          prose-p:leading-relaxed
          prose-li:leading-relaxed
          prose-img:rounded-lg
        ">
          <PortableText
            value={blog.content}
            components={{
              types: {
                image: ({ value }: { value: SanityImage }) => (
                  <Image
                    src={urlFor(value).width(900).url()}
                    alt=""
                    width={900}
                    height={500}
                    className="my-8 rounded-lg"
                  />
                ),
                code: ({ value }: { value: SanityCode }) => (
                  <pre className="
                    bg-gray-900 text-green-400
                    p-5 rounded-lg
                    overflow-x-auto
                    my-8
                  ">
                    <code>{value.code}</code>
                  </pre>
                ),
              },
            }}
          />
        </div>

      </article>
    </main>
  );
}
