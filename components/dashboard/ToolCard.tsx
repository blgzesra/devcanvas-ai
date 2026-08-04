"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

export default function ToolCard({
  title,
  description,
  icon,
  href,
}: Props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites: string[] = JSON.parse(
      localStorage.getItem("favorite-tools") || "[]"
    );

    setFavorite(favorites.includes(title));
  }, [title]);

  function toggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    const favorites: string[] = JSON.parse(
      localStorage.getItem("favorite-tools") || "[]"
    );

    const updated = favorites.includes(title)
      ? favorites.filter((item) => item !== title)
      : [...favorites, title];

    localStorage.setItem(
      "favorite-tools",
      JSON.stringify(updated)
    );

    setFavorite(updated.includes(title));
  }

  return (
    <Link
      href={href}
className="group relative flex h-[340px] flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-zinc-900 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)]"    >
      <button
        onClick={toggleFavorite}
        className="absolute right-5 top-5 text-xl transition hover:scale-110"
      >
        {favorite ? "⭐" : "☆"}
      </button>

      <div className="text-4xl">
        {icon}
      </div>

      <div className="mt-6 h-16">
        <h3 className="line-clamp-2 text-2xl font-bold leading-tight">
          {title}
        </h3>
      </div>

      <div className="h-20">
        <p className="line-clamp-3 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <span className="font-medium text-blue-500 transition-all duration-300 group-hover:translate-x-1">
          Open →
        </span>
      </div>
    </Link>
  );
}