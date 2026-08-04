export default function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800 pb-8">
      <h1 className="text-4xl font-bold text-white">
        AI Workspace
      </h1>

      <p className="mt-3 max-w-2xl text-zinc-400">
        Explore AI-powered developer tools to generate code, documentation,
        mock APIs, regex patterns, fake data and more.
      </p>
    </header>
  );
}