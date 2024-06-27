"use client";

import { Input } from "@/components/ui/input";
import engines, {
  getDefaultOptions,
} from "@/scripts/agents/engines";
import { AgentData } from "@scoopika/types";
import { useState } from "react";
import AgentAvatar from "./avatar";
import SettingsRow from "../settingsRow";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import AgentLLM from "./llm";
import LLMOptions from "./llmOptions";
import { Button } from "@nextui-org/react";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import itemValue from "@/scripts/itemValue";
import { toast } from "sonner";
import tryRequest from "@/scripts/tryRequest";
import createAgent from "@/functions/agents/create";

const voices = [
  { id: "aura-orpheus-en", name: "Orpheus", type: "American male" },
  { id: "aura-luna-en", name: "Luna", type: "American female" },
];

export default function NewAgent() {
  const [noAvatar, setNoAvatar] = useState<boolean>(false);
  const [avatarOpen, setAvatarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [agent, setAgent] = useState<AgentData>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
    voice: voices[0].id,
    chained: false,
    prompts: [
      {
        type: "text",
        id: "default-prompt",
        variable_name: "default",
        index: 0,
        inputs: [],
        llm_client: "openai",
        model: "gpt-3.5-turbo",
        content: "You are a helpful AI assistant",
        options: getDefaultOptions(engines.openai.models.text[0].options),
      },
    ],
    tools: [],
    in_tools: [],
  });

  const create = async () => {
    if (loading) return;

    setLoading(true);
    tryRequest({
      loading: "Creating agent...",
      success: "Created agent!",
      error: "Can't create agent",
      func: async () => {
        const res = await createAgent(agent);
        if (res?.success === false) {
          throw new Error("Unable to create a new agent. contact support!");
        }
      },
      end: () => {
        setLoading(false);
      }
    })
  };

  const checkData = () => {
    if (!itemValue(agent, "name")) {
      return toast.error("Enter agent info", {
        description: "Agent name is required",
      });
    }

    if (!agent.avatar) return setNoAvatar(true);

    create();
  };

  return (
    <div className="w-full flex flex-col">
      <AgentAvatar
        agent={agent}
        updateAgent={setAgent}
        avatarOpen={avatarOpen}
        setAvatarOpen={setAvatarOpen}
      />
      <SettingsRow
        title="Agent name"
        description="Name your agent so its aware of who it is"
      >
        <Input
          defaultValue={agent.name}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setAgent((prev) => ({ ...prev, name: value || "" }));
          }}
          placeholder="Agent name"
        />
      </SettingsRow>
      <SettingsRow
        title="Agent description"
        description="Briefly describe what your agent does (useful for collaboration)"
      >
        <Input
          defaultValue={agent.description}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setAgent((prev) => ({ ...prev, description: value }));
          }}
          placeholder="Agent description"
        />
      </SettingsRow>
      <SettingsRow
        title="LLM"
        description="Select the large language model powering this agent. you can extend the supported providers or input custom LLMs (a fine-tuned GPT for example). learn more in the providers docs"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
        <AgentLLM agent={agent} updateAgent={setAgent} />
        <LLMOptions agent={agent} updateAgent={setAgent} />
        </div>
      </SettingsRow>
      <SettingsRow
        title="System prompt"
        description={`Give your agent instructions on how to act and communicate with users. This can be changed later`}
      >
        <textarea
          className="w-full h-48 border-0 outline-none p-4 text-sm rounded-t-md rounded-b-2xl resize-none mt-3"
          placeholder="Enter prompt instructions"
          defaultValue={agent.prompts[0].content}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setAgent((prev) => ({
              ...prev,
              prompts: [{ ...prev.prompts[0], content: value }],
            }));
          }}
        />
      </SettingsRow>
      <SettingsRow
        title="Change voice"
        description="Change the voice that this agent will use when speaking"
      >
        <div className="flex flex-wrap gap-4">
          {voices.map((v, index) => (
            <Button
              key={`voiceselect-${index}`}
              className="font-semibold"
              size="sm"
              variant={agent.voice === v.id ? "solid" : "bordered"}
              color="default"
              onPress={() => setAgent(prev => ({...prev, voice: v.id}))}
              startContent={agent.voice === v.id && <FaCheck />}
            >
              {v.name}: {v.type}
            </Button>
          ))}
        </div>
      </SettingsRow>
      <p className="text-xs opacity-70 mt-3">
        Knowledge, tools, and companions can be set later
      </p>
      <div className="w-full flex items-center justify-end p-4">
        <Button
          size="sm"
          color="primary"
          className="font-semibold w-full lg:max-w-max"
          endContent={<FaChevronRight />}
          onPress={() => checkData()}
          isLoading={loading}
        >
          Create agent
        </Button>
      </div>

      <Dialog open={noAvatar} onOpenChange={setNoAvatar}>
        <DialogContent className="dark:border-white/20">
          <h3 className="font-semibold">Your agent has no avatar!</h3>
          <p className="text-sm opacity-80">
            The agent avatar will be shown in the platform and you can show it
            in your application. you can generate avatars using AI!
          </p>
          <div className="w-full flex flex-col lg:flex-row lg:justify-end gap-4">
            <Button
              size="sm"
              variant="flat"
              className="font-semibold"
              onPress={() => {
                setNoAvatar(false);
                create();
              }}
            >
              Continue without avatar
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="font-semibold"
              onPress={() => {
                setNoAvatar(false);
                setAvatarOpen(true);
              }}
            >
              Add avatar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
