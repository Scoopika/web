"use client";

import engines, {
  getDefaultOptions,
  getEngines,
} from "@/scripts/agents/engines";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { Prompt } from "@scoopika/types";
import { Dispatch, SetStateAction } from "react";
import { LuBrainCircuit } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  prompt: Prompt;
  updatePrompt: (prompt: Prompt) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const promptTypeMapping = (type: Prompt["type"]): "text" | "image" => {
  const mapping: Record<Prompt["type"], "text" | "image"> = {
    text: "text",
    json: "text",
    image: "image",
  };

  return mapping[type];
};

const modelsShortname: Record<string, string> = {
  "accounts/fireworks/models/firefunction-v1": "firefunction-v1",
};

export default function PromptEngineSelection({
  prompt,
  updatePrompt,
  open,
  setOpen,
}: Props) {
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            color="default"
            variant="flat"
            className="font-semibold truncate"
            startContent={<LuBrainCircuit size={17} />}
          >
            LLM: {engines[prompt.llm_client].name} {"->"}{" "}
            {modelsShortname[prompt.model] || prompt.model}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm mb-1">Select LLM</p>
          <p className="text-xs opacity-80 mb-4">
            The LLM that will drive this prompt
          </p>

          <div className="flex flex-col gap-3">
            <div className="w-full flex items-center p-1">
              <p className="text-sm w-full">Host:</p>
              <div className="flex items-center justify-end">
                <Select
                  onValueChange={(value) => {
                    updatePrompt({
                      ...prompt,
                      llm_client: value,
                      model:
                        getEngines(prompt.type)[value].models[
                          promptTypeMapping(prompt.type)
                        ][0]?.id || "",
                      options: getDefaultOptions(
                        getEngines(prompt.type)[value].models[
                          promptTypeMapping(prompt.type)
                        ][0]?.options || {}
                      ),
                    });
                  }}
                  defaultValue={prompt.llm_client}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="The model host" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectGroup>
                      {Object.keys(getEngines(prompt.type)).map((key) => (
                        <SelectItem key={`engine-select-${key}`} value={key}>
                          {engines[key].name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full border-t-1"></div>

            <div className="w-full flex items-center p-1">
              <p className="text-sm w-full">Model:</p>
              <div className="flex items-center justify-end">
                <Select
                  onValueChange={(value) => {
                    updatePrompt({
                      ...prompt,
                      model: value,
                      options: getDefaultOptions(
                        getEngines(prompt.type)[prompt.llm_client].models[
                          prompt.type
                        ].filter((m) => m.id === value)[0]?.options || {}
                      ),
                    });
                  }}
                  defaultValue={prompt.model}
                >
                  <SelectTrigger className="truncate max-w-36">
                    <SelectValue placeholder="Select model" className="truncate" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectGroup>
                      {engines[prompt.llm_client] &&
                        engines[prompt.llm_client].models[
                          promptTypeMapping(prompt.type)
                        ].map((model) => (
                          <SelectItem
                            key={`model-select-${model.id}`}
                            value={model.id}
                          >
                            {model.name || model.id}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full border-t-1"></div>

            <p className="text-xs mt-2 text-orange-500 dark:text-orange-300">
              Make sure you have an API key for the selected host. {"you'll"}{" "}
              need to pass it later safely from your code
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
