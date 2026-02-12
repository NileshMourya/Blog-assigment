import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogById, getPaginatedBlogs } from "../../../lib/api";
import ReadingProgress from "../../../Components/ReadingProgress";
import Link from "next/link";

function calculateReadingTime(text) {
  if (!text) return 2;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.summary,
  };
}

export default async function BlogDetails({ params, searchParams }) {
  const resolveSearch = await searchParams;
  const page = Number(resolveSearch?.page) || 1;

  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) notFound();

  const readingTime = calculateReadingTime(blog.summary);

  // For related posts (optional)
  const { blogs } = await getPaginatedBlogs(page);

  const relatedPosts = blogs.filter((item) => item.id !== blog.id).slice(0, 2);

  return (
    <>
      <ReadingProgress />

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
            {blog.news_site}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

          <p className="text-gray-600 mb-6">
            {readingTime} min read • {formatDate(blog.published_at)}
          </p>

          {/* Featured Image */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg mb-10">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p>{blog.summary}</p>

            <a
              href={blog.url}
              target="_blank"
              className="text-indigo-600 underline"
            >
              Read full article on {blog.news_site}
            </a>
          </div>

          {/* Related Posts */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}?page=${page}`}
                  className="group block"
                >
                  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                    <div className="relative w-full h-40">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="50vw"
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

        {/* Author Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold">
              {blog.authors?.[0]?.name || blog.news_site}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Published on {formatDate(blog.published_at)}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
