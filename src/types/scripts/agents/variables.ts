import { AgentData, Prompt, PromptInput } from "@scoopika/types";

export interface AgentVariables {
  source: {
    id: string;
    name: string;
  };
  variable: PromptInput;
}

const agentVariables = (agent: AgentData): AgentVariables[] => {
  const savedIds: string[] = [];
  const variables: AgentVariables[] = [];

  for (const prompt of agent.prompts) {
    for (const input of prompt.inputs) {
      if (savedIds.indexOf(input.id) !== -1) {
        continue;
      }

      variables.push({
        source: { name: prompt.variable_name, id: prompt.id },
        variable: input,
      });
      savedIds.push(input.id);
    }
  }

  return variables;
};

export const previousPrompts = (
  agent: AgentData,
  prompt: Prompt
): PromptInput[] => {
  if (agent.prompts.length < 2 || prompt.index === 0) {
    return [];
  }

  const variables: PromptInput[] = agent.prompts
    .slice(prompt.index)
    .map((prompt): PromptInput => {
      return {
        id: prompt.id,
        description: prompt.description,
        type: "string",
      };
    });

  return variables;
};

interface DoneHighlight {
  state: "done";
  variable: PromptInput;
}

interface ManyHighlight {
  state: "many";
  variables: PromptInput[];
}

type Highlight = DoneHighlight | ManyHighlight | null;

export const typesColors = {
  string: "var(--brandgreen)",
  number: "orange-500",
  boolean: "purple-500",
};

export const matchVariables = (
  text: string,
  variables: PromptInput[]
): Highlight => {
  if (!text.startsWith("$")) {
    return null;
  }

  const varId = text.substring(1, text.length);
  const wantedVariable = variables.filter(
    (variable) => variable.id === varId
  )[0];

  if (wantedVariable) {
    return {
      state: "done",
      variable: wantedVariable,
    };
  }

  const matchingVariables = variables.filter(
    (variable) =>
      variable.id.includes(varId) ||
      varId.includes(variable.id) ||
      variable.description?.includes(varId)
  );

  if (matchingVariables.length < 1) {
    return null;
  }

  return {
    state: "many",
    variables: matchingVariables,
  };
};

export default agentVariables;
