import Link from "next/link";

import { tools } from "@/lib/tools";

export default function FeaturedTools() {
  return (
    <section
      id="tools"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
          Featured Tools
        </p>

        <h2 className="text-4xl font-bold">
          AI tools you&apos;ll actually use
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Built for developers who want to automate repetitive tasks and ship
          faster with AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-zinc-900"
          >
            <div className="mb-5 text-4xl">
              {tool.icon}
            </div>

            <h3 className="mb-3 text-2xl font-semibold">
              {tool.title}
            </h3>

            <p className="text-zinc-400">
              {tool.description}
            </p>

            <span className="mt-6 inline-block text-blue-500 transition group-hover:translate-x-1">
              Try Tool →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}