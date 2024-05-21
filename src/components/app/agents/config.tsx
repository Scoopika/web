"use client";

import { AgentData } from "@scoopika/types";
import { useState } from "react";

interface Props {
  agent: AgentData;
}

export default function AgentConfig({ agent }: Props) {
  const [instruction, setInstruction] = useState<string | undefined>(
    agent.prompts[0]?.content,
  );

  if (!agent.chained) {
    return (
      <>
        {agent.prompts.length === 0 ? (
          <div className="p-6 pt-0">
            <div
              role="textbox"
              className="p-2 border-1 border-dashed rounded-xl w-full"
              onKeyDown={(e) => {
                setInstruction((prev) => (prev || "") + e.key);
              }}
            >
              {instruction || "Enter instructions...."}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  return <>{agent.name}</>;
}
