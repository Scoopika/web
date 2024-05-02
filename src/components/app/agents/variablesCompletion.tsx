import { AgentVariables } from "@/scripts/agents/variables";
import { Prompt, PromptInput } from "@scoopika/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const typesColors = {
  string: "text-green-500",
  number: "text-orange-500",
  boolean: "text-purple-500",
};

interface Props {
  prompt: Prompt;
  variables: AgentVariables[];
  latestVariable: string | undefined;
  addVariable: (variable: PromptInput) => void;
  selectVariable: (content: string) => void;
  close: () => void;
}

export default function VariablesCompletion({
  prompt,
  variables,
  latestVariable,
  selectVariable,
  addVariable,
  close,
}: Props) {
  const [all, _setAll] = useState<AgentVariables[]>([
    ...prompt.inputs
      .filter((i) => i.id.includes((latestVariable || "").replace("$", "")))
      .map((i) => ({
        source: {
          id: prompt.id,
          name: prompt.variable_name,
        },
        variable: i,
      })),
    ...variables.filter(
      (v) => prompt.inputs.filter((i) => i.id === v.variable.id).length === 0
    ),
  ]);
  const [focused, setFocused] = useState<number>(0);

  const getActive = () => {
    return all[focused];
  };

  useEffect(() => {
    const scrollToFocused = (index: number) => {
      const focusedElement = document.getElementById(
        `variablecompletion-${index}`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };

    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === " " && e.ctrlKey) {
        e.preventDefault();
        const active = getActive();
        if (active.source.id !== prompt.id) {
          addVariable(active.variable);
        }
        selectVariable(`$${active.variable.id}`);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (all.length - 1 > focused && all.length !== 1) {
          scrollToFocused(focused + 1);
          setFocused(focused + 1);
        }
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (focused !== 0) {
          scrollToFocused(focused - 1);
          setFocused(focused - 1);
        }
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [prompt, variables, latestVariable, focused]);

  return (
    <div className="absolute w-full bottom-0 left-0 p-3 bg-background border-t-1 flex flex-col gap-2 min-h-36 max-h-36 overflow-auto z-20">
      <div className="w-full flex items-center">
        <div className="text-xs w-full">Variables completion</div>
        <div className="min-w-max text-xs flex items-center gap-2">
          <p className="flex items-center gap-1">
            Navigate with
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 border-1">
              <span className="text-xs">↑</span>
            </kbd>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 border-1">
              <span className="text-xs">↓</span>
            </kbd>
          </p>
          <div className="h-full w-1 border-r-1"></div>
          <p className="flex items-center gap-1">
            Select with
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 border-1">
              <span className="text-xs">ctrl + space</span>
            </kbd>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-3">
        {all.map((variable, index) =>
          variable.variable.id.includes(
            String(latestVariable || "").replace("$", "")
          ) ? (
            <div
              id={`variablecompletion-${index}`}
              key={`variablecompletion-${index}`}
              className={`w-full p-1.5 pl-3 pr-3 text-sm rounded-md flex items-center ${
                index === focused && "bg-black/20 dark:bg-accent/50"
              }`}
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1">
                  {variable.variable.id}:
                  <span className={`${typesColors[variable.variable.type]}`}>
                    {variable.variable.type}
                  </span>
                </div>
                {variable.variable.description && (
                  <p className="text-xs opacity-80 mt-1">
                    {variable.variable.description}
                  </p>
                )}
              </div>
              {variable.source.id !== prompt.id && (
                <div className="min-w-max text-sm opacity-80">
                  Import from: {variable.source.name}
                </div>
              )}
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}
