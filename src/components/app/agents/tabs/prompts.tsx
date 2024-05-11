"use client";

import { Button } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { AgentData, Prompt } from "@scoopika/types";
import { useEffect, useState } from "react";
import PromptEditor from "../promptEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdTextSnippet, MdImage, MdEdit } from "react-icons/md";
import agentVariables from "@/scripts/agents/variables";
import engines, { getDefaultOptions } from "@/scripts/agents/engines";
import updateAgentData from "@/functions/agents/update";
import { toast } from "sonner";

interface Props {
  agent: AgentData;
  updateAgent: (agent: AgentData) => void;
  openId: string;
}

export default function AgentPrompts({ agent, updateAgent, openId }: Props) {
  const [openPrompt, setOpenPrompt] = useState<Prompt | undefined>(undefined);
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const [editOrder, setEditOrder] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AgentData>({
    prompts: [],
  } as unknown as AgentData);

  useEffect(() => {
    setOpenPrompt(undefined);
    setData(JSON.parse(JSON.stringify(agent)));
    setEditOrder(false);
  }, [agent, openId]);

  const closeOpenPrompt = () => setOpenPrompt(undefined);

  const newTextPrompt: Prompt = {
    type: "text",
    id: String(crypto.randomUUID()),
    index: agent.prompts.length === 0 ? 0 : agent.prompts.length - 1,
    variable_name: `main`,
    content: "",
    inputs: [],
    llm_client: "openai",
    model: "gpt-3.5-turbo",
    options: getDefaultOptions(engines.openai.models.text[0].options),
  };

  const newImagePrompt: Prompt = {
    type: "image",
    id: String(crypto.randomUUID()),
    index: agent.prompts.length === 0 ? 0 : agent.prompts.length - 1,
    variable_name: `prompt${agent.prompts.length}`,
    content: "",
    inputs: [],
    n: 4,
    size: "1024x1024",
    options: {},
    llm_client: "",
    model: "",
  };

  const newPrompt = (type: "text" | "image") => {
    const prompt = type === "text" ? newTextPrompt : newImagePrompt;
    setOpenPrompt(prompt);
  };

  const deletePrompt = async (id: string) => {
    setLoading(true);
    const newAgent: AgentData = JSON.parse(JSON.stringify(data));

    newAgent.prompts = data.prompts.filter((p) => p.id !== id);
    newAgent.prompts = newAgent.prompts
      .sort((a, b) => a.index - b.index)
      .map((prompt, index) => {
        prompt.index = index;
        return prompt;
      });

    const t = toast.loading("Deleting prompt...");

    try {
      const res = await updateAgentData(agent.id, newAgent);

      if (!res.success) {
        throw new Error("update error");
      }

      toast.success("Deleted prompt", { id: t });
      updateAgent(newAgent);
    } catch {
      toast.error("Can't delete prompt. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 pt-0">
      <div className="text-sm mb-1 w-full">Prompt</div>
      <div className="text-xs opacity-80 w-full mb-4">
        Give {agent.name} instructions on how to act and behave
      </div>
      {openPrompt && !editOrder && (
        <PromptEditor
          agent={agent}
          updateAgent={updateAgent}
          prompt={openPrompt}
          openEditor={true}
          variables={agentVariables(agent)}
          closePrompt={closeOpenPrompt}
          newPrompt={
            agent.prompts.filter((p) => p.id === openPrompt.id).length === 0
          }
        />
      )}

      {(agent.chained || agent.prompts.length < 1) && (
        <div className="flex items-center gap-4 w-full mt-2">
          <div className="w-full border-t-1 border-dashed"></div>
          <DropdownMenu
            open={newOpen}
            onOpenChange={!editOrder ? setNewOpen : () => {}}
          >
            <DropdownMenuTrigger>
              <div
                className={`min-w-[10rem] border-1 border-dashed border-black/30 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50 bg-accent/30 relative overflow-visible flex items-center justify-center rounded-lg text-xs p-1.5 transition-all ${
                  editOrder && "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!editOrder) {
                    setNewOpen(true);
                  }
                }}
              >
                {agent.prompts.length < 1 && (
                  <div className="absolute z-10 -top-1 -right-1 flex items-center justify-center">
                    <div className="absolute animate-ping w-4 h-4 bg-foreground/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-foreground rounded-full"></div>
                  </div>
                )}
                Add prompt
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              <DropdownMenuItem
                className="gap-2 text-sm mb-2"
                onClick={() => newPrompt("text")}
              >
                <MdTextSnippet size={17} />
                Normal prompt (text)
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2 text-sm" disabled>
                <MdImage size={17} />
                Image generation
                <Badge>coming soon</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-full border-t-1 border-dashed"></div>
        </div>
      )}

      {agent.prompts.length > 0 && (
        <div className="flex flex-col w-full gap-3 p-3 border-1 rounded-md border-dashed border-black/20 dark:border-white/20 mt-4">
          <div className="w-full flex items-center">
            <p className="text-sm min-w-max opacity-80 font-semibold">Prompt</p>
            <div className="flex items-center w-full justify-end">
              <div className="w-full flex items-center justify-end">
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<MdEdit size={17} />}
                  onPress={() => setOpenPrompt(agent.prompts[0])}
                  isLoading={loading}
                >
                  Edit prompt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
