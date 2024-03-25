"use client";

import WaitlistDialog from "@/components/joinWaitlist";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "@/lib/codeTheme";
import clientTs from "@/components/code/clientTs";

export default function Hero() {
  return (
    <main className="pt-16 pb-8 min-h-max relative w-full flex justify-center">
      <div className="flex w-full h-full items-center max-w-[90%]">
        <div className="flex flex-col w-full h-full pt-16 w-full">
          <h1 className="text-3xl font-semibold relative z-20 py-2 items-center">
            Controllable Function-Calling That Works
          </h1>
          <p className="mt-4 opacity-80 text-base mb-12">
            We built a function-calling system that works with any LLM and gives
            <br />
            you rules and configuration options to control each <br />
            step in the process.
          </p>
          <WaitlistDialog color="brandpurple" triggerClassName="max-w-max" />
        </div>

        <div className="flex flex-col w-full h-full justify-center items-center pt-16">
          <div className="w-full h-full no-scrollbar overflow-auto max-h-96 bg-black dark:bg-[#121212] rounded-3xl p-2">
            <SyntaxHighlighter
              language="typescript"
              style={theme as any}
              className="min-w-max"
            >
              {clientTs}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </main>
  );
}
