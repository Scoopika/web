"use client";

import { AgentData } from "@scoopika/types";
import SettingsRow from "../../settingsRow";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa6";
import tryRequest from "@/scripts/tryRequest";
import updateAgentData from "@/functions/agents/update";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AgentAvatar from "../avatar";
import deleteAgent from "@/functions/agents/delete";
import AppHead from "../../head";

interface Props {
  agent: AgentData;
}

export default function AgentSettings({ agent }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>(agent);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [avatarOpen, setAvatarOpen] = useState<boolean>(false);

  const save = async () => {
    if (loading) return;

    setLoading(true);
    tryRequest<Boolean>({
      loading: "Saving changes...",
      success: "Saved changes!",
      error: "Can't save changes",
      func: async () => {
        const res = await updateAgentData(agent.id, data);
        if (!res || !res.success) {
          throw new Error("Try again later or contact support!");
        }

        return res.success;
      },
      end: () => {
        setLoading(false);
      },
    });
  };

  const deleteNow = async () => {
    if (deleteLoading) return;

    setDeleteLoading(true);
    tryRequest({
      loading: "Deleting agent...",
      success: "Deleted agent",
      error: "Can't delete agent",
      func: async () => {
        const res = await deleteAgent(agent.id);
        if (res?.success === false) {
          throw new Error("Try again later or contact support");
        }
      },
      end: () => setDeleteLoading(false),
    });
  };

  return (
    <div>
      <AppHead title="Settings" description="Manage your agent settings" />

      <AgentAvatar
        agent={data}
        updateAgent={setData}
        avatarOpen={avatarOpen}
        setAvatarOpen={setAvatarOpen}
      />
      <SettingsRow
        title="Agent name"
        description={`Agents are aware of their names!`}
      >
        <Input
          defaultValue={agent.name}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setData((prev) => ({ ...prev, name: value }));
          }}
          placeholder="Agent name"
        />
      </SettingsRow>
      <SettingsRow
        title="Agent description"
        description={`Briefly describe what your agent does (useful for collaboration)`}
      >
        <Input
          defaultValue={agent.description}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setData((prev) => ({ ...prev, description: value }));
          }}
          placeholder="Agent description"
        />
      </SettingsRow>
      <SettingsRow
        title="Delete agent"
        description={`Delete this agent and all its data`}
      >
        <Dialog
          open={deleteOpen}
          onOpenChange={!deleteLoading ? setDeleteOpen : () => {}}
        >
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-red-500/10 border-1 border-red-500 font-semibold"
            >
              Delete agent
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:border-white/20">
            <h3 className="font-semibold">Delete {agent.name}</h3>
            <p className="text-sm opacity-80">
              Are you sure you want to delete this agent? this action {"can't"}{" "}
              be undone
            </p>
            <div className="w-full flex flex-col lg:flex-row lg:justify-end gap-4">
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                onPress={() => {
                  if (!deleteLoading) {
                    setDeleteOpen(false);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="font-semibold bg-red-500/10 border-1 border-red-500"
                onPress={() => deleteNow()}
                isLoading={deleteLoading}
              >
                Delete agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SettingsRow>
      <div className="w-full flex items-center justify-end p-4">
        <Button
          size="sm"
          color="primary"
          className="font-semibold w-full lg:max-w-max"
          endContent={<FaChevronRight />}
          onPress={() => save()}
          isLoading={loading}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
