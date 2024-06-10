"use client";

import { AgentData } from "@scoopika/types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import itemValue from "@/scripts/itemValue";
import tryRequest from "@/scripts/tryRequest";
import generateAvatar from "@/functions/agents/avatar/generate";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { FaCheck } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import SettingsRow from "../settingsRow";
import { RiRobot2Fill } from "react-icons/ri";

interface Props {
  agent: AgentData;
  updateAgent: Dispatch<SetStateAction<AgentData>>;
  avatarOpen: boolean;
  setAvatarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AgentAvatar({
  agent,
  updateAgent,
  avatarOpen,
  setAvatarOpen,
}: Props) {
  const [avatar, setAvatar] = useState<string | undefined>(agent.avatar);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [generatingAvatar, setGeneratingAvatar] = useState<boolean>(false);
  const [avatarProps, setAvatarProps] = useState<string | undefined>(undefined);

  const generateAgentAvatar = async () => {
    if (generatingAvatar) return;

    if (
      !itemValue(agent, "name") ||
      !itemValue(agent, "description") ||
      (String(agent.avatar) + String(avatarProps)).length < 1
    ) {
      return toast.error("Enter agent info", {
        description: "Agent name & description are required to generate avatar",
      });
    }

    setGeneratingAvatar(true);
    tryRequest<string>({
      loading: "Generating avatar. This could take a while!",
      success: "Generated avatar!",
      error: "Can't generate avatar",
      func: async () => {
        const res = await generateAvatar(
          agent.name,
          agent.description + ` ${avatarProps}`
        );

        if (!res || !res.success || !res.data) {
          throw new Error(
            "This could be due to high traffic, try again later!"
          );
        }

        return res.data;
      },
      end: (data) => {
        setGeneratingAvatar(false);
        if (data) {
          setAvatar(data);
        }
      },
    });
  };

  return (
    <SettingsRow title="Agent avatar" description="Give your agent an avatar">
      <div className="w-full flex items-center gap-2">
        <Dialog open={avatarOpen} onOpenChange={setAvatarOpen}>
          <DialogTrigger>
            {agent.avatar ? (
              <img
                src={agent.avatar}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-accent">
                <RiRobot2Fill />
              </div>
            )}
          </DialogTrigger>
          <DialogContent className="bg-background dark:border-white/20 max-h-screen overflow-auto">
            <div className="font-semibold">Agent avatar</div>
            <div className="w-full flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-56 h-56 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-56 h-56 rounded-2xl bg-accent/50 flex items-center justify-center">
                  <RiRobot2Fill size={30} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Enter avatar Url"
                defaultValue={avatarUrl}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setAvatarUrl(value);
                }}
              />
              <Button
                size="sm"
                isIconOnly
                startContent={<FaCheck />}
                variant="flat"
                onPress={() => {
                  if (!avatarUrl) {
                    return toast.error("Enter avatar url");
                  }

                  setAvatar(avatarUrl);
                }}
              />
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="w-full border-t-1 border-dashed"></div>
              <div className="text-xs opacity-80 min-w-max">
                or generate one
              </div>
              <div className="w-full border-t-1 border-dashed"></div>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Describe avatar (optional)"
                defaultValue={avatarProps}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setAvatarProps(value);
                }}
              />
              <Button
                size="sm"
                variant="flat"
                className="font-semibold w-64"
                isLoading={generatingAvatar}
                startContent={<BsStars />}
                onPress={() => generateAgentAvatar()}
              >
                Generate avatar
              </Button>
            </div>
            <div className="w-full border-t-1"></div>
            <Button
              size="sm"
              color="primary"
              className="w-full font-semibold"
              onPress={() => {
                updateAgent((prev) => ({ ...prev, avatar }));
                setAvatarOpen(false);
              }}
            >
              Set avatar
            </Button>
          </DialogContent>
        </Dialog>
        {agent.avatar ? (
          <>
            <Button
              size="sm"
              variant="light"
              className="font-semibold text-red-500"
              onPress={() =>
                updateAgent((prev) => ({ ...prev, avatar: undefined }))
              }
            >
              Delete
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="font-semibold"
              onPress={() => setAvatarOpen(true)}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="flat"
              className="font-semibold"
              onPress={() => setAvatarOpen(true)}
            >
              Add avatar
            </Button>
          </>
        )}
      </div>
    </SettingsRow>
  );
}
