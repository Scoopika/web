"use client";

import itemValue from "@/scripts/itemValue";
import { Avatar, Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineInput } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { TbPrompt } from "react-icons/tb";
import AgentConfig from "./config";
import EditAgent from "./edit";
import AgentPrompts from "./tabs/prompts";
import AgentVariablesTab from "./tabs/variables";

interface Props {
  agent: AgentData | undefined;
  updateAgent: (agent: AgentData) => void;
  openId: string;
  tab?: string;
}

const AgentAvatar = ({ agent }: { agent: AgentData }) => {
  return (
    <>
      {itemValue(agent, "avatar") ? (
        <div className="relative min-w-10 max-w-10 min-h-10 max-h-10">
          <Avatar
            src={agent.avatar}
            className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-full absolute z-10"
          ></Avatar>
          <Avatar
            src={agent.avatar}
            className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-full absolute blur-2xl top-0 left-0 z-0"
          ></Avatar>
        </div>
      ) : (
        <div className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl flex items-center justify-center bg-accent/50">
          <RiRobot2Fill />
        </div>
      )}
    </>
  );
};

export default function AgentPreview({ agent, updateAgent, openId, tab }: Props) {
  const [activeTab, setActiveTab] = useState<string>(tab || "Prompts");
  const [id, setId] = useState<string>(String(crypto.randomUUID()));

  useEffect(() => {
    setActiveTab(tab || "Prompts");
    setId(openId);
  }, [agent, openId]);

  if (!agent) {
    return null
  }

  const tabs = [
    {
      id: "Prompts",
      icon: <TbPrompt size={17} />,
      component: () => <AgentPrompts agent={agent} updateAgent={updateAgent} openId={openId} />,
    },
    {
      id: "Variables",
      icon: <MdOutlineInput size={16} />,
      component: () => <AgentVariablesTab agent={agent} updateAgent={updateAgent} openId={openId} />,
    },
    {
      id: "Tools",
      icon: <BsFillGridFill size={16} />,
      component: () => <AgentConfig agent={agent} />,
    },
  ];

  return (
    <>
      <div className="w-full p-6 border-b-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <AgentAvatar agent={agent} />
          <h3 className="font-semibold text-sm w-full truncate">
            {agent.name}
          </h3>
          <div className="min-w-max flex items-center justify-end">
            <EditAgent agent={agent} updateAgent={updateAgent} />
          </div>
        </div>
        {itemValue(agent, "description") && (
          <p className="text-sm opacity-70">{agent.description}</p>
        )}
      </div>
      <div className="w-full flex items-center gap-3 p-6">
        {tabs.map((tab) => (
          <Button
            key={`tab-${agent.id}-${tab.id}`}
            startContent={tab.icon}
            size="sm"
            color="default"
            variant={tab.id === activeTab ? "flat" : "light"}
            onPress={() => setActiveTab(tab.id)}
          >
            {tab.id}
          </Button>
        ))}
      </div>
      {tabs
        .filter((tab) => tab.id === activeTab)
        .map((tab) => (
          <div key={`tabwindow-${agent.id}-${tab.id}`}>{tab.component()}</div>
        ))}
    </>
  );
}
