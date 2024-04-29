import Logo from "@/components/logo";
import Link from "next/link";
import { docsConfig } from "@/config/docs";
import { DocsSidebarNav } from "@/components/docs/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
  description: "Scoopika documentation - getting started with Scoopika",
};

export default function Page() {
  return (
    <>
      <div className="flex w-full min-h-screen pt-16">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
        <div className="w-full flex flex-col">
          <div className="w-full border-b-1 border-black/20 dark:border-border bg-accent/20 dark:bg-accent/10 p-10 flex flex-col justify-center">
            <Logo />
            <h1 className="text-2xl font-bold mb-2 mt-3">
              Scoopika Documentation
            </h1>
            <p className="text-sm opacity-80 mb-8">
              Everything you need to know about to get up and running with
              Scoopika
            </p>
            <div className="flex gap-3 items-center">
              <div className="p-1.5 pl-2 pr-2 border-1 border-dashed border-black/20 dark:border-white/20 rounded-full flex items-center gap-2 text-xs">
                <img
                  src="/typescript.png"
                  className="w-4 h-4 object-contain grayscale"
                />
                TypeScript
              </div>
              <div className="p-1.5 pl-2 pr-2 border-1 border-dashed border-black/20 dark:border-white/20 rounded-full flex items-center gap-2 text-xs">
                <img
                  src="/python.png"
                  className="w-4 h-4 object-contain grayscale"
                />
                Python
              </div>
              <div className="p-1.5 pl-2 pr-2 border-1 border-dashed rounded-full flex items-center gap-2 text-xs">
                Coming soon
              </div>
            </div>
          </div>
          <div className="w-full border-b-1 border-orange-400/50 flex items-center justify-center p-2 pt-4 pb-4 bg-orange-500/5 text-sm">
            This documentation is still a work in progress, some of the pages
            might miss a lot of content and some links might not work
          </div>
          <div className="w-full p-10">
            <p className="font-semibold text-lg mb-4">Get Started</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <Card
                title="Function Calling"
                description="Build context-aware applications with a controllable function-calling system"
                link="/docs"
              />
              <Card
                title="LLM Tasks"
                description="Build AI-powered agents with specific tasks in a minute"
                link="/docs"
              />
              <Card
                title="Vector Stores"
                description="Add history and search capabilities to your AI-powered applications"
                link="/docs"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="w-full p-6 border-1 rounded-3xl border-black/20 dark:border-border transition-all hover:bg-accent/10 cursor-pointer dark:hover:border-white/20"
    >
      <h1 className="font-bold mb-2">{title}</h1>
      <p className="text-sm opacity-80">{description}</p>
    </Link>
  );
}
