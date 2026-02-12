import Image from "next/image";
import { notFound } from "next/navigation";
import { getPaginatedBlogs } from "../../../lib/api";
import ReadingProgress from "../../../Components/ReadingProgress";

import Link from "next/link";

function calculateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;
  const page = Number(search?.page) || 1;

  const data = await getPaginatedBlogs(page);
  const blog = data.data.find((item) => item.id === id);

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.summary,
  };
}

export default async function BlogDetails({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;
  const page = Number(search?.page) || 1;

  const data = await getPaginatedBlogs(page);
  const blog = data.data.find((item) => item.id === id);

  if (!blog) notFound();

  const readingTime = calculateReadingTime(blog.main_content);

  return (
    <>
      <ReadingProgress />
      {/* <ShareButtons title={blog.title} /> */}

      <article className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Link
            href={`/blog?page=${page}`}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Articles
          </Link>

          <span className="inline-block bg-black text-white mx-1 px-4 py-1 rounded-full text-sm mt-6 mb-4">
            {blog.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

          <p className="text-gray-600 mb-6">
            {readingTime} min read • {blog.created_at}
          </p>

          {/* Featured Image */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg mb-10">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 100vw,
                     1200px"
              className="object-cover"
            />
          </div>

          {/* Blog HTML Content */}
          <div
            className="prose prose-lg max-w-none
                       prose-headings:font-bold
                       prose-p:text-gray-700
                       prose-blockquote:border-l-4
                       prose-blockquote:border-indigo-500
                       prose-blockquote:pl-4
                       prose-blockquote:text-gray-600"
            dangerouslySetInnerHTML={{ __html: blog.main_content }}
          />

          {/* Related Posts */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {data.data
                .filter((item) => item.id !== blog.id)
                .slice(0, 2)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.id}?page=${page}`}
                    className="group block"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                      <div className="relative w-full h-40">
                        <Image
                          src={item.featured_image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Sticky Author Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-md">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src={blog.user.profile_pic}
                alt={blog.user.first_name}
                fill
                sizes="80px"
                className="rounded-full object-cover"
              />
            </div>

            <h3 className="font-semibold">
              {blog.user.first_name} {blog.user.last_name}
            </h3>

            <p className="text-sm text-gray-500 mt-2">{blog.user.role}</p>
          </div>
        </div>
      </article>
    </>
  );
}
