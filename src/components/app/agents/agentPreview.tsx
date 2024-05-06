"use client";

import itemValue from "@/scripts/itemValue";
import { Avatar, Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { BsInputCursor } from "react-icons/bs";
import { TbTextRecognition } from "react-icons/tb";
import { BsTextareaT } from "react-icons/bs";
import { MdOutlineInput } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { MdDataset } from "react-icons/md";
import { TbPrompt } from "react-icons/tb";
import AgentConfig from "./config";
import EditAgent from "./edit";
import { TbTools } from "react-icons/tb";
import AgentPrompts from "./tabs/prompts";
import AgentVariablesTab from "./tabs/variables";
import AgentTools from "./tabs/tools";

interface Props {
  agent: AgentData | undefined;
  updateAgent: (agent: AgentData) => void;
  openId: string;
  tab?: string;
  setOpenAgentTab: (tab: string) => void;
}

export const AgentAvatar = ({
  agent,
  shadow,
  size
}: {
  agent: AgentData;
  shadow?: boolean;
  size?: string
}) => {

  let mainSize = size || "min-w-10 max-w-10 min-h-10 max-h-10";

  return (
    <>
      {itemValue(agent, "avatar") ? (
        <div className={`relative ${mainSize}`}>
          <Avatar
            src={agent.avatar}
            className={`${mainSize} rounded-full absolute z-10`}
          ></Avatar>
          {shadow !== false && (
            <Avatar
              src={agent.avatar}
              className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-full absolute blur-2xl top-0 left-0 z-0"
            ></Avatar>
          )}
        </div>
      ) : (
        <div className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl flex items-center justify-center bg-accent/50">
          <RiRobot2Fill />
        </div>
      )}
    </>
  );
};

export default function AgentPreview({
  agent,
  updateAgent,
  openId,
  tab,
  setOpenAgentTab,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>(tab || "Prompts");
  const [id, setId] = useState<string>(String(crypto.randomUUID()));

  useEffect(() => {
    setActiveTab(tab || "Prompts");
    setId(openId);
  }, [agent, openId]);

  if (!agent) {
    return null;
  }

  const tabs = [
    {
      id: "Prompts",
      icon: <TbPrompt size={17} />,
      component: () => (
        <AgentPrompts agent={agent} updateAgent={updateAgent} openId={openId} />
      ),
    },
    {
      id: "Variables",
      icon: <TbTextRecognition size={18} />,
      component: () => (
        <AgentVariablesTab
          agent={agent}
          updateAgent={updateAgent}
          openId={openId}
        />
      ),
    },
    {
      id: "Tools",
      icon: <TbTools size={16} />,
      component: () => <AgentTools agent={agent} updateAgent={updateAgent} />,
    },
  ];

  return (
    <>
      <div className="w-full p-6 pb-0 flex flex-col gap-3">
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
      <div className="w-full flex items-center gap-3 p-6 pb-4 border-b-1 mb-6">
        {tabs.map((tab) => (
          <Button
            key={`tab-${agent.id}-${tab.id}`}
            startContent={tab.icon}
            size="sm"
            color="default"
            className="min-w-max"
            variant={tab.id === activeTab ? "flat" : "light"}
            onPress={() => {
              setActiveTab(tab.id);
              setOpenAgentTab(tab.id);
            }}
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