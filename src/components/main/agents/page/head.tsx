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
import { RiChatVoiceFill } from "react-icons/ri";
import { Knowledge } from "@prisma/client";

interface Props {
  agent: AgentData;
  pro: boolean;
  apiKeys: string[];
  isNew: boolean;
  planType: "free" | "basic" | "scale";
  tab?: string;
}

export default function AgentHead({ agent, pro, apiKeys, isNew, tab }: Props) {
  const [activeTab, setActiveTab] = useState<string>(tab || "general");
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [knowledge, setKnowledge] = useState<Knowledge[] | null>(null);
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const tabs: Record<
    string,
    { name: string; comp: React.ReactNode; icon?: React.ReactNode }
  > = {
    general: {
      name: "General",
      comp: <AgentGeneral agent={agent} apiKeys={apiKeys} />,
      icon: <FaBrain size={16} />,
    },
    tools: {
      name: "Tools",
      comp: <AgentTools agent={agent} pro={pro} />,
      icon: <AiFillApi size={16} />,
    },
    companions: {
      name: "Companions",
      comp: (
        <AgentCompanions agent={agent} agents={agents} setAgents={setAgents} />
      ),
      icon: <TbMessageChatbot size={16} />,
    },
    voice: {
      name: "Voice",
      comp: <AgentVoice agent={agent} pro={pro} />,
      icon: <RiVoiceprintLine size={16} />,
    },
    knowledge: {
      name: "Knowledge (Beta)",
      comp: (
        <AgentKnowledge
          agent={agent}
          pro={pro}
          knowledge={knowledge}
          setKnowledge={setKnowledge}
        />
      ),
      icon: <ImBooks size={16} />,
    },
    code: {
      name: "Code",
      comp: <AgentCode agent={agent} />,
      icon: <FaCode size={16} />,
    },
    settings: {
      name: "Settings",
      comp: <AgentSettings agent={agent} />,
      icon: <IoSettingsSharp size={16} />,
    },
  };

  useEffect(() => {
    setNewOpen(isNew);
  }, [agent, isNew]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row">
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
        <div className="w-full flex items-center md:justify-end min-w-max">
          <Button
            size="sm"
            variant="bordered"
            className="w-full md:max-w-max font-semibold"
            startContent={<RiChatVoiceFill size={17} />}
            endContent={<FaChevronRight size={12} />}
            as={Link}
            href={`/app/playground?id=${agent.id}`}
          >
            Playground
          </Button>
        </div>
      </div>
      <div className="w-full flex items-center overflow-auto mt-4 lg:mt-0 lg:border-b-1">
        {Object.keys(tabs).map((k) => (
          <Button
            key={`agenttabbutton-${k}`}
            size="sm"
            variant="light"
            radius="none"
            as={Link}
            href={`/app/agents/${agent.id}?tab=${k}`}
            className={`min-w-max p-4 pt-5 pb-5 ${
              k === activeTab ? "border-b-1 border-purple-400" : "opacity-70"
            }`}
            startContent={tabs[k].icon}
            onPress={() => setActiveTab(k)}
          >
            {tabs[k].name}
          </Button>
        ))}
      </div>
      <div className="w-full flex flex-col">
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
