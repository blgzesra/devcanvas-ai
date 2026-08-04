"use client";

import { useMemo, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ToolCard from "@/components/dashboard/ToolCard";

import { tools } from "@/lib/tools";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(localStorage.getItem("favorite-tools") || "[]");
    } catch {
      return [];
    }
  });

  const categories = [
    "All",
    ...new Set(tools.map((tool) => tool.category)),
  ];

  const filteredTools = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        tool.category === selectedCategory;

      const matchesFavorite =
        !favoritesOnly || favorites.includes(tool.title);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorite
      );
    });
  }, [
    search,
    selectedCategory,
    favoritesOnly,
    favorites,
  ]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <DashboardHeader />

        <div className="mt-10">
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          <button
            onClick={() => setFavoritesOnly(false)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              !favoritesOnly
                ? "bg-blue-600 text-white"
                : "border border-zinc-700 text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFavoritesOnly(true)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              favoritesOnly
                ? "bg-yellow-500 text-black"
                : "border border-zinc-700 text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            ⭐ Favorites
          </button>

          {categories
            .filter((category) => category !== "All")
            .map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  selectedCategory === category
                  && !favoritesOnly
                    ? "bg-blue-600 text-white"
                    : "border border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}

        </div>

        <section className="mt-14">

          <h2 className="mb-8 text-3xl font-bold">
            AI Tools
          </h2>

          <div className="grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
              No tools found.
            </div>
          )}

        </section>

      </div>
    </main>
  );
}