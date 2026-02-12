import Link from "next/link";
import Image from "next/image";

function calculateReadingTime(text) {
  if (!text) return "2 min read";
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ blog, currentPage }) {
  const readingTime = calculateReadingTime(blog.summary);

  const authorName =
    blog.authors && blog.authors.length > 0
      ? blog.authors[0].name
      : blog.news_site;

  return (
    <Link
      href={`/blog/${blog.id}?page=${currentPage}`}
      className="group relative rounded-2xl overflow-hidden bg-slate-900 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-56 sm:h-60 md:h-64 overflow-hidden">
        <Image
          src={blog.image_url}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />

        {/* News Site Badge */}
        <span className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full shadow-md">
          {blog.news_site}
        </span>

        {/* Reading Time */}
        <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
          {readingTime}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-400 transition duration-300">
          {blog.title}
        </h3>

        <p className="text-slate-400 text-sm mt-3 line-clamp-3 flex-1">
          {blog.summary}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-xs">
            <p className="text-white font-medium">{authorName}</p>
            <p className="text-slate-500">{formatDate(blog.published_at)}</p>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-indigo-500/30 transition duration-500 pointer-events-none" />
    </Link>
  );
}
