"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import theme from "@/lib/codeTheme";
import clientWithStoreTs from "@/components/code/clientWithStoreTs";
import toolsTs from "@/components/code/toolsTs";

export default function Top() {
  return (
    <main className="pt-48 pb-8 min-h-max relative w-full flex justify-center">
      <div className="flex w-full h-full items-center max-w-[90%] gap-10">
        <div className="flex flex-col w-full h-full w-full justify-center">
          <h1 className="text-3xl font-semibold relative z-20 py-2 items-center">
            {"Let's"} see a simple example of
          </h1>
          <h1 className="text-3xl font-semibold relative z-20 py-2 mb-2 items-center">
            how it works
          </h1>
          <p className="mt-4 opacity-80 text-base">
            In this example {"we're"} using the mixtral LLM with a vector store
            for history. Once you define a store, Scoopika will use it to save
            and retreive data based on the session id. Scroll to comments at the
            end of the code to see what will happen in this case.
            <br />
            <br />
            We actually tried this one, and it works just perfect! pay attention
            to {"tools.ts"}, the {"order's"} field has two accepted values (
            {'"views"'}, {'"date"'}), your function will never receive another
            value, and as similarity is not disabled, Scoopika will use a
            similarity model if the LLM output does not match the accepted
            values to get the most accurate one.
          </p>
        </div>

        <div className="flex flex-col w-full h-full justify-center items-center">
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
              <div className="w-full h-full no-scrollbar overflow-auto max-h-96 bg-black dark:bg-[#121212] rounded-3xl p-2">
                <SyntaxHighlighter
                  language="typescript"
                  style={theme as any}
                  className="min-w-max"
                >
                  {clientWithStoreTs}
                </SyntaxHighlighter>
              </div>
            </TabsContent>
            <TabsContent value="tools-ts">
              <div className="w-full h-full no-scrollbar overflow-auto max-h-96 bg-black dark:bg-[#121212] rounded-3xl p-2">
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
      </div>
    </main>
  );
}
