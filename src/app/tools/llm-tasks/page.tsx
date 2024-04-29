import Hero from "@/components/llmTasks/hero";
import Navbar from "@/components/navbar";
import {
  IconRobotFace,
  IconInfoCircle,
  IconDirections,
} from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Tasks",
  description: "Ready APIs for different LLM tasks for your agents",
};

export default function Page() {
  return (
    <>
      <Navbar session={null} active="Tools" />
      <Hero />
      <div className="w-full flex items-center justify-center mt-12 pb-24">
        <div className="w-full flex items-center justify-center max-w-[90%] gap-4">
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-3xl rounded-r-lg bg-black/10 dark:bg-accent/40">
              <IconDirections size={25} className="mb-4" />
              <h3 className="mb-2">Add custom tasks</h3>
              <p className="text-sm opacity-70">
                Add your own custom tasks using function-calling-based method or
                prompt-based method
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-lg bg-black/10 dark:bg-accent/40">
              <IconRobotFace size={25} className="mb-4" />
              <h3 className="mb-2">Works with any LLM</h3>
              <p className="text-sm opacity-70">
                Bring your own LLM to use with Scoopika, from OpenAI,
                HuggingFace, and more
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-lg rounded-r-3xl bg-black/10 dark:bg-accent/40">
              <IconInfoCircle size={25} className="mb-4" />
              <h3 className="mb-2">Function-calling vs Tasks</h3>
              <p className="text-sm opacity-70">
                In function-calling the system has a number of functions to
                choose from based on context
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
