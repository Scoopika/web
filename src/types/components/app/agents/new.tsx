"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { AgentData } from "@scoopika/types";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuLayoutList } from "react-icons/lu";
import { PiChatsFill } from "react-icons/pi";

import { FaCamera } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import AgentAvatarEdit from "./avatar";
import cleanText from "@/scripts/cleanText";
import createAgent from "@/functions/agents/create";

const TypeChoice = ({
  title,
  description,
  icon,
  onClick,
  isActive,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: Function;
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={`p-4 border-1 rounded-xl flex flex-col gap-2 w-full cursor-pointer overflow-hidden transition-all relative ${
        isActive && "border-black/50 dark:border-white/20"
      }`}
    >
      <div
        style={
          isActive
            ? {
                boxShadow: "0px 0px 80px 0px rgba(255, 255, 255, .5)",
              }
            : {}
        }
        className="w-7 h-7 border-1 rounded-md flex items-center justify-center transition-all"
      >
        {icon}
      </div>
      <div className="text-sm">{title}</div>
      <p className="text-xs opacity-80">{description}</p>
      <div
        className={`w-6 h-6 rounded-xl rounded-br-none rounded-tl-none bg-foreground text-background flex items-center justify-center absolute top-0 right-0 transition-all ${
          isActive ? "scale-100" : "w-0 translate-x-[100%] scale-90"
        }`}
      >
        <FaCheck size={13} />
      </div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  updateState: (agent: AgentData) => void;
  triggerFull?: boolean;
}

export default function NewAgent({
  children,
  updateState,
  triggerFull,
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

  const { theme } = useTheme();
  const [name, setName] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>(sampleData);
  const [loading, setLoading] = useState<boolean>(false);

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

      toast.success(`Create agent '${data.name}'`, { id: t });
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
      <DialogTrigger className={`${triggerFull !== false && "w-full"}`}>
        {children}
      </DialogTrigger>
      <DialogContent
        className="backdrop-blur-xl max-h-screen overflow-auto flex flex-col items-center min-w-lg"
        style={
          theme === "dark"
            ? {
                background: "var(--background)",
              }
            : {}
        }
      >
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
              className="p-1.5 border-b-1 outline-none pl-0 pr-3 text-sm bg-transparent"
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
            className="w-full p-1.5 bg-accent/10 border-1 rounded-md outline-none pl-3 pr-3 text-sm h-16"
          />
        </div>

        <div className="flex w-full items-center justify-center gap-3 mt-2">
          <TypeChoice
            title="Chained agent"
            description="Has a chain of prompts. best for multi-step and complex tasks"
            icon={<LuLayoutList size={16} />}
            onClick={() => setData((prev) => ({ ...prev, chained: true }))}
            isActive={data.chained}
          />
          <TypeChoice
            title="Conversational agent"
            description="Interactive, has one prompt. best for chatbots"
            icon={<PiChatsFill size={16} />}
            onClick={() => setData((prev) => ({ ...prev, chained: false }))}
            isActive={!data.chained}
          />
        </div>

        <Link
          href=""
          className="w-full text-end text-sm opacity-80 hover:opacity-100 transition-all"
        >
          {"Don't"} know what type to choose?
        </Link>

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
          <Button
            size="sm"
            variant="light"
            color="warning"
            className="w-full font-semibold"
            disabled={loading}
            onPress={() => {
              setData(sampleData);
              setName(undefined);
            }}
          >
            Reset agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
