export default function SearchSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
            Find Your Tool
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Search Developer Tools
          </h2>

          <p className="mt-3 text-zinc-400">
            Quickly find the AI tool you need.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search tools..."
          className="w-full rounded-2xl border border-zinc-700 bg-[#0A0A0A] px-6 py-4 text-white outline-none transition focus:border-blue-500"
        />
      </div>
    </section>
  );
}