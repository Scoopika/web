"use client";

import { IconProgressCheck } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "@/lib/codeTheme";
import clientTs from "@/components/code/clientTs";
import toolsTs from "@/components/code/toolsTs";

export default function Why() {
  return (
    <main className="pt-48 w-full max-w-[90%] flex justify-center items-center flex-col">
      <h2 className="text-4xl text-center mb-2 font-semibold">
        Built for developers
      </h2>
      <p className="text-sm opacity-80 text-center mb-12">
        Stop building the same f**king chatbot, come build something special
        that works.
      </p>
      <div
        style={{ boxShadow: "0px 0px 130px 1px var(--brandpurple)" }}
        className="w-2 h-2"
      ></div>

      <div className="flex items-center justify-center gap-6 h-64 w-full">
        <div className="w-full h-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">
            Function-calling that makes sense
          </h2>
          <p className="text-sm opacity-80 mb-6">
            We built a function-calling system that works with any LLM and gives
            you rules and configuration options to control each step in the
            process.
          </p>
          <div className="flex flex-col gap-4 justify-end h-full">
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                Wide range of configuration options for how each argument is
                treated.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                Pre-execution custom validation steps, along with manual
                approval.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconProgressCheck
                size={17}
                className="text-[var(--brandpurple)]"
              />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                Your function will NEVER receive inputs it does not expect.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">
            Lower costs, better performance
          </h2>
          <p className="text-sm opacity-80">
            Our cloud-based solution provides a per-request pricing (start for
            free). When it comes to your {"LLM's"} costs, they are much lower,
            as not all tools count to the context window in function-calling
            (only the selected one), history is summarized and retreived with
            RAG using vector stores, and everything is optimized for
            performance.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 h-[450px] w-full mt-6">
        <div className="w-full h-full min-w-[60%] max-w-[60%] flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group transition-all">
          <h2 className="text-xl mb-2 font-semibold">Ready APIs</h2>
          <p className="text-sm opacity-80 mb-6">
            Leave the heavy lifting to our APIs and focus on building your ideas
            with ease. Below code shows how to use Scoopika with
            function-calling:
          </p>
          <Tabs
            defaultValue="client-ts"
            className="w-full h-full flex flex-col justify-end"
          >
            <TabsList className="rounded-3xl mb-2 max-w-max">
              <TabsTrigger className="rounded-3xl" value="client-ts">
                client.ts
              </TabsTrigger>
              <TabsTrigger className="rounded-3xl" value="tools-ts">
                tools.ts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="client-ts">
              <div className="w-full h-full no-scrollbar overflow-auto max-h-56 bg-black dark:bg-background rounded-3xl p-2">
                <SyntaxHighlighter
                  language="typescript"
                  style={theme as any}
                  className="min-w-max"
                >
                  {clientTs}
                </SyntaxHighlighter>
              </div>
            </TabsContent>
            <TabsContent value="tools-ts">
              <div className="w-full h-full no-scrollbar overflow-auto max-h-56 bg-black dark:bg-background rounded-3xl p-2">
                <SyntaxHighlighter
                  language="typescript"
                  style={theme as any}
                  className="min-w-max"
                >
                  {toolsTs}
                </SyntaxHighlighter>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="h-full w-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">Runs anywhere</h2>
          <p className="text-sm opacity-80 mb-6">
            You can run Scoopika on our Serverless cloud platform with client
            libraries for both TypeScript and Python. and you can host the
            {"Scoopika's"} core locally on your own.
            <br />
            Cloud (TypeScript & Python).
            <br />
            Local (Python)
          </p>
          <div className="flex flex-col gap-4 justify-end h-full">
            <img
              src="/scoopika_local_cloud.png"
              alt="Scoopika"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
