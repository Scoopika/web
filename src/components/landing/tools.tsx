"use client";

import Link from "next/link";

export default function Tools({
  updateColor,
}: {
  updateColor: (color: string) => void;
}) {
  return (
    <div className="w-full max-w-[90%] rounded-2xl mt-12 flex flex-col md:flex-row items-center justify-center gap-2">
      <Product
        link="/tools/function-calling"
        updateColor={updateColor}
        color="brandpurple"
        className="w-full h-full border-1 flex flex-col items-center justify-center bg-black/10 dark:bg-accent/40 rounded-l-3xl rounded-r-lg p-6 hover:bg-black/20 dark:hover:bg-accent/50 cursor-pointer group overflow-hidden transition-all hover:scale-[1.015]"
      >
        <h2 className="text-xl text-center mb-2 dark:group-hover:text-[var(--brandpurple)]">
          Function Calling
        </h2>
        <p className="text-sm opacity-80 text-center">
          Controllable and predictable function calling with validations and
          rules for arguments
        </p>
        <div
          style={{ boxShadow: "0px 0px 130px 1px var(--brandpurple)" }}
          className="text-sm opacity-80 text-center mt-4 p-2 bg-black text-white dark:bg-white dark:text-black pl-4 pr-4 rounded-full group-hover:bg-[var(--brandpurple)]"
        >
          Learn more
        </div>
      </Product>

      <Product
        link="/tools/llm-tasks"
        updateColor={updateColor}
        color="brandgreen"
        className="w-full h-full border-1 flex flex-col items-center justify-center bg-black/10 dark:bg-accent/40 rounded-l-lg rounded-r-lg p-6 hover:bg-black/20 dark:hover:bg-accent/50 cursor-pointer group overflow-hidden transition-all hover:scale-[1.015]"
      >
        <h2 className="text-xl text-center mb-2 dark:group-hover:text-[var(--brandgreen)]">
          LLM Tasks
        </h2>
        <p className="text-sm opacity-80 text-center">
          Ready to use APIs for all your LLM tasks (summarize, chat, normalize
          data, and custom tasks.)
        </p>
        <div
          style={{ boxShadow: "0px 0px 130px 3px var(--brandgreen)" }}
          className="text-sm opacity-80 text-center mt-4 p-2 bg-black text-white dark:bg-white dark:text-black pl-4 pr-4 rounded-full group-hover:bg-[var(--brandgreen)]"
        >
          Learn more
        </div>
      </Product>

      <Product
        link="/tools/vector-stores"
        updateColor={updateColor}
        color="brandorange"
        className="w-full h-full border-1 flex flex-col items-center justify-center bg-black/10 dark:bg-accent/40 rounded-l-lg rounded-r-3xl p-6 hover:bg-black/20 dark:hover:bg-accent/50 cursor-pointer group overflow-hidden transition-all hover:scale-[1.015]"
      >
        <h2 className="text-xl text-center mb-2 dark:group-hover:text-[var(--brandorange)]">
          Vector Stores
        </h2>
        <p className="text-sm opacity-80 text-center">
          Bring your database to Scoopika with vector stores for history, RAG,
          and more...
        </p>
        <div
          style={{ boxShadow: "0px 0px 130px 3px var(--brandorange)" }}
          className="text-sm opacity-80 text-center mt-4 p-2 bg-black text-white dark:bg-white dark:text-black pl-4 pr-4 rounded-full group-hover:bg-[var(--brandorange)]"
        >
          Learn more
        </div>
      </Product>
    </div>
  );
}

function Product({
  color,
  updateColor,
  children,
  className,
  link,
}: {
  color: string;
  updateColor: (color: string) => void;
  children: React.ReactNode;
  link: string;
  className?: string;
}) {
  return (
    <Link
      href={link}
      className={className}
      onMouseEnter={() => updateColor(color)}
      onMouseLeave={() => updateColor("brandwhite")}
    >
      {children}
    </Link>
  );
}
