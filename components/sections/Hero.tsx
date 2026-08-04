import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 pt-16 text-center">

      <span className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-400">
        AI-Powered Developer Toolkit
      </span>

      <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
        DevCanvas <span className="text-blue-500">AI</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
        Modern AI tools for developers. Generate regex, explain JSON,
        create README files, build Tailwind classes and more.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          href="/dashboard"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)]"
        >
          Explore Tools
        </Link>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-900"
        >
          GitHub
        </a>

      </div>

    </section>
  );
}