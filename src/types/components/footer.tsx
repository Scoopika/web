"use client";

import Logo from "./logo";
import Link from "next/link";
import ThemeToggle from "./themeToggle";

export default function Footer() {
  return (
    <footer className="w-full bg-accent/30 border-t-1 p-12 border-black/20 dark:border-border flex gap-14">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <Logo />
          <p className="font-bold text-inherit text-[1.05rem] ml-3">Scoopika</p>
        </div>
        <p className="text-sm opacity-70 mt-4">
          © {new Date().getFullYear()} Scoopika - Built by Kais Radwan
        </p>
        <p className="text-sm opacity-70 mt-4">
          Github repo will be public when the project is released
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <p>Tools</p>
        <Link href="/tools/function-calling" className="text-sm opacity-70">
          Function Calling
        </Link>
        <Link href="/tools/llm-tasks" className="text-sm opacity-70">
          LLM Tasks
        </Link>
        <Link href="/tools/vector-stores" className="text-sm opacity-70">
          Vector Stores
        </Link>
      </div>

      <div className="flex flex-col w-full gap-4">
        <p>Resources</p>
        <Link href="/blog" className="text-sm opacity-70">
          Blog
        </Link>
        <Link href="/docs" className="text-sm opacity-70">
          Documentation
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <ThemeToggle />
      </div>
    </footer>
  );
}
