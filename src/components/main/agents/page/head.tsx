"use client";

import { Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import { RiVoiceprintLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { FaChevronRight, FaCode } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import AgentGeneral from "./general";
import AgentSettings from "./settings";
import { toast } from "sonner";
import { TbMessageChatbot } from "react-icons/tb";
import AgentCompanions from "./companions";
import AgentCode from "./code";
import AgentTools from "./tools";
import AgentVoice from "./voice";
import AgentKnowledge from "./knowledge";
import { CgPlayButtonR } from "react-icons/cg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import ResourceLink from "../../resourceLink";

interface Props {
  agent: AgentData;
  pro: boolean;
  apiKeys: string[];
  isNew: boolean;
  planType: "free" | "basic" | "scale";
}

export default function AgentHead({ agent, pro, apiKeys, isNew }: Props) {
  const [activeTab, setActiveTab] = useState<string>("General");
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const tabs: Record<
    string,
    { comp: React.ReactNode; icon?: React.ReactNode }
  > = {
    General: {
      comp: <AgentGeneral agent={agent} apiKeys={apiKeys} />,
      icon: <FaBrain size={16} />,
    },
    Tools: {
      comp: <AgentTools agent={agent} pro={pro} />,
      icon: <AiFillApi size={16} />,
    },
    Companions: {
      comp: (
        <AgentCompanions agent={agent} agents={agents} setAgents={setAgents} />
      ),
      icon: <TbMessageChatbot size={16} />,
    },
    Voice: {
      comp: <AgentVoice agent={agent} pro={pro} />,
      icon: <RiVoiceprintLine size={16} />,
    },
    Knowledge: {
      comp: <AgentKnowledge />,
      icon: <ImBooks size={16} />,
    },
    Code: {
      comp: <AgentCode agent={agent} />,
      icon: <FaCode size={16} />,
    },
    Settings: {
      comp: <AgentSettings agent={agent} />,
      icon: <IoSettingsSharp size={16} />,
    },
  };

  useEffect(() => {
    setNewOpen(isNew);
  }, [agent, isNew]);

  return (
    <>
      {agent.avatar ? (
        <img
          src={agent.avatar}
          className="w-20 h-20 md:w-12 md:h-12 object-cover sticky top-0 left-0 w-full h-14 z-0 blur-3xl opacity-30"
        />
      ) : (
        <div className="w-20 h-20 md:w-14 md:h-14 object-cover sticky top-0 left-0 w-full h-14 z-0 bg-accent blur-3xl opacity-30"></div>
      )}
      <div className="w-full h-12 absolute flex flex-col md:flex-row md:items-center gap-3 top-8 left-8">
        <div className="w-full flex items-center gap-3">
          {agent.avatar ? (
            <img
              src={agent.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent">
              <RiRobot2Fill />
            </div>
          )}
          <div className="flex flex-col w-full truncate">
            <div className="font-semibold">{agent.name}</div>
            <div className="flex items-center gap-1 text-xs opacity-70">
              <span
                className="cursor-pointer hover:underline transition-all"
                onClick={() => {
                  navigator.clipboard.writeText(agent.id);
                  toast.success("Copied agent ID");
                }}
              >
                #{agent.id.split("-")[0]}
              </span>{" "}
              {" - "}
              {agent.description}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center md:justify-end pr-16 min-w-max">
          <Button
            size="sm"
            color="primary"
            className="w-full md:max-w-max font-semibold"
            startContent={<CgPlayButtonR size={17} />}
            endContent={<FaChevronRight size={12} />}
            as={Link}
            href={`/app/playground?id=${agent.id}`}
          >
            Playground
          </Button>
        </div>
      </div>
      <div className="w-full flex items-center gap-3 overflow-auto">
        {Object.keys(tabs).map((k) => (
          <Button
            key={`agenttabbutton-${k}`}
            size="sm"
            variant={k === activeTab ? "solid" : "flat"}
            color={k === activeTab ? "primary" : "default"}
            className="font-semibold min-w-max"
            startContent={tabs[k].icon}
            onPress={() => setActiveTab(k)}
          >
            {k}
          </Button>
        ))}
      </div>
      <div className="w-full flex flex-col border-t-1 pt-6">
        <div className="w-full flex items-center">
          <h2 className="text-xl font-semibold min-w-max">{activeTab}</h2>
        </div>
        {tabs[activeTab] && tabs[activeTab].comp}
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <div className="font-semibold">Welcome to your agent page!</div>
          <div className="text-sm opacity-80 mb-4">
            Here you can manage your {"agent's"} config, knowledge,
            instructions, tools, companions, and voice. Once your agent is ready
            you can chat with it using the playground and integrate it into your
            application by checking the {"`code`"} tab... Good luck {";)"}
          </div>
          <div className="w-full flex flex-col items-center lg:flex-row lg:justify-end gap-3">
            <ResourceLink
              name="Check guide"
              link="https://docs.scoopika.com/agents"
            />
            <Button
              size="sm"
              color="primary"
              onPress={() => setNewOpen(false)}
              className="font-semibold"
            >
              {"Let's go"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
