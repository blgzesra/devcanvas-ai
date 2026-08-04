export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-bold tracking-tight">
          DevCanvas <span className="text-blue-500">AI</span>
        </h1>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#" className="transition hover:text-white">
            Tools
          </a>

          <a href="#" className="transition hover:text-white">
            GitHub
          </a>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}