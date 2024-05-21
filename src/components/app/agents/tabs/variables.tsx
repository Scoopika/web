"use client";

import agentVariables from "@/scripts/agents/variables";
import { Button } from "@nextui-org/react";
import { AgentData, PromptInput } from "@scoopika/types";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EditGlobalVariable from "../editGlobalVariable";
import { FaInfoCircle } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

interface Props {
  agent: AgentData;
  updateAgent: (agent: AgentData) => void;
  openId: string;
}

const typesColors = {
  string: "text-green-500",
  number: "text-orange-500",
  boolean: "text-purple-500",
};

export default function AgentVariablesTab({ agent, updateAgent }: Props) {
  const [editVariable, setEditVariable] = useState<PromptInput | undefined>();

  return (
    <div className="flex flex-col items-center p-6 pt-0 w-full">
      <p className="text-sm w-full mb-1">All variables</p>
      <p className="text-xs opacity-80 w-full mb-4">
        Editing a variable from here will update it in all prompts using it
      </p>
      {agentVariables(agent).map((variable, index) => (
        <div
          key={`variableinputitem-${variable.variable.id}`}
          className={`flex items-center w-full mt-2 rounded-lg group p-2 pl-3 pr-3 ${
            !(index & 1) && "bg-black/10 dark:bg-accent/30"
          }`}
        >
          <div className="min-w-max flex items-center gap-1 text-sm">
            <div>{variable.variable.id}: </div>
            <div className={`${typesColors[variable.variable.type]}`}>
              {variable.variable.type}
            </div>
          </div>
          <div className="w-full flex items-center justify-end overflow-hidden opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            <Button
              isIconOnly
              size="sm"
              onPress={() => setEditVariable(variable.variable)}
              variant="flat"
            >
              <MdEdit />
            </Button>
          </div>
        </div>
      ))}
      {editVariable && (
        <EditGlobalVariable
          variable={editVariable}
          agent={agent}
          closeEdit={() => {
            setEditVariable(undefined);
          }}
          updateAgent={updateAgent}
        />
      )}

      <p className="text-sm w-full mb-3 border-1 p-3 rounded-md flex flex-col gap-2 border-dashed mt-4 border-black/20 dark:border-wite/20">
        <MdInfo size={24} className="text-cyan-300" />
        To create a new variable go to the prompt and add it
      </p>
    </div>
  );
}
