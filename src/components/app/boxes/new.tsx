"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RawBoxData } from "@/types/rawBox";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BoxEngineSelection from "./engineSelection";
import { AgentData } from "@scoopika/types";
import listAgents from "@/functions/agents/list";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { MdAdd, MdCheck } from "react-icons/md";
import { AgentAvatar } from "../agents/agentPreview";
import createBox from "@/functions/boxes/create";
import updateBoxData from "@/functions/boxes/update";

interface Props {
  updateState: Dispatch<SetStateAction<RawBoxData[]>>;
  updateAgentsList: Dispatch<SetStateAction<AgentData[] | undefined>>;
  agentsList: AgentData[] | undefined;
  children: React.ReactNode;
  triggerFull: boolean;
  triggerAsChild?: boolean;
  newBox:
    | {
        new: true;
      }
    | {
        new: false;
        box: RawBoxData;
        editOpen: boolean;
        setEditOpen: (state: boolean) => void;
      };
}

export default function NewBox({
  children,
  updateState,
  updateAgentsList,
  agentsList,
  newBox,
  triggerFull,
  triggerAsChild,
}: Props) {
  const sampleData: RawBoxData = {
    id: String(crypto.randomUUID()),
    name: "",
    agents: [],
    llm_client: "openai",
    manager: "gpt-3.5-turbo",
    tools: [],
  };

  const [open, setOpen] = useState<boolean>(false);
  const [engineOpen, setEngineOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allAgents, setAllAgents] = useState<AgentData[] | undefined>(
    undefined,
  );
  const [data, setData] = useState<RawBoxData>(
    newBox.new === true ? sampleData : newBox.box,
  );

  const loadAgents = async () => {
    if (allAgents) return;

    if (agentsList) {
      setAllAgents(agentsList);
      return;
    }

    try {
      const res = await listAgents();
      if (!res.success) {
        throw new Error("Update error");
      }

      updateAgentsList(res.agents);
      setAllAgents(res.agents);
    } catch {
      toast.error("Can't load agents..!");
    }
  };

  useEffect(() => {
    loadAgents();

    if (!newBox.new) {
      setData(newBox.box);
      setOpen(newBox.editOpen);
    } else {
      setData(sampleData);
    }
  }, [newBox]);

  const saveNew = async () => {
    const t = toast.loading("Creating new box...");
    try {
      const res = await createBox(data);

      if (!res.success) {
        throw new Error("creation error");
      }

      toast.success("Created new box", { id: t });
      updateState((prev) => [...prev, { ...data, id: res.id }]);
      setOpen(false);
    } catch {
      toast.error("Can't create new box. try again later!", { id: t });
    }
  };

  const saveUpdate = async () => {
    if (newBox.new) return;
    const t = toast.loading("Saving box changes...");

    try {
      const res = await updateBoxData(newBox.box.id, data);

      if (!res.success) {
        throw new Error("update error");
      }

      toast.success("Updated box!", { id: t });
      updateState((prev) => [
        ...prev.filter((a) => a.id !== newBox.box.id),
        data,
      ]);
      newBox.setEditOpen(false);
    } catch {
      toast.error("Can't update box. try again later!", { id: t });
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    if (newBox.new) {
      await saveNew();
    } else {
      await saveUpdate();
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={
        !loading
          ? (state) => {
              setOpen(state);

              if (!newBox.new) {
                newBox.setEditOpen(state);
              }
            }
          : () => {}
      }
    >
      <DialogTrigger
        className={`${triggerFull && "w-full"} ${!newBox.new && "hidden"}`}
        asChild={triggerAsChild}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-auto flex flex-col items-center min-w-lg">
        <div className="text-xs opacity-60 mb-3">
          {newBox.new ? "New" : "Edit"} box
        </div>

        <div className="w-full flex flex-col gap-6">
          <input
            onInput={(e) => {
              setData((prev) => ({ ...prev, name: e?.currentTarget?.value }));
            }}
            defaultValue={data.name}
            placeholder="Box name..."
            className="p-1.5 border-b-1 outline-none pl-0 pr-3 text-sm bg-transparent w-full"
          />

          <BoxEngineSelection
            box={data}
            updateBox={setData}
            open={engineOpen}
            setOpen={setEngineOpen}
          />

          <div className="p-4 border-1 rounded-xl max-h-48 overflow-auto border-dashed border-black/30 dark:border-white/20">
            <div className="text-sm mb-4">Add agents to the box</div>
            {!allAgents && (
              <div className="text-xs opacity-80">
                Loading agents, please wait...
              </div>
            )}

            {allAgents && allAgents.length < 1 && (
              <div className="text-xs opacity-80">You have no agents yet!</div>
            )}

            {allAgents && allAgents.length > 0 && (
              <>
                {allAgents.map((agent) =>
                  data.agents.filter((d) => d === agent.id).length > 0 ? (
                    <div
                      key={`addagenttoboxitemselected-${agent.id}`}
                      className="p-2 text-sm hover:bg-black/20 hover:dark:bg-accent/20 rounded-xl flex items-center gap-3"
                    >
                      <AgentAvatar
                        agent={agent}
                        shadow={false}
                        size="min-w-10 max-h-10 min-h-10 max-h-10"
                      />
                      <p className="min-w-max font-semibold">{agent.name}</p>
                      <div className="w-full flex items-center justify-end">
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setData((prev) => ({
                              ...prev,
                              agents: [
                                ...prev.agents.filter((a) => a !== agent.id),
                              ],
                            }));
                          }}
                        >
                          <MdCheck />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`addagenttoboxitem-${agent.id}`}
                      className="p-2 text-sm hover:bg-black/10 hover:dark:bg-accent/10 rounded-xl flex items-center gap-3"
                    >
                      <AgentAvatar
                        agent={agent}
                        shadow={false}
                        size="min-w-10 max-h-10 min-h-10 max-h-10"
                      />
                      <p className="min-w-max font-semibold">{agent.name}</p>
                      <div className="w-full flex items-center justify-end">
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          onPress={() => {
                            setData((prev) => ({
                              ...prev,
                              agents: [...prev.agents, agent.id],
                            }));
                          }}
                        >
                          <MdAdd size={17} />
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </>
            )}
          </div>

          <Button
            size="sm"
            color="primary"
            className="w-full font-semibold"
            isLoading={loading}
            onPress={() => {
              if (!loading) {
                saveChanges();
              }
            }}
          >
            Save box
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
