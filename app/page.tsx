import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedTools from "@/components/sections/FeaturedTools";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      <Navbar />

      <Hero />

      <FeaturedTools />

      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

          <h2 className="text-4xl font-bold">
            Ready to boost your development workflow?
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Explore AI-powered developer tools built for productivity.
          </p>

          <Link
            href="/dashboard"
            className="mt-10 rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
          >
            Get Started
          </Link>

        </div>
      </section>

    </main>
  );
}