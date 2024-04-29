"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import cleanText from "@/scripts/cleanText";
import itemValue from "@/scripts/itemValue";
import { Avatar, Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuLayoutList } from "react-icons/lu";
import { PiChatsFill } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import DeleteAgent from "./delete";

interface Props {
  agent: AgentData;
  openAgent: AgentData | undefined;
  setOpenAgent: Dispatch<SetStateAction<AgentData | undefined>>;
  onDelete: (id: string) => void;
}

export default function AgentItem({
  agent,
  openAgent,
  setOpenAgent,
  onDelete,
}: Props) {
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <div
      key={`agent-${agent.id}`}
      className="w-full flex flex-col p-3 gap-3 overflow-hidden group transition-all"
      onMouseEnter={() => setHovered(agent.id)}
      onMouseLeave={() => setHovered(undefined)}
    >
      <div className="w-full flex items-center gap-3">
        <div
          className="relative rounded-xl transition-all duration-500"
          style={
            hovered === agent.id
              ? {
                  boxShadow: "0px 0px 80px 0px rgba(255, 255, 255, .5)",
                }
              : {}
          }
        >
          <div className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-background-70 backdrop-blur rounded-full flex items-center justify-center p-1 rotate-[-10deg]">
            {agent.chained ? <LuLayoutList /> : <PiChatsFill />}
          </div>
          {itemValue(agent, "avatar") ? (
            <Avatar
              src={agent.avatar}
              className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl border-1"
            ></Avatar>
          ) : (
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl flex items-center justify-center bg-accent/50">
              <RiRobot2Fill />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Link
            href={`/app/agents/${agent.id}`}
            className="text-sm truncate hover:underline transition-all"
          >
            {agent.name}
          </Link>
          <div className="text-xs opacity-70 truncate">
            @{cleanText(agent.name)}
          </div>
        </div>
        <div
          className={`w-full flex items-center justify-end gap-1.5 ${
            (!openAgent || openAgent.id !== agent.id) && !dropdown
              ? "translate-x-[5px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
              : ""
          }`}
        >
          <Button
            isIconOnly
            size="sm"
            color={
              !openAgent || openAgent.id !== agent.id ? "default" : "primary"
            }
            variant="flat"
            onPress={() => {
              if (openAgent && openAgent.id === agent.id) {
                setOpenAgent(undefined);
                return;
              }

              setOpenAgent(agent);
            }}
          >
            <TbLayoutSidebarRightExpandFilled size={16} />
          </Button>
          <DropdownMenu open={dropdown} onOpenChange={setDropdown}>
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <Button
              isIconOnly
              size="sm"
              color="default"
              variant="flat"
              onPress={() => setDropdown(true)}
            >
              <BsThreeDots size={15} />
            </Button>
            <DropdownMenuContent className="bg-background z-20">
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                <div className="text-red-400 flex items-center gap-2">
                  <MdDelete size={17} />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        {itemValue(agent, "description") && (
          <p className="text-sm opacity-70">{agent.description}</p>
        )}
        <div
          onClick={() => {
            navigator.clipboard.writeText(agent.id);
            toast.success("Copied agent ID");
          }}
          className="text-xs p-1 pl-1.5 pr-1.5 bg-accent/50 rounded-md max-w-max cursor-pointer hover:bg-accent/60"
        >
          {agent.id.split("-")[0]}
        </div>
      </div>
      <DeleteAgent onDelete={onDelete} agent={agent} open={deleteOpen} openChange={setDeleteOpen} />
    </div>
  );
}
