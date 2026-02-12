export default function ProjectFeatures() {
  return (
    <section className="bg-slate-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            🚀 Project Features
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A modern blog platform built with performance, scalability, and
            clean UI architecture in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Blog Listing */}
          <FeatureCard
            title="📰 Blog Listing Page"
            items={[
              "Paginated API integration",
              "Server-side data fetching (App Router)",
              "Dynamic page-based routing (?page=1)",
              "Responsive blog grid layout",
              "Professional numbered pagination",
            ]}
          />

          {/* Blog Details */}
          <FeatureCard
            title="📄 Blog Details Page"
            items={[
              "Dynamic routing using /blog/[id]",
              "HTML content rendering (dangerouslySetInnerHTML)",
              "Reading time calculation",
              "Sticky author sidebar",
              "Related posts section",
            ]}
          />

          {/* Pagination */}
          <FeatureCard
            title="🔄 Smart Pagination System"
            items={[
              "Uses next_page_url & prev_page_url",
              "Dynamic total page calculation",
              "Disabled state handling",
              "Query param-based navigation",
              "SEO-friendly structure",
            ]}
          />

          {/* State Management */}
          <FeatureCard
            title="🧠 State Management"
            items={["Scalable architecture", "Separation of UI & data logic"]}
          />

          {/* UI / Design */}
          <FeatureCard
            title="🎨 Modern UI Design"
            items={[
              "Built with Tailwind CSS",
              "Responsive across all devices",
              "Glassmorphism sticky header",
              "Hover animations & transitions",
              "Professional typography",
            ]}
          />

          {/* Performance */}
          <FeatureCard
            title="⚡ Performance Optimizations"
            items={[
              "Server Components for fast load",
              "Optimized Next.js Image usage",
              "Hydration-safe architecture",
            ]}
          />
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-6">🛠 Tech Stack</h3>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js 14 (App Router)",
              "Tailwind CSS",
              "REST API Integration",
              "Dynamic Routing",
            ].map((tech, index) => (
              <span
                key={index}
                className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm hover:bg-indigo-600 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature Card ---------------- */

function FeatureCard({ title, items }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/40 transition duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>

      <ul className="space-y-3 text-slate-400 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-indigo-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
