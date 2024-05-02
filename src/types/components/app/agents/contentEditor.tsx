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
  allowNone?: boolean
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
    (i) => i.id === (props?.children[0]?.props?.text || "").replace("$", "")
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
    position: [number, number]
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
  const [usedVariables, setUsedVariables] = useState<Record<string, string>>(
    {}
  );
  const [completionOpen, setCompletionOpen] = useState<boolean>(false);
  const [latestVariable, setLatestVariable] = useState<string | undefined>();
  const [latestPosition, setLatestPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const updateUsedVariables = (
    key: string,
    value: string,
    position: [number, number]
  ) => {
    const used = usedVariables[key];
    if (!used || (value && used !== value)) {
      setLatestVariable(value);
      setCompletionOpen(true);
      setUsedVariables((prev) => ({ ...prev, key: value }));
      setLatestPosition(position);
    } else {
      setCompletionOpen(false);
    }
  };

  const decorators = new CompositeDecorator([
    {
      strategy: (contentBlock, callback) => {
        varRegex(contentBlock.getText(), prompt.inputs, "done", callback);
      },
      component: (props) => <VarSpanComp prompt={prompt} props={props} />,
    },
    {
      strategy: (contentBlock, callback) => {
        varRegex(
          contentBlock.getText(),
          [...prompt.inputs, ...variables.map((v) => v.variable)],
          "many",
          callback
        );
      },
      component: (props) => (
        <PosVarSpanComp props={props} updateVariables={updateUsedVariables} />
      ),
    },
    {
      strategy: (contentBlock, callback) => {
        varRegex(
          contentBlock.getText(),
          [...prompt.inputs, ...variables.map((v) => v.variable)],
          "none",
          callback,
          true
        );
      },
      component: (props) => {
        return (
          <InvalidVariableSpan offsetKey={props.offsetKey}>
            {props.children}
          </InvalidVariableSpan>
        );
      },
    },
  ]);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(prompt.content),
      decorators
    )
  );
  const [editorRef, setEditorRef] = useState<Editor>();

  const setRef = (ref: Editor) => {
    setEditorRef(ref);
    if (focus) {
      editorRef?.focus();
    } else {
      editorRef?.blur();
    }
  };

  const updateState = (state: EditorState) => {
    const stringContent: string = state.getCurrentContent().getPlainText();
    setCompletionOpen(false);
    updatePrompt((prev) => ({ ...prev, content: stringContent }));
    setEditorState(state);
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <>
      {completionOpen === true &&
        variables.length + prompt.inputs.length !== 0 && (
          <VariablesCompletion
            prompt={prompt}
            variables={variables}
            latestVariable={latestVariable}
            addVariable={addVariable}
            close={() => {
              setCompletionOpen(false);
            }}
            selectVariable={(value: string) => {
              if (!latestVariable || !latestPosition) {
                return;
              }

              const startText = prompt.content.substring(0, latestPosition[0]);
              const endText = prompt.content.substring(latestPosition[1]);
              const finalText = `${startText}${value}${endText}`;

              let newState = EditorState.createWithContent(
                ContentState.createFromText(finalText),
                decorators
              );

              newState = EditorState.moveFocusToEnd(newState);
              setEditorState(newState);

              updatePrompt((prev) => ({
                ...prev,
                content: finalText,
              }));

              setCompletionOpen(false);
              setLatestVariable(undefined);
            }}
          />
        )}
      <div
        data-vaul-no-drag
        className="min-h-56 max-h-56 p-3 pl-0 pr-0 cursor-text relative"
        onClick={() => {
          if (editorRef) {
            editorRef.focus();
          }
        }}
      >
        <Editor
          data-vaul-no-drag
          editorKey="prompt-content-editor"
          editorState={editorState}
          placeholder="Prompt instructions..."
          onChange={updateState}
          handleKeyCommand={handleKeyCommand}
          ref={setRef}
          onBlur={() => updateFocus(false)}
          onFocus={() => updateFocus(true)}
        />
      </div>
    </>
  );
}
