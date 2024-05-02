"use client";

import { IconProgressCheck } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "@/lib/codeTheme";
import clientTs from "@/components/code/clientTs";
import toolsTs from "@/components/code/toolsTs";

export default function Features() {
  return (
    <main className="pt-48 pb-24 w-full max-w-[90%] flex justify-center items-center flex-col">
      <h2 className="text-4xl text-center mb-2 font-semibold">
        Rules for each case
      </h2>
      <p className="text-sm opacity-80 text-center mb-12">
        Rules will not force the LLM to output what you expect, it will give
        Scoopika <br />
        instructions on how to validate the LLM output for each argument
      </p>
      <div
        style={{ boxShadow: "0px 0px 130px 1px var(--brandpurple)" }}
        className="w-2 h-2"
      ></div>

      <div className="flex items-center justify-center gap-6 h-64 w-full">
        <div className="w-full h-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">
            Basic rules & advanced rules
          </h2>
          <p className="text-sm opacity-80 mb-6">
            There is +10 config options for different use cases based on what
            the argument is, {"we'll"} about all of them in the docs, but{" "}
            {"here's"} some basic ones:
          </p>
          <div className="flex flex-col gap-4 justify-end h-full">
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                required: force that the argument should exist and be valid, if
                not {"don't"} call the function
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                important: force that the argument should exist as is in the{" "}
                {"user's"} input
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                accept: force that the argument should match the accepted values
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">Validation steps</h2>
          <p className="text-sm opacity-80">
            {"Don't"} trust us, Define custom functions to validate each
            argument yourself before calling the tool, you can return a success
            (true or false) and a value to replace the argument with (if
            applicable).
          </p>
          <div className="flex flex-col gap-4 justify-end h-full">
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                Validate arguments using custom functions you build as you want
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                Wait for user approval before calling the function, with AI
                generated questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
