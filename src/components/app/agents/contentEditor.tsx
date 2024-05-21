"use client";

import { Prompt, PromptInput } from "@scoopika/types";
import {
  Editor,
  EditorState,
  ContentState,
  CompositeDecorator,
  RichUtils,
} from "draft-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "@/styles/editor.css";
import {
  type AgentVariables,
  matchVariables,
} from "@/scripts/agents/variables";
import VariablesCompletion from "./variablesCompletion";
import VariableSpan, { InvalidVariableSpan } from "./variableSpan";

interface Props {
  prompt: Prompt;
  updatePrompt: Dispatch<SetStateAction<Prompt>>;
  variables: AgentVariables[];
  focus: boolean | undefined;
  updateFocus: Dispatch<SetStateAction<boolean | undefined>>;
  addVariable: (variable: PromptInput) => void;
}

const dollarRegex = /\$\w+/g;

const varRegex = (
  text: string,
  variables: PromptInput[],
  state: "done" | "many" | "none",
  callback: (start: number, end: number) => void,
  allowNone?: boolean,
) => {
  let matchArr: RegExpExecArray | null, start: number;
  while ((matchArr = dollarRegex.exec(text)) !== null) {
    start = matchArr.index;
    const varText = text.substring(start, start + matchArr[0].length);
    const matchVars = matchVariables(varText, variables);

    if (!matchVars && allowNone) {
      callback(start, start + matchArr[0].length);
      continue;
    }

    if (!matchVars || matchVars.state !== state) continue;

    callback(start, start + matchArr[0].length);
  }
};

const VarSpanComp = ({ prompt, props }: { prompt: Prompt; props: any }) => {
  const variable = prompt.inputs.filter(
    (i) => i.id === (props?.children[0]?.props?.text || "").replace("$", ""),
  )[0];

  if (!variable) {
    return null;
  }

  return (
    <VariableSpan variable={variable} offsetKey={props.offsetKey}>
      {props.children}
    </VariableSpan>
  );
};

const PosVarSpanComp = ({
  props,
  updateVariables,
}: {
  props: any;
  updateVariables: (
    key: string,
    value: string,
    position: [number, number],
  ) => any;
}) => {
  useEffect(() => {
    if (props) {
      updateVariables(props?.offsetKey, props?.children[0]?.props?.text, [
        props.start,
        props.end,
      ]);
    }
  }, [props]);

  return (
    <span
      data-offset-key={props.offsetKey}
      className="p-0.5 pl-1 pr-1 rounded-md bg-gray-500/10 relative"
    >
      {props.children}
    </span>
  );
};

export default function PromptContentEditor({
  prompt,
  updatePrompt,
  focus,
  updateFocus,
  variables,
  addVariable,
}: Props) {
  return (
    <textarea
      className="border-0 w-full h-full bg-transparent text-sm resize-none mt-2"
      placeholder="Prompt instructions"
      defaultValue={prompt.content}
      autoFocus
      onInput={(e) => {
        const content = e?.currentTarget?.value;
        updatePrompt((prev) => ({ ...prev, content }));
      }}
    />
  );
}
