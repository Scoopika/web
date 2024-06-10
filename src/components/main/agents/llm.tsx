"use client";

import engines, {
  getDefaultOptions,
  getEngines,
  modelsShortname,
} from "@/scripts/agents/engines";
import { RiExpandUpDownLine } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { Dispatch, SetStateAction } from "react";
import { LuBrainCircuit } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsStars } from "react-icons/bs";

interface Props {
  agent: AgentData;
  updateAgent: Dispatch<SetStateAction<AgentData>>;
}

export default function AgentLLM({ agent, updateAgent }: Props) {
  return (
    <Popover>
      <PopoverTrigger className="w-full" asChild>
        <Button
          size="sm"
          color="default"
          variant="flat"
          className="font-semibold w-full"
          startContent={<LuBrainCircuit size={17} />}
          endContent={<RiExpandUpDownLine />}
        >
          {engines[agent.prompts[0].llm_client].name} {"-> "}{" "}
          {modelsShortname[agent.prompts[0].model] || agent.prompts[0].model}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm mb-1">Select LLM</p>
        <p className="text-xs opacity-80 mb-4">
          The LLM that will drive this agent
        </p>

        <div className="w-full flex items-center p-2">
          <p className="text-sm w-full">Provider:</p>
          <div className="flex items-center justify-end">
            <Select
              onValueChange={(value) => {
                updateAgent(prev => ({
                  ...prev,
                  prompts: [
                    {
                      ...prev.prompts[0],
                      llm_client: value,
                      model:
                        getEngines("text")[value].models["text"][0]?.id || "",
                      options: getDefaultOptions(
                        getEngines("text")[value].models["text"][0]?.options ||
                          {}
                      ),
                    },
                  ],
                }));
              }}
              defaultValue={agent.prompts[0].llm_client}
            >
              <SelectTrigger>
                <SelectValue placeholder="The model host" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                <SelectGroup>
                  {Object.keys(getEngines("text")).map((key) => (
                    <SelectItem key={`engine-select-${key}`} value={key}>
                      {engines[key].name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex items-center p-2">
          <p className="text-sm w-full">Model:</p>
          <div className="flex items-center justify-end">
            <Select
              onValueChange={(value) => {
                updateAgent(prev => ({
                  ...prev,
                  prompts: [
                    {
                      ...prev.prompts[0],
                      model: value,
                      options: getDefaultOptions(
                        getEngines("text")[prev.prompts[0].llm_client].models[
                          "text"
                        ].filter((m) => m.id === value)[0]?.options || {}
                      ),
                    },
                  ],
                }));
              }}
              defaultValue={agent.prompts[0].model}
            >
              <SelectTrigger className="truncate max-w-36">
                <SelectValue placeholder="Select model" className="truncate" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                <SelectGroup>
                  {engines[agent.prompts[0].llm_client] &&
                    engines[agent.prompts[0].llm_client].models["text"].map(
                      (model) => (
                        <SelectItem
                          key={`model-select-${model.id}`}
                          value={model.id}
                          className="flex items-center gap-1"
                        >
                          <div className="text-sm flex items-center gap-1">
                            {model.name || model.id}
                          </div>
                        </SelectItem>
                      )
                    )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full border-t-1"></div>

        <p className="text-xs mt-4 text-orange-500 dark:text-orange-300">
          Make sure you have an API key for the selected provider. {"you'll"} need
          to add to your account or pass it later safely from your code
        </p>
      </PopoverContent>
    </Popover>
  );
}
