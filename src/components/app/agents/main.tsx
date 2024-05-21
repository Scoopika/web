"use client";

import { Session } from "next-auth";
import { AgentData } from "@scoopika/types";
import { BsPlusCircleDotted } from "react-icons/bs";
import NewAgent from "./new";
import { useState } from "react";
import AgentItem from "./agentItem";
import AgentPreview from "./agentPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";

interface Props {
  session: Session;
  agents: AgentData[];
}

export default function AgentsMainPage({ session, agents }: Props) {
  const isPro =
    session.user.plan === "none" || !session.user.plan.includes(":::")
      ? false
      : true;
  const [agentsState, setAgentsState] = useState<AgentData[]>(agents);
  const [openAgent, setOpenAgent] = useState<AgentData | undefined>(undefined);
  const [openAgentTab, setOpenAgentTab] = useState<string>();
  const [openAgentFullScreen, setOpenAgentFullScreen] =
    useState<boolean>(false);

  const updateState = (agent: AgentData) => {
    setAgentsState((prev) => [...prev, agent]);
    setOpenAgent(agent);
  };

  const updateAgent = (agent: AgentData, tab?: string) => {
    const wantedAgentState: number[] = agentsState
      .map((state, index) => {
        if (state.id === agent.id) {
          return index;
        }
        return undefined;
      })
      .filter((wanted) => wanted !== undefined) as number[];

    if (wantedAgentState.length === 1) {
      setAgentsState((prev) => {
        prev[wantedAgentState[0]] = agent;
        return prev;
      });
    }

    if (openAgent && openAgent.id === agent.id) {
      setOpenAgent(agent);
      setOpenAgentTab(tab);
    }
  };

  const onDelete = (id: string) => {
    setAgentsState((prev) => prev.filter((agent) => agent.id !== id));

    if (openAgent && openAgent.id === id) {
      setOpenAgent(undefined);
    }
  };

  if (agentsState.length < 1) {
    return (
      <div className="p-6 w-full">
        <NewAgent updateState={updateState} triggerFull>
          <div className="w-full p-2 h-96 border-1 rounded-2xl border-dashed border-black/20 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 cursor-pointer flex flex-col items-center justify-center transition-all">
            <BsPlusCircleDotted size={30} className="opacity-80 mb-4" />
            <h3 className="font-semibold">Create your first agent</h3>
            <p className="text-sm opacity-70 mt-2 text-center">
              Agents are smart AI assistants with access to tools, functions, APIs, and real-time data.
            </p>
          </div>
        </NewAgent>
      </div>
    );
  }

  return (
    <div className="w-full flex min-h-full max-h-full">
      {agentsState.length > 0 && (
        <div>Pro plan limit</div>
      )}
      <div
        className={`w-full p-6 flex flex-col overflow-auto ${
          openAgentFullScreen && "hidden"
        }`}
      >
        <div className="w-full flex items-center gap-4">
          <h1 className="w-full flex items-center gap-2">
            Your agents
            <Badge variant="secondary">
              {agentsState.length}
              {"/"}
              {isPro ? "10" : "1"}
            </Badge>
          </h1>
          <NewAgent updateState={updateState} triggerFull={false}>
            <Button
              size="sm"
              color="primary"
              className="font-semibold min-w-max"
              startContent={<FaPlus />}
            >
              New agent
            </Button>
          </NewAgent>
        </div>

        <div
          className={`grid gap-4 mt-6 ${
            !openAgent ? "grid-cols-3" : "grid-cols-1"
          }`}
        >
          {agentsState.map((agent) => (
            <div
              key={`agentItem-${agent.id}`}
              className="w-full flex flex-col gap-4"
            >
              <AgentItem
                onDelete={onDelete}
                agent={agent}
                openAgent={openAgent}
                setOpenAgent={setOpenAgent}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-col transition-all duration-500 overflow-auto ${
          openAgent ? "w-full border-l-1" : "max-w-0"
        }`}
      >
        <AgentPreview
          agent={openAgent}
          updateAgent={updateAgent}
          openId="dummy"
          tab={openAgentTab}
          setOpenAgentTab={setOpenAgentTab}
        />
      </div>
    </div>
  );
}
