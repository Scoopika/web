"use client";

import { PromptInput } from "@scoopika/types";
import { useState } from "react";

const textColors: Record<PromptInput["type"], string> = {
  string: "text-green-300",
  number: "text-orange-300",
  boolean: "text-purple-300",
};

const bgColors: Record<PromptInput["type"], string> = {
  string: "bg-green-500/10",
  number: "bg-orange-500/10",
  boolean: "bg-purple-500/10",
};

const bgHoverColors: Record<PromptInput["type"], string> = {
  string: "hover:bg-green-500/20",
  number: "hover:bg-orange-500/20",
  boolean: "hover:bg-purple-500/20",
};

interface Props {
  children: React.ReactNode;
  variable: PromptInput;
  offsetKey: string;
}

export default function VariableSpan({ children, variable, offsetKey }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <span
      data-offset-key={offsetKey}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`text-sm p-1 pl-1.5 pr-1.5 rounded-md relative group ${
        textColors[variable.type]
      } ${bgColors[variable.type]} ${bgHoverColors[variable.type]}`}
    >
      {open && (
        <span className="flex absolute -top left-0 p-2 bg-background z-20 transition-all border-1 text-foreground rounded-md pl-3 pr-3 items-center gap-2">
          <span>{variable.id}</span>
          <span
            className={`p-0.5 pl-1 pr-1 text-xs rounded-md ${
              textColors[variable.type]
            } ${bgColors[variable.type]} ${bgHoverColors[variable.type]}}`}
          >
            {variable.type}
          </span>
        </span>
      )}
      {children}
    </span>
  );
}

interface AvailableProps {
  children: React.ReactNode;
  offsetKey: string;
}

export function InvalidVariableSpan({
  children,
  offsetKey,
}: AvailableProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <span
      data-offset-key={offsetKey}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="p-0.5 pl-1 pr-1 rounded-md bg-red-500/20 text-red-300 relative"
    >
      {open && (
        <span className="flex absolute -top left-0 p-2 bg-background z-20 transition-all border-1 text-foreground rounded-md pl-3 pr-3 items-center gap-2">
          <span>{((children || []) as any)[0]?.props?.text}</span>
          <span className="p-0.5 pl-1 pr-1 text-xs rounded-md text-red-300 bg-red-500/20">
            undefined
          </span>
        </span>
      )}
      {children}
    </span>
  );
}
