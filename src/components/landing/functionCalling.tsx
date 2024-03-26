"use client";

import { IconChevronsUpRight, IconProgressCheck } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function FunctionCalling() {
  return (
    <main className="pt-48 w-full max-w-[90%] flex justify-center items-center flex-col">
      <h2 className="text-4xl text-center mb-2 font-semibold">
        Designed for function calling
      </h2>
      <p className="text-sm opacity-80 text-center mb-12">
        Function calling is when an AI system is tasked to call a function from
        a set of <br /> predefined functions based on the {"user's"} input and
        context.
      </p>

      <div className="flex items-center justify-center gap-6 h-96 w-full">
        <div className="w-full h-full bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-auto transition-all code-container">
          <h2 className="text-xl mb-2 font-semibold">But... why Scoopika ??</h2>
          <p className="text-sm opacity-80">
            The concept of {'"function-calling"'} is brilliant, but working with
            it is almost impossible in real products, Usually due to LLMs
            sending unexpected arguments values to the function, making up new
            arguments, or missing arguments. And not talking about other
            problems like costs and tools taking up the whole context
            window. Scoopika works with ANY LLM, and tries to solve all of these
            issues:
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4 text-sm">
              1. Multi-stage approach instead of feeding everything to a
              function-calling LLM at once.
            </div>
            <div className="flex items-center gap-4 text-sm">
              2. A LOT of configuration options to control how the system should
              treat each argument, along with validation steps before executing
              the tool.
            </div>
            <div className="flex items-center gap-4 text-sm">
              3. For history it uses RAG and vector stores, and it also uses a
              {'"user-actions"'} approach instead of {'"multi-round"'} function
              calling, and this approach costs less tokens and is easier to work
              with.
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col bg-black/10 dark:bg-accent/40 rounded-3xl p-8 group overflow-hidden transition-all">
          <h2 className="text-xl mb-2 font-semibold">85% is{"n't"} enough</h2>
          <p className="text-sm opacity-80">
            Scoopika might not make the LLM better, but it makes the process
            better. Scoopika is the bridge between the LLM and your functions,
            the config options you set for each argument will not force the LLM
            to output what you expect, but will give the system instructions on
            how to validate the LLM output before calling the function. You know
            your function will never receive a value you do{"n't"} expect, if it{" "}
            {"can't"} validate all required arguments (using the options you
            provide) it will not call the function, and in some cases it will
            try to ask about some values. but what are the available options ??
            Check this out:
          </p>
          <div className="w-full h-full flex flex-col justify-end">
            <Button
              color="primary"
              size="md"
              className="max-w-max dark:bg-accent/50 dark:text-white dark:hover:bg-accent/70"
              radius="full"
              as={Link}
              href="/tools/function-calling"
            >
              Learn more about function calling
              <IconChevronsUpRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
