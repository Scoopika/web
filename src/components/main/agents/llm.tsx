"use client";

import engines, {
  defaultOptions,
  getDefaultOptions,
  getEngines,
  modelsShortname,
  providers,
} from "@/scripts/agents/engines";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  agent: AgentData;
  updateAgent: Dispatch<SetStateAction<AgentData>>;
}

export default function AgentLLM({ agent, updateAgent }: Props) {
  const [provider, setProvider] = useState<string>(agent.prompts[0].llm_client);

  const changeProvider = (value: string) => {
    setProvider(value);
    updateAgent((prev) => ({
      ...prev,
      prompts: [
        {
          ...prev.prompts[0],
          llm_client: value,
        },
      ],
    }));
  };

  const changeModel = (value: string) => {
    updateAgent((prev) => ({
      ...prev,
      prompts: [
        {
          ...prev.prompts[0],
          model: value,
          options: getDefaultOptions(
            (
              getEngines("text")?.[prev.prompts[0].llm_client]?.models[
                "text"
              ] || []
            ).filter((m) => m?.id === value)[0]?.options || defaultOptions,
          ),
        },
      ],
    }));
  };

  return (
    <>
      <Autocomplete
        placeholder="Select provider"
        defaultInputValue={agent.prompts[0].llm_client}
        allowsCustomValue
        onInputChange={(value) => changeProvider(value)}
        onSelectionChange={(value) => {
          if (!value) return;
          changeProvider(value.toString());
        }}
        variant="bordered"
        color="secondary"
      >
        {providers.map((provider) => (
          <AutocompleteItem
            key={provider}
            value={provider}
            textValue={provider}
          >
            {provider}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        placeholder="Select model"
        defaultInputValue={agent.prompts[0].model}
        defaultItems={[]}
        allowsCustomValue
        onInputChange={(value) => changeModel(value)}
        onSelectionChange={(value) => {
          if (!value) return;
          changeModel(value.toString());
        }}
        variant="bordered"
        color="secondary"
      >
        {(engines?.[provider]?.models?.["text"] || []).map((model) => (
          <AutocompleteItem
            key={model.id}
            value={model.id}
            textValue={model.id}
          >
            <div className="text-sm flex items-center gap-1">
              {model.name || model.id}
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
