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
import { RawBoxData } from "@/types/rawBox";
import { BsStars } from "react-icons/bs";

interface Props {
  box: RawBoxData;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateBox: (box: RawBoxData) => void;
}

const modelsShortname: Record<string, string> = {
  "accounts/fireworks/models/firefunction-v1": "firefunction-v1",
};

export default function BoxEngineSelection({
  box,
  open,
  setOpen,
  updateBox,
}: Props) {
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            color="default"
            variant="flat"
            className="font-semibold"
            startContent={<LuBrainCircuit size={17} />}
          >
            LLM: {engines[box.llm_client].name} {"->"}{" "}
            {modelsShortname[box.manager] || box.manager}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm mb-1">Select LLM</p>
          <p className="text-xs opacity-80 mb-4">
            The LLM that will drive this box
          </p>

          <div className="flex flex-col gap-3">
            <div className="w-full flex items-center p-1">
              <p className="text-sm w-full">Host:</p>
              <div className="flex items-center justify-end">
                <Select
                  defaultValue={box.llm_client}
                  onValueChange={(value) => {
                    updateBox({
                      ...box,
                      llm_client: value,
                      manager:
                        getEngines("text")[value].models["text"][0]?.id || "",
                    });
                  }}
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

            <div className="w-full border-t-1"></div>

            <div className="w-full flex items-center p-1">
              <p className="text-sm w-full">Model:</p>
              <div className="flex items-center justify-end">
                <Select
                  defaultValue={box.manager}
                  onValueChange={(value) => {
                    updateBox({ ...box, manager: value });
                  }}
                >
                  <SelectTrigger className="truncate max-w-36">
                    <SelectValue
                      className="truncate"
                      placeholder="Select model"
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectGroup>
                      {engines[box.llm_client] &&
                        engines[box.llm_client].models["text"].map((model) => (
                          <SelectItem
                            key={`model-select-${model.id}`}
                            value={model.id}
                          >
                            <div className="text-sm flex items-center gap-1">
                              {model.recommended && <BsStars />}
                              {model.name || model.id}
                            </div>
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
