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
  slug: { current: string };
  publishedAt: string;
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
    <section className="py-10 md:py-20 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Blog Posts & Guides</h2>
        <p className="text-gray-500 mb-12">Fresh guides, reviews & verified deals - Read our latest posts.</p>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-black">
            {blogs.map((post) => {
              const displayImage = post.coverImage || post.contentImage;
              const date = post.publishedAt || new Date().toISOString();

              return (
                <Link
                  href={`/blogs/${post.slug.current}`}
                  key={post._id}
                  className="group cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="overflow-hidden rounded-[40px] mb-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                    {displayImage ? (
                      <Image
                        src={urlFor(displayImage).width(400).height(256).fit('crop').url()}
                        alt={post.title}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-brand-blue transition">
                    {post.title}
                  </h3>
                  <div className="flex flex-col gap-3 text-sm" aria-label="Post metadata">
                    <time
                      dateTime={date}
                      className="flex items-center gap-1"
                      title={`Published on ${new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' })}`}
                    >
                      📅 {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                    <div className="flex items-center gap-2">
                      <Image
                        src={BLOG_AUTHOR_AVATAR}
                        alt={`${BLOG_AUTHOR}'s avatar`}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <span>{BLOG_AUTHOR}</span>
                    </div>
                  </div>
                </Link>
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
