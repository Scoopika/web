"use client";

import listAgents from "@/functions/agents/list";
import { Button } from "@nextui-org/react";
import { AgentData, InAgentTool } from "@scoopika/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tryRequest from "@/scripts/tryRequest";
import updateAgentData from "@/functions/agents/update";
import { RiRobot2Fill } from "react-icons/ri";
import { CgMathPlus } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Empty from "../../empty";
import { TbMessageChatbot } from "react-icons/tb";
import Loading from "../../loading";
import ResourceLink from "../../resourceLink";
import AppHead from "../../head";
import Link from "next/link";

interface Props {
  agent: AgentData;
  agents: AgentData[];
  setAgents: Dispatch<SetStateAction<AgentData[]>>;
}

export default function AgentCompanions({ agent, agents, setAgents }: Props) {
  const [loadingAgents, setLoadingAgents] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [compOpen, setCompOpen] = useState<boolean>(false);
  const [deleteComp, setDeleteComp] = useState<string | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const listAll = async () => {
    if (agents.length > 0 || loadingAgents) return;

    setLoadingAgents(true);
    const allAgents = await listAgents();
    setLoadingAgents(false);

    if (!allAgents || !allAgents.success) {
      return toast.error("Can't load agents", {
        description: "Try again later or contact support",
      });
    }

    setAgents(allAgents.agents);
  };

  useEffect(() => {
    listAll();
  }, [agent]);

  const awntedAgents = () => {
    const otherAgents = agents.filter((a) => a.id !== agent.id);
    const alreadyCompanions = (agent.in_tools || []).filter(
      (t) => t.type === "agent"
    ) as InAgentTool[];
    const newAgents = otherAgents.filter(
      (a) => alreadyCompanions.filter((c) => c.id === a.id).length === 0
    );

    return newAgents;
  };

  const getComps = () => {
    const comps = (agent.in_tools || []).filter(
      (t) => t.type === "agent"
    ) as InAgentTool[];
    const companions = comps.map((c) => agents.filter((a) => a.id === c.id)[0]);

    return companions;
  };

  const addComp = async (id: string) => {
    if (loading) return;

    setLoading(true);
    tryRequest({
      loading: "Adding companion",
      success: "Added new companion",
      error: "Can't add companion",
      func: async () => {
        const res = await updateAgentData(agent.id, {
          ...agent,
          in_tools: [
            ...(agent.in_tools || []),
            {
              type: "agent",
              id,
            },
          ],
        });

        if (!res || !res.success) {
          throw new Error(
            "Can't save agent data. try again or contact support"
          );
        }
      },
      end: () => {
        setLoading(false);
      },
    });
  };

  const deleteCompNow = async (id: string) => {
    if (deleteLoading) return;

    setDeleteLoading(true);
    tryRequest({
      loading: "Removing companion",
      success: "Removed companion",
      error: "Can't remove companion",
      func: async () => {
        const res = await updateAgentData(agent.id, {
          ...agent,
          in_tools: [
            ...(agent.in_tools || []).filter(
              (a) => a.type !== "agent" || a.id !== id
            ),
          ],
        });
      },
      end: () => {
        setDeleteComp(undefined);
        setDeleteLoading(false);
      },
    });
  };

  return (
    <>
      <AppHead
        title="Companions"
        description={`Add other agents that ${agent.name} can talk with if it needs help`}
        action={
          <div className="flex items-center gap-3">
            <Button
              as={Link}
              href="https://docs.scoopika.com/agents/features/companions"
              target="_blank"
              size="sm"
              variant="light"
            >
              Learn more
            </Button>
            <Popover
              open={!loading ? compOpen : false}
              onOpenChange={setCompOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="bordered"
                  className="font-semibold border w-full lg:max-w-max"
                  endContent={<FaChevronDown />}
                  onPress={() => listAll()}
                  isLoading={loading}
                >
                  Add companion
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-64 overflow-auto">
                {agents.length < 1 ? (
                  <div className="text-xs opacity-80">Loading agents...</div>
                ) : awntedAgents().length === 0 ? (
                  <div className="text-xs opacity-80">
                    No other agents available to add
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {awntedAgents().map((a, index) => (
                      <div
                        key={`wantedagent-${a.id}-${index}`}
                        className={`flex items-center p-2 rounded-xl gap-2 ${
                          !(index & 1) && "bg-accent/40"
                        }`}
                      >
                        {a.avatar ? (
                          <img
                            src={a.avatar}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent">
                            <RiRobot2Fill />
                          </div>
                        )}
                        <div className="font-semibold text-sm min-w-max truncate">
                          {a.name}
                        </div>
                        <div className="w-full flex min-w-max items-center justify-end">
                          <Button
                            size="sm"
                            onPress={() => {
                              setCompOpen(false);
                              addComp(a.id);
                            }}
                            isIconOnly
                            startContent={<CgMathPlus />}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        }
      />
      <div className="w-full mt-4">
        {agents.length > 0 && getComps().length < 1 && (
          <Empty
            title="Add first companion"
            description="You can add other agents as companions to this agent so they can communicate and collaborate when needed"
            icon={<TbMessageChatbot />}
          />
        )}
        {agents.length < 1 ? (
          <div className="text-xs opacity-80">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {getComps().map((a, index) => (
              <div
                key={`agentcompitem-${index}`}
                className={`flex items-center p-2 rounded-xl gap-2 group ${
                  !(index & 1) && "bg-accent/40"
                }`}
              >
                {a.avatar ? (
                  <img
                    src={a.avatar}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent">
                    <RiRobot2Fill />
                  </div>
                )}
                <div className="font-semibold text-sm min-w-max truncate">
                  {a.name}
                </div>
                <div className="w-full min-w-max flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all">
                  <Button
                    size="sm"
                    isIconOnly
                    startContent={<MdDelete />}
                    className="text-red-500"
                    onPress={() => setDeleteComp(a.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {deleteComp && (
        <Dialog
          open={typeof deleteComp === "string"}
          onOpenChange={
            !deleteLoading ? () => setDeleteComp(undefined) : () => {}
          }
        >
          <DialogContent>
            <div className="font-semibold">Remove companion</div>
            <p className="text-sm opacity-80">
              {agent.name} {"won't"} be able to collaborate with this agent
              anymore!
            </p>
            <div className="w-full flex flex-col lg:flex-row lg:justify-end gap-4">
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                onPress={() => {
                  if (!deleteLoading) {
                    setDeleteComp(undefined);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="font-semibold bg-red-500/10 border-1 border-red-500"
                onPress={() => deleteCompNow(deleteComp)}
                isLoading={deleteLoading}
              >
                Remove companion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
