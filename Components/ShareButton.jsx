"use client";

export default function ShareButtons({ title }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="fixed right-6 top-1/3 hidden lg:flex flex-col gap-4 z-40">
      <a
        href={`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`}
        target="_blank"
        className="bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        X
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        in
      </a>
    </div>
  );
}
