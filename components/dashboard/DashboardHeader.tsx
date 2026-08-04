export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Welcome back. Choose an AI tool to get started.
        </p>
      </div>

      <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500">
        New Tool
      </button>
    </header>
  );
}