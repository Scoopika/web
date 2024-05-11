"use client";

import { Prompt } from "@scoopika/types";
import { IoMdSettings } from "react-icons/io";
import { Button } from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Model, getOptions } from "@/scripts/agents/engines";
import { Slider } from "@/components/ui/slider";

interface Props {
  prompt: Prompt;
  setPrompt: Dispatch<SetStateAction<Prompt>>;
}

export default function EngineOptions({ prompt, setPrompt }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Model["options"]>({});
  const [usedOptions, setUsedOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    setOptions(getOptions(prompt));
    setUsedOptions(prompt.options);
  }, [prompt]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button isIconOnly size="sm" color="default" variant="flat">
          <IoMdSettings size={17} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 overflow-auto">
        <div className="flex flex-col gap-2 w-full">
          {options &&
            Object.keys(options).map((key) => (
              <div
                key={`engineoptions-${key}`}
                className="flex flex-col w-full gap-2"
              >
                <p className="text-sm opacity-80 flex items-center gap-2">
                  {key}
                  <span className="text-xs opacity-90 p-1 pl-1.5 pr-1.5 bg-accent/30 rounded-md">
                    {usedOptions[key]}
                  </span>
                </p>
                <Slider
                  defaultValue={[usedOptions[key] || options[key].default]}
                  min={options[key].min}
                  max={options[key].max}
                  step={options[key].step}
                  onValueChange={(v: number[]) => {
                    setPrompt((prev) => ({
                      ...prev,
                      options: { ...prev.options, [key]: v[0] },
                    }));
                  }}
                />
                <div className="w-full mt-1"></div>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
