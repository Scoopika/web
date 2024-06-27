"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import Link from "next/link";
import { RiVoiceprintFill } from "react-icons/ri";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

interface Props {
  agent: AgentData;
}

export default function PlaygroundAgentItem({ agent }: Props) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:items-center p-4 hover:bg-accent/40 dark:hover:bg-accent/10 gap-4">
        <div className="w-full flex items-center">
          {agent.avatar && agent.avatar.length > 0 ? (
            <img
              src={agent.avatar}
              className="min-w-8 max-w-8 min-h-8 max-h-8 object-cover rounded-2xl"
            />
          ) : (
            <div className="min-w-8 max-w-8 min-h-8 max-h-8 bg-gradient-to-r from-violet-400/30 to-pink-400/30 transition-all rounded-2xl"></div>
          )}
          <div className="w-full flex flex-col gap-0.5 ml-2 truncate">
            <div className="text-sm truncate w-24">{agent.name}</div>
            <div className="text-xs opacity-80 truncate w-24 hidden md:block">
              {agent.description}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-end gap-3">
            <Button
              size="sm"
              variant="flat"
              startContent={<RiVoiceprintFill size={16} />}
              as={Link}
              href={`/app/playground?id=${agent.id}&voice=y`}
            >
              Voice playground
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<HiOutlineChatBubbleBottomCenterText size={16} />}
              as={Link}
              href={`/app/playground?id=${agent.id}`}
            >
              Text playground
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border-b-1 dark:border-accent/60"></div>
    </>
  );
}
