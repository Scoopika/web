"use client";

import { Session } from "next-auth";
import { AgentData } from "@scoopika/types";
import { BsPlusCircleDotted } from "react-icons/bs";
import NewAgent from "./new";
import { useState } from "react";
import AgentItem from "./agentItem";
import AgentPreview from "./agentPreview";

interface Props {
  session: Session;
  agents: AgentData[];
}

export default function AgentsMainPage({ session, agents }: Props) {
  const [agentsState, setAgentsState] = useState<AgentData[]>(agents);
  const [filteredAgents, setFilteredAgents] = useState<AgentData[]>(agents);
  const [openAgent, setOpenAgent] = useState<AgentData | undefined>(undefined);
  const [openAgentTab, setOpenAgentTab] = useState<string>();
  const [openAgentFullScreen, setOpenAgentFullScreen] =
    useState<boolean>(false);

  const updateState = (agent: AgentData) => {
    setAgentsState((prev) => [...prev, agent]);
    setFilteredAgents((prev) => [...prev, agent]);
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

    setFilteredAgents((_prev) => agentsState);

    if (openAgent && openAgent.id === agent.id) {
      setOpenAgent(agent);
      setOpenAgentTab(tab);
    }
  };

  const onDelete = (id: string) => {
    setAgentsState((prev) => prev.filter((agent) => agent.id !== id));
    setFilteredAgents((prev) => prev.filter((agent) => agent.id !== id));

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
              Agents are smart AI assistants with access to tools, prompts
              chains, and real-time data.
            </p>
          </div>
        </NewAgent>
      </div>
    );
  }

  return (
    <div className="w-full flex min-h-full max-h-full">
      <div
        className={`w-full p-6 flex flex-col overflow-auto ${
          openAgentFullScreen && "hidden"
        }`}
      >
        <div className="w-full flex items-center gap-4">
          <input
            onInput={(e) => {
              const value = (e?.currentTarget?.value || "").toLowerCase();
              const filtered = agentsState.filter(
                (agent) =>
                  agent.name.toLowerCase().includes(value) ||
                  value.includes(agent.name.toLowerCase())
              );

              setFilteredAgents(filtered);
            }}
            className="h-9 w-full pl-3 pr-3 border-1 rounded-lg text-sm"
            placeholder="Filter agents by name..."
          />
          <NewAgent updateState={updateState} triggerFull={false}>
            <div className="p-2 pl-4 pr-4 h-9 min-w-max bg-foreground text-background rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer transition-all">
              New agent
            </div>
          </NewAgent>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {filteredAgents.map((agent) => (
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
              <div className="w-full border-t-1"></div>
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
