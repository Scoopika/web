"use client";

import { Button } from "@nextui-org/react";
import { AgentData, ApiToolSchema, ToolSchema } from "@scoopika/types";
import { useState } from "react";
import { MdInfo } from "react-icons/md";
import AddAgentTool from "../tools/add";

interface Props {
  agent: AgentData;
  updateAgent: (agent: AgentData) => void;
}

export const newTool: { new: boolean; tool: ApiToolSchema } = {
  new: true,
  tool: {
    type: "api",
    headers: {},
    method: "get",
    url: "",
    tool: {
      type: "function",
      function: {
        name: "",
        description: "",
        parameters: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    },
  },
};

export default function AgentTools({ agent, updateAgent }: Props) {
  return (
    <div className="flex flex-col items-center p-6 pt-0 w-full">
      <div className="flex items-center w-full gap-5 mb-3">
        <div className="flex flex-col w-full">
          <p className="text-sm w-full opacity-80">
            External tools the agent can use based on the context, you can add
            custom functions as tools to the agent from your code.
          </p>
          <p className="text-sm w-full opacity-80 mt-2">
            Soon {"you'll"} be able to connect your agents to custom tools with
            no code, but for now you can follow the documentation, {"it's"} clear
            and simple {";)"}
          </p>
        </div>
      </div>
    </div>
  );
}
