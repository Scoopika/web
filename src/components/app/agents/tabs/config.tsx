"use client";

import { AgentData } from "@scoopika/types";
import { TbPrompt } from "react-icons/tb";

interface Props {
  agent: AgentData;
}

export default function AgentConfig({ agent }: Props) {
  return (
    <div className="flex flex-col items-center p-6 pt-0">
      <div className="text-sm mb-1 w-full">Options</div>
      <div className="text-xs opacity-80 w-full mb-4">
        Manage the agent prompt configuration options
      </div>

      {agent.prompts.length !== 0 ? (
        <div className=""></div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-6 border-1 border-dashed rounded-lg border-black/20 dark:border-white/20 mt-2">
          <div className="w-7 h-7 flex items-center justify-center border-1 rounded-lg">
            <TbPrompt />
          </div>
          <p className="text-sm mt-2 mb-1">Add a prompt</p>
          <p className="text-xs opacity-80">
            Add a prompt to this agent to configure its options
          </p>
        </div>
      )}
    </div>
  );
}
