import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          DevCanvas <span className="text-blue-500">AI</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">

          <Link
            href="#tools"
            className="transition hover:text-white"
          >
            Tools
          </Link>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>

          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.18)]"
          >
            Get Started
          </Link>

        </nav>

      </div>
    </header>
  );
}