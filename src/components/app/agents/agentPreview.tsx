"use client";

import itemValue from "@/scripts/itemValue";
import { Avatar, Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import EditAgent from "./edit";
import AgentPrompts from "./tabs/prompts";
import AgentDocs from "./docs";
import { FaCode } from "react-icons/fa6";

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
  size,
}: {
  agent: AgentData;
  shadow?: boolean;
  size?: string;
}) => {
  let mainSize = size || "min-w-12 max-w-12 min-h-12 max-h-12";

  return (
    <>
      {itemValue(agent, "avatar") ? (
        <div className={`relative ${mainSize}`}>
          <Avatar
            src={agent.avatar}
            className={`${mainSize} rounded-xl border-3 border-accent/40 absolute z-12`}
          ></Avatar>
        </div>
      ) : (
        <div className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-xl flex items-center justify-center bg-accent/50">
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
    setActiveTab(tab || "Prompt");
    setId(openId);
  }, [agent, openId]);

  if (!agent) {
    return null;
  }

  return (
    <>
      <div className="w-full p-10 pb-0 flex flex-col gap-4 relative">
        <div className="flex flex-col items-center gap-2">
          <AgentAvatar agent={agent} />
          <h3 className="font-semibold text-sm w-full text-center truncate">
            {agent.name}
          </h3>
          <div className="min-w-max flex items-center justify-end absolute top-4 right-4 gap-4">
            <AgentDocs agent={agent}>
              <Button isIconOnly size="sm" color="default" variant="flat">
                <FaCode size={16} />
              </Button>
            </AgentDocs>
            <EditAgent agent={agent} updateAgent={updateAgent} />
          </div>
        </div>
        {itemValue(agent, "description") && (
          <p className="text-sm opacity-70 text-center mb-4">
            {agent.description}
          </p>
        )}
      </div>
      <AgentPrompts agent={agent} updateAgent={updateAgent} openId={openId} />
    </>
  );
}
