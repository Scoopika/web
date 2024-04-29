"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import generateAvatar from "@/functions/agents/avatar/generate";
import itemValue from "@/scripts/itemValue";
import { AgentData } from "@scoopika/types";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { Avatar, Button } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  agentData: AgentData;
  onChange: (image: string) => void;
  fallbackIcon: React.ReactNode;
}

export default function AgentAvatarEdit({
  onChange,
  agentData,
  fallbackIcon,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const createAvatar = async () => {
    if (loading === true) {
      return toast.error("Loading... please wait!");
    }

    if (!itemValue(agentData, "name")) {
      return toast.error("Agent name is required to generate an avatar");
    }

    if (!itemValue(agentData, "description")) {
      return toast.error("Agent description is required to generate an avatar");
    }

    setLoading(true);

    const t = toast.loading("Generating avatar. this could take a while!");

    try {
      const data = await generateAvatar(
        itemValue(agentData, "name") as string,
        itemValue(agentData, "description") as string
      );

      if (data.success === false || !data.data) {
        return toast.error(
          "Unable to generate an avatar. please try again later",
          { id: t }
        );
      }

      toast.success("Generate agent avatar", { id: t });
      onChange(data.data);
    } catch {
      toast.error(
        "Unable to generate an agent avatar. please try again later",
        { id: t }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className="w-16 h-16 rounded-full border-1 border-dashed flex items-center justify-center cursor-pointer hover:border-black/30 dark:hover:border-white/30 transition-all outline-0">
          {loading ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <>
              {itemValue(agentData, "avatar") ? (
                <Avatar src={agentData.avatar} className="w-14 h-14" />
              ) : (
                <>{fallbackIcon}</>
              )}
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background min-w-64">
        <div className="flex items-center w-full gap-3 p-1">
          <input
            id="avavtarUrlInput"
            onInput={(e) => {
              setAvatarUrl(e?.currentTarget?.value);
            }}
            className="border-1 rounded-md p-1 pl-2 pr-2 text-sm"
            placeholder="Enter URL..."
          />
          <Button
            isIconOnly
            color="default"
            variant="shadow"
            size="sm"
            onPress={() => {
              if (!avatarUrl) {
                document.getElementById("avavtarUrlInput")?.focus();
                return;
              }

              onChange(avatarUrl);
              setOpen(false);
            }}
          >
            <FaCheck />
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            createAvatar();
          }}
          className="flex items-center gap-2"
        >
          <BsStars />
          Generate avatar using AI
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
