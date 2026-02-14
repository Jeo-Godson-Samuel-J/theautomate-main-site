import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity.client';
import { LATEST_BLOGS_QUERY } from '@/lib/queries';

const BLOG_AUTHOR = 'Vinoth';
const BLOG_AUTHOR_AVATAR = '/user.png';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage?: any;
  contentImage?: any;
}

export default async function Blog() {
  const blogs: Blog[] = await client.fetch(
    LATEST_BLOGS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <section className="py-16 md:py-20 px-6 pb-24 md:pb-4 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Blog Posts & Guides</h2>
        <p className="text-gray-500 mb-12">Fresh guides, reviews & verified deals - Read our latest posts.</p>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {blogs.map((blog) => {
              const displayImage = blog.coverImage || blog.contentImage;

              return (
                <article
                  key={blog._id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* IMAGE */}
                  {displayImage ? (
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
                  ) : (
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
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
                      href={`/blogs/${blog.slug}`}
                      className="mt-auto text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <Link href="/blogs">
          <Button className="mt-8 md:mt-16 bg-brand-dark text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-brand-blue shadow-lg">
            See more
          </Button>
        </Link>
      </div>
    </section>
  );
}
