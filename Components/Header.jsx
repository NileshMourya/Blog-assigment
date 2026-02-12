"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent"
        >
          Dev<span className="text-black">Blog</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`relative transition hover:text-black ${
              pathname === "/" ? "text-black" : "text-gray-500"
            }`}
          >
            Home
            {pathname === "/" && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-black rounded-full" />
            )}
          </Link>

          <Link
            href="/blog"
            className={`relative transition hover:text-black ${
              pathname.startsWith("/blog") ? "text-black" : "text-gray-500"
            }`}
          >
            Blogs
            {pathname.startsWith("/blog") && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-black rounded-full" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
