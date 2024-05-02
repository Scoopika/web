import Features from "@/components/functionCalling/features";
import Hero from "@/components/functionCalling/hero";
import Top from "@/components/functionCalling/top";
import Navbar from "@/components/navbar";
import {
  IconProgressCheck,
  IconRobotFace,
  IconInfoCircle,
} from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Function Calling",
  description: "Controllable function calling that works",
};

export default function Page() {
  return (
    <>
      <Navbar session={null} active="Tools" />
      <Hero />
      <div className="w-full flex items-center justify-center mt-12">
        <div className="w-full flex items-center justify-center max-w-[90%] gap-4">
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-3xl rounded-r-lg bg-black/10 dark:bg-accent/40">
              <IconProgressCheck size={25} className="mb-4" />
              <h3 className="mb-2">Control the process yourself</h3>
              <p className="text-sm opacity-70">
                Configuration options that give you the control over each step
                in the process
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-lg bg-black/10 dark:bg-accent/40">
              <IconRobotFace size={25} className="mb-4" />
              <h3 className="mb-2">Works with any LLM</h3>
              <p className="text-sm opacity-70">
                Even if it was not fine-tuned to work with function calling
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-lg rounded-r-3xl bg-black/10 dark:bg-accent/40">
              <IconInfoCircle size={25} className="mb-4" />
              <h3 className="mb-2">Arguments rules</h3>
              <p className="text-sm opacity-70">
                The system will validate the output of the LLM for each argument
                before calling the function
              </p>
            </div>
          </div>
        </div>
      </div>

      <Top />
      <div className="w-full flex flex-col items-center justify-center">
        <Features />
      </div>
    </>
  );
}
