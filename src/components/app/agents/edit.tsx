"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import AgentAvatarEdit from "./avatar";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "sonner";
import updateAgentData from "@/functions/agents/update";

interface Props {
  agent: AgentData;
  updateAgent: (agent: AgentData) => void;
}

export default function EditAgent({ agent, updateAgent }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>({} as AgentData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setData(agent);
  }, [agent]);

  const update = async () => {
    setLoading(true);

    const t = toast.loading(`Updating ${agent.name}`);

    try {
      const res = await updateAgentData(agent.id, data);

      if (!res.success) {
        throw new Error("update error");
      }

      toast.success("Updated successfully!", { id: t });
      updateAgent(data);
      setOpen(false);
    } catch {
      toast.error("Can't update agent. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        isIconOnly
        size="sm"
        color="default"
        variant="flat"
        onPress={() => setOpen(true)}
      >
        <MdEdit size={16} />
      </Button>
      <DialogContent className="flex flex-col items-center max-h-screen overflow-auto">
        <AgentAvatarEdit
          agentData={data}
          fallbackIcon={<RiRobot2Fill />}
          onChange={(image: string) => {
            setData((prev) => ({ ...prev, avatar: image }));
          }}
        />
        <input
          onInput={(e) => {
            setData((prev) => ({ ...prev, name: e?.currentTarget?.value }));
          }}
          defaultValue={data.name}
          placeholder="Agent name..."
          className="p-1.5 border-b-1 outline-none pl-0 pr-3 text-sm bg-transparent text-center"
        />
        <textarea
          onInput={(e) => {
            setData((prev) => ({
              ...prev,
              description: e?.currentTarget?.value,
            }));
          }}
          placeholder="Agent description (optional)..."
          defaultValue={data?.description}
          className="w-full p-1.5 bg-accent/10 border-1 rounded-md outline-none pl-3 pr-3 text-sm h-16"
        />

        <div className="flex flex-col w-full items-center justify-center gap-3 mt-6">
          <Button
            size="sm"
            color="primary"
            className="w-full font-semibold"
            isLoading={loading}
            onPress={() => update()}
          >
            Update agent
          </Button>
          <Button
            size="sm"
            color="default"
            variant="flat"
            className="w-full font-semibold"
            disabled={loading}
            onPress={() => {
              setOpen(false);
              setData(agent);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
