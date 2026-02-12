import Link from "next/link";

export default function Pagination({ currentPage, totalPages }) {
  const createPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = createPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-14">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 transition"
        >
          ←
        </Link>
      )}

      {/* First page + dots */}
      {start > 1 && (
        <>
          <Link
            href={`/blog?page=1`}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            1
          </Link>
          {start > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`/blog?page=${page}`}
          className={`px-4 py-2 rounded-xl border transition-all duration-200
            ${
              currentPage === page
                ? "bg-black text-white border-black scale-105 shadow-md"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page + dots */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <Link
            href={`/blog?page=${totalPages}`}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          →
        </Link>
      )}
    </div>
  );
}
