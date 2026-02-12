import BlogCard from "../../Components/BlogCard";
import Pagination from "../../Components/Pagination";
import { getPaginatedBlogs } from "../../lib/api";

async function BlogPage({ searchParams }) {
  const params = await searchParams;

  const page =
    params?.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;

  const data = await getPaginatedBlogs(page);

  const totalPages = Math.ceil(data.total / data.per_page);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Latest Articles</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} currentPage={page} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}

export default BlogPage;
