"use client";

import { Input } from "@/components/ui/input";
import newApiKey from "@/functions/apikeys/new";
import tryRequest from "@/scripts/tryRequest";
import { Button } from "@nextui-org/react";
import { AgentData, RawEngines } from "@scoopika/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaLock } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PlaygroundChat from "./chat";
import AppHead from "../../head";
import Empty from "../../empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VoiceChat from "./voice";
import PlaygroundAgentItem from "./agentItem";

interface Props {
  agent: AgentData;
  agents: AgentData[];
  apiKeys: string[];
  token: string;
  userId: string;
  voice: boolean;
  plan: string;
}

export default function Playground({
  agent,
  agents,
  apiKeys,
  token,
  userId,
  voice,
  plan,
}: Props) {
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [apiKeyInput, setApiKeyInput] = useState<string | undefined>(undefined);
  const [newKeyLoading, setNewKeyLoading] = useState<boolean>(false);
  const [engines, setEngines] = useState<RawEngines>({});
  const [back, setBack] = useState<boolean>(false);

  const update = async (engines: RawEngines) => {
    await fetch(`https://scoopika-run-35.deno.dev/add-client/${userId}`, {
      method: "POST",
      body: JSON.stringify({ token, engines }),
    });
    await fetch(`https://scoopika-run-35.deno.dev/add-agent/${agent.id}`, {
      method: "POST",
      body: JSON.stringify({ agent }),
    });
  };

  useEffect(() => {
    if (agent) {
      update(engines);
      setApiKey(apiKeys.filter((k) => k === agent.prompts[0]?.llm_client)[0]);
    }
  }, [agent]);

  const addThisTime = () => {
    if (newKeyLoading) return;

    if (!apiKeyInput || apiKeyInput.length < 1) {
      return toast.error("Enter API key to add");
    }

    setApiKey(apiKeyInput);
    setEngines({ [agent.prompts[0].llm_client]: apiKeyInput });
    update({ [agent.prompts[0].llm_client]: apiKeyInput });
  };

  const saveKey = async () => {
    if (newKeyLoading) return;

    if (!apiKeyInput || apiKeyInput.length < 1) {
      return toast.error("Enter API key to save it");
    }

    setNewKeyLoading(true);
    tryRequest<{ success: true; id: string }>({
      loading: "Saving API key",
      success: "Saved key successfully",
      error: "Can't save API key",
      func: async () => {
        const res = await newApiKey(agent.prompts[0].llm_client, apiKeyInput);
        if (!res || !res.success) {
          throw new Error("Error adding API key!");
        }

        return res;
      },
      end: (s) => {
        if (s?.success) {
          setApiKey(apiKeyInput);
          update({ [agent.prompts[0].llm_client]: apiKeyInput });
        }

        setNewKeyLoading(false);
      },
    });
  };

  if (!agent) {
    return (
      <>
        <AppHead
          title="Playground"
          description="Test your agents and chat with them (supports both text & voice chat)"
        />
        {agents.length > 0 ? (
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Your agents</div>
            <div className="text-sm opacity-60">
              Pick an agent to start talking with
            </div>
          </div>
        ) : (
          <Empty
            icon={<RiRobot2Fill />}
            title="Create your first agent"
            description="Create an agent and test it in the playground totally for free. navigate to the agents page, create an agent in few seconds, then come back here to talk with it"
          >
            <Button size="sm" variant="flat" as={Link} href="/app/new-agent">
              Create agent
            </Button>
          </Empty>
        )}
        <div className="w-full flex flex-col items-center justify-center">
          {agents.map((agent) => (
            <PlaygroundAgentItem
              key={`playground-agent-item-${agent.id}`}
              agent={agent}
            />
          ))}
        </div>
        <div className="w-full p-4 border-1 rounded-xl">
          <div className="font-semibold text-sm">Hands up</div>
          <div className="text-sm opacity-80">
            Using your agents in the playground counts to your monthly usage the
            same as using them from your application
          </div>
        </div>
      </>
    );
  }

  if (!apiKey) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <div className="mt-4 text-sm flex items-center gap-1 opacity-70">
            <FaLock />
            API keys are encrypted
          </div>
          <h3 className="">Add API key for {agent.prompts[0].llm_client}</h3>
          <div className="text-xs opacity-80">
            You need to add your API key for the provider this agent is using,
            you can {'"add just this time"'} and the key {"won't"} be saved and
            deleted once you leave this page, or {'"add to my account"'} so{" "}
            {"it's"} saved to your account and always used when you run your
            agent here or from your application.
          </div>
          <Input
            type="password"
            placeholder="Add API Key..."
            className="mt-2"
            defaultValue={apiKeyInput}
            onInput={(e) => {
              const value = e?.currentTarget?.value;
              setApiKeyInput(value);
            }}
          />
          <div className="w-full flex items-center flex-col lg:flex-row gap-3">
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              onPress={() => addThisTime()}
              disabled={newKeyLoading}
            >
              Add just this time
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              isLoading={newKeyLoading}
              onPress={() => saveKey()}
            >
              Add to my account
            </Button>
          </div>
          <DropdownMenu open={back} onOpenChange={setBack}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                startContent={<FaChevronLeft />}
                onPress={() => setBack(true)}
              >
                Go back
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="light"
                startContent={<FaChevronLeft />}
                className="justify-start"
                as={Link}
                href="/app/playground"
              >
                Chat with another agent
              </Button>
              <Button
                size="sm"
                variant="light"
                startContent={<RiRobot2Fill />}
                className="justify-start"
                as={Link}
                href={`/app/agents/${agent.id}`}
              >
                Go to {agent.name} page
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {!voice ? (
        <PlaygroundChat
          userId={userId}
          agent={agent}
          token={token}
          engines={engines}
        />
      ) : (
        <VoiceChat
          userId={userId}
          agent={agent}
          token={token}
          engines={engines}
          plan={plan}
        />
      )}
    </>
  );
}
