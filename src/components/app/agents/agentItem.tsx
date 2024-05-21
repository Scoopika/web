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
import { FaChevronRight } from "react-icons/fa6";
import { AgentData } from "@scoopika/types";
import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuLayoutList } from "react-icons/lu";
import { PiChatsFill } from "react-icons/pi";
import { RiRobot2Fill } from "react-icons/ri";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import DeleteAgent from "./delete";
import { FaHashtag } from "react-icons/fa";
import { useTheme } from "next-themes";

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
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <div
      key={`agent-${agent.id}`}
      className="w-full flex flex-col gap-3 overflow-hidden group transition-all border-1 rounded-lg hover:shadow dark:hover:border-white/20"
    >
      <div className="w-full flex items-center gap-3 p-4 pb-0">
        <div className="relative rounded-xl transition-all duration-500">
          {itemValue(agent, "avatar") ? (
            <Avatar
              src={agent.avatar}
              className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl border-3 border-accent/40"
            ></Avatar>
          ) : (
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 rounded-xl flex items-center justify-center bg-accent/50">
              <RiRobot2Fill />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold truncate transition-all">
            {agent.name}
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(agent.id);
              toast.success("Copied agent ID");
            }}
            className="text-xs max-w-max cursor-pointer flex items-center gap-1 hover:underline min-w-max opacity-80"
          >
            <FaHashtag />
            {agent.id.split("-")[0]}
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
      {itemValue(agent, "description") && (
        <p className="text-sm opacity-70 pl-4 pr-4 truncate">
          {agent.description}
        </p>
      )}
      <div className="flex items-center gap-2 p-3">
        <div className="w-full flex items-center justify-end">
          <Button
            size="sm"
            color={theme === "dark" ? "default" : "primary"}
            variant={theme === "dark" ? "flat" : "solid"}
            className="font-semibold opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
            endContent={<FaChevronRight />}
            onPress={() => setOpenAgent(agent)}
          >
            Open agent
          </Button>
        </div>
      </div>
      <DeleteAgent
        onDelete={onDelete}
        agent={agent}
        open={deleteOpen}
        openChange={setDeleteOpen}
      />
    </div>
  );
}
