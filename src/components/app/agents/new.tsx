"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import AgentAvatarEdit from "./avatar";
import cleanText from "@/scripts/cleanText";
import createAgent from "@/functions/agents/create";

interface Props {
  children: React.ReactNode;
  updateState: (agent: AgentData) => void;
  triggerFull?: boolean;
  defaultOpen: boolean;
}

export default function NewAgent({
  children,
  updateState,
  triggerFull,
  defaultOpen
}: Props) {
  const sampleData = {
    id: "",
    description: "",
    prompts: [],
    name: "",
    chained: false,
    tools: [],
    wanted_responses: [],
  };

  const [name, setName] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>(sampleData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const create = async () => {
    if (!name || name.length < 1) {
      return toast.error("Please enter a valid agent name");
    }

    const t = toast.loading("Creating agent...");
    setLoading(true);

    try {
      const res = await createAgent(data);

      if (res.success === false) {
        throw new Error("Agent creation error");
      }

      toast.success(`Created agent '${data.name}'`, { id: t });
      setLoading(false);
      updateState({ ...data, id: res.id });
      setOpen(false);
      setData(sampleData);
    } catch {
      toast.error("Unable to create new agent, please try again!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={!loading ? setOpen : (o: boolean) => {}}>
      <DialogTrigger asChild className={`${triggerFull !== false && "w-full"}`}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-auto flex flex-col items-center min-w-lg">
        <div className="text-xs opacity-60 mb-3">New agent</div>

        <div className="flex w-full items-center gap-4">
          <AgentAvatarEdit
            agentData={data}
            fallbackIcon={<FaCamera size={16} />}
            onChange={(image: string) => {
              setData((prev) => ({ ...prev, avatar: image }));
            }}
          />

          <div className="flex flex-col gap-2">
            <input
              onInput={(e) => {
                setData((prev) => ({ ...prev, name: e?.currentTarget?.value }));
                setName(e?.currentTarget?.value);
              }}
              defaultValue={data.name}
              placeholder="Agent name..."
              className="p-1.5 border-b-1 outline-none pl-0 pr-3 text-sm bg-transparent border-black/20 dark:border-border"
            />
            <div className="text-sm opacity-70">
              {"@"}
              {cleanText(data.name || "")}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center justify-center gap-3 mt-3">
          <textarea
            onInput={(e) => {
              setData((prev) => ({
                ...prev,
                description: e?.currentTarget?.value,
              }));
            }}
            placeholder="Agent description (optional)..."
            defaultValue={data?.description}
            className="w-full p-1.5 bg-accent/10 border-1 rounded-md outline-none pl-3 pr-3 text-sm h-16 border-black/20 dark:border-border"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="w-full mt-4 font-semibold"
            isLoading={loading}
            onPress={() => create()}
          >
            Create agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
