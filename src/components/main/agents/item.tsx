"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import Link from "next/link";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaHashtag,
} from "react-icons/fa6";
import { MdCode, MdEdit, MdSettings } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "sonner";
import { AiFillApi } from "react-icons/ai";
import { RiChatVoiceFill } from "react-icons/ri";

interface Props {
  agent: AgentData;
}

export default function AgentItem({ agent }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <>
      <div
        // href={`/app/agents/${agent.id}`}
        className="w-full flex items-center p-4 hover:bg-accent/40 dark:hover:bg-accent/10 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="w-full flex items-center">
          {agent.avatar && agent.avatar.length > 0 ? (
            <img
              src={agent.avatar}
              className="w-8 h-8 object-cover rounded-2xl"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-violet-400/30 to-pink-400/30 transition-all rounded-2xl"></div>
          )}
          <div className="w-full flex flex-col gap-0.5 ml-2 truncate">
            <div className="text-sm truncate w-24">{agent.name}</div>
            <div className="text-xs opacity-80 truncate w-24 hidden md:block">
              {agent.description}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="flex items-center p-1 pl-2 pr-2 bg-accent/40 rounded-lg gap-3 hidden lg:flex">
            <Tooltip content="Manage agent" size="sm">
              <Button
                size="sm"
                variant="light"
                as={Link}
                href={`/app/agents/${agent.id}`}
                startContent={<MdSettings size={16} />}
                isIconOnly
              />
            </Tooltip>
            {!expand && (
              <Button
                size="sm"
                variant="light"
                className="group"
                startContent={
                  <FaChevronRight
                    size={9}
                    className="opacity-70 group-hover:opacity-100"
                  />
                }
                isIconOnly
                onPress={() => setExpand(true)}
              />
            )}
            {expand && (
              <>
                <Tooltip content="Playground" size="sm">
                  <Button
                    size="sm"
                    variant="light"
                    as={Link}
                    href={`/app/playground?id=${agent.id}`}
                    startContent={<RiChatVoiceFill size={16} />}
                    isIconOnly
                  />
                </Tooltip>
                <Tooltip content="Code" size="sm">
                  <Button
                    size="sm"
                    variant="light"
                    as={Link}
                    aria-label="Code"
                    href={`/app/agents/${agent.id}?tab=code`}
                    startContent={<MdCode size={16} />}
                    isIconOnly
                  />
                </Tooltip>
                <Button
                  size="sm"
                  variant="light"
                  className="group"
                  startContent={
                    <FaChevronLeft
                      size={9}
                      className="opacity-70 group-hover:opacity-100"
                    />
                  }
                  isIconOnly
                  onPress={() => setExpand(false)}
                />
              </>
            )}
          </div>
          <div className="w-full flex items-center justify-end">
            <FaChevronDown
              size={11}
              className={`opacity-70 group-hover:opacity-100 transition-all ${
                open && "rotate-[180deg]"
              }`}
            />
          </div>
        </div>
      </div>
      {open && (
        <div className="bg-accent dark:bg-accent/30 p-6 flex flex-col gap-6 text-xs">
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="flex flex-col gap-1 w-full">
              <div className="opacity-70">Provider</div>
              <div className="truncate w-36">{`${agent.prompts[0].llm_client}`}</div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="opacity-70">LLM</div>
              <div className="truncate w-36">{`${agent.prompts[0].model}`}</div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full">
              <div className="opacity-70 mb-2">Agent details</div>
              <div
                className="flex items-center gap-1.5 cursor-pointer hover:underline opacity-90 mb-1"
                onClick={() => {
                  navigator.clipboard.writeText(agent.id);
                  toast.success("Copied agent ID");
                }}
              >
                <FaHashtag />
                {agent.id.split("-")[0]}
              </div>
              <div className="flex items-center gap-1.5 opacity-90 mb-1">
                <AiFillApi />
                <div className="">
                  {
                    (agent?.in_tools || []).filter((t) => t.type === "api")
                      .length
                  }{" "}
                  APIs
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-90">
                <RiRobot2Fill />
                <div className="">
                  {
                    (agent?.in_tools || []).filter((t) => t.type === "agent")
                      .length
                  }{" "}
                  Companions
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="opacity-80">Voice</div>
              <div>{`${agent.voice || "default"}`}</div>
            </div>
          </div>
          <div className="flex md:flex-row md:items-center gap-3">
            <Button
              size="sm"
              variant="bordered"
              startContent={<MdSettings size={15} />}
              as={Link}
              href={`/app/agents/${agent.id}`}
            >
              Manage agent
            </Button>

            <Button
              size="sm"
              variant="bordered"
              startContent={<RiChatVoiceFill size={15} />}
              as={Link}
              href={`/app/playground/?id=${agent.id}`}
            >
              Playground
            </Button>
          </div>
        </div>
      )}
      <div className="w-full border-b-1 dark:border-accent/60"></div>
    </>
  );
}
