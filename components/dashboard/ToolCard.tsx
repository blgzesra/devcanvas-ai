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
    const favorites = JSON.parse(
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

    let updated: string[];

    if (favorites.includes(title)) {
      updated = favorites.filter((item) => item !== title);
    } else {
      updated = [...favorites, title];
    }

    localStorage.setItem(
      "favorite-tools",
      JSON.stringify(updated)
    );

    setFavorite(updated.includes(title));
  }

  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
    >
      <button
        onClick={toggleFavorite}
        className="absolute right-5 top-5 text-xl transition hover:scale-110"
      >
        {favorite ? "⭐" : "☆"}
      </button>

      <div className="mb-4 text-4xl">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>

      <span className="mt-6 inline-block text-blue-500 transition group-hover:translate-x-1">
        Open →
      </span>
    </Link>
  );
}