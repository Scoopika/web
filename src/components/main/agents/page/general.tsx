"use client";

import { AgentData } from "@scoopika/types";
import SettingsRow from "../../settingsRow";
import AgentLLM from "../llm";
import { useState } from "react";
import LLMOptions from "../llmOptions";
import { Button } from "@nextui-org/react";
import { FaChevronRight, FaCircleInfo } from "react-icons/fa6";
import tryRequest from "@/scripts/tryRequest";
import updateAgentData from "@/functions/agents/update";
import AppHead from "../../head";

interface Props {
  agent: AgentData;
  apiKeys: string[];
}

export default function AgentGeneral({ agent, apiKeys }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>(agent);

  const save = async () => {
    if (loading) return;

    setLoading(true);
    tryRequest<Boolean>({
      loading: "Saving changes...",
      success: "Saved changes!",
      error: "Can't save changes",
      func: async () => {
        const res = await updateAgentData(agent.id, data);
        if (!res || !res.success) {
          throw new Error("Try again later or contact support!");
        }

        return res.success;
      },
      end: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <AppHead
        title="General"
        description="Manage the agent's prompt and LLM"
      />
      <SettingsRow
        title="System prompt"
        description={`Give your agent instructions on how to act and communicate with users`}
      >
        <textarea
          className="w-full h-48 border-0 outline-none p-4 text-sm rounded-t-md rounded-b-2xl resize-none mt-3 bg-accent dark:bg-accent/30 border-1"
          placeholder="Enter prompt instructions"
          defaultValue={agent.prompts[0].content}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setData((prev) => ({
              ...prev,
              prompts: [{ ...prev.prompts[0], content: value }],
            }));
          }}
        />
      </SettingsRow>
      <SettingsRow
        title="LLM"
        description="Select the LLM that will power this agent"
      >
        <div className="flex flex-col md:flex-row gap-4 w-full md:items-center">
          <AgentLLM agent={data} updateAgent={setData} />
          <LLMOptions agent={data} updateAgent={setData} />
        </div>
      </SettingsRow>
      {apiKeys.indexOf(agent.prompts[0].llm_client) === -1 && (
        <div className="w-full p-4 flex flex-col gap-2 text-xs border-1 rounded-xl bg-accent/20 mt-4">
          <FaCircleInfo size={16} className="opacity-70" />
          This agent uses {agent.prompts[0].llm_client} and you {"don't"} have
          an API key added to your account. make sure to pass it safely from your code
          or add it to your account by clicking on the settings icon.
        </div>
      )}
      <div className="w-full flex items-center justify-end p-4">
        <Button
          size="sm"
          color="primary"
          className="font-semibold w-full lg:max-w-max"
          endContent={<FaChevronRight />}
          onPress={() => save()}
          isLoading={loading}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
