"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgentData } from "@scoopika/types";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { MdAdd, MdDraw } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
import tryRequest from "@/scripts/tryRequest";
import { toast } from "sonner";
import { newWidget } from "@/functions/widgets/new";

interface Props {
  agents: AgentData[];
}

export default function NewWidget({ agents }: Props) {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [styleType, setStyleType] = useState<"page" | "popup">("popup");
  const [agent, setAgent] = useState<string | undefined>(undefined);

  const create = async () => {
    if (loading) return;

    if (!name || name.length < 1) {
      return toast.error("Widget name is required!", {
        description: "Enter any simple name, it can be changed later ;)",
      });
    }

    if (!agent || agent.length < 1) {
      return toast.error("AI agent is required!", {
        description: "Select the AI agent you want users to interact with using the widget",
      });
    }

    tryRequest<Boolean>({
      loading: "Creating your widget...",
      success: "Created your widget!",
      error: "Couldn't create your widget",
      func: async () => {
        const res = await newWidget({
          name,
          agent,
          styleType
        });

        if (!res || !res.success) {
          throw new Error("Please contact the support and report the issue");
        }

        return res.success;
      },
      end: (s) => {
        setLoading(false);
        if (!s) return;

        setName("");
        setAgent(undefined);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="bordered"
          className="font-semibold"
          startContent={<MdAdd size={16} />}
        >
          New widget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="font-semibold">New widget</div>
        <Input
          value={name}
          placeholder="Widget name (e.g. popup widget 1)"
          className="w-full"
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <Select onValueChange={(v) => setAgent(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select AI agent" />
          </SelectTrigger>
          <SelectContent>
            {agents.map((a) => (
              <SelectItem key={`new-widget-selectagent-${a.id}`} value={a.name}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-full flex items-center gap-4">
          <div
            className="p-3 border rounded-lg w-full relative cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-all"
            onClick={() => setStyleType("popup")}
          >
            <div className="w-full h-14 rounded-lg bg-foreground relative">
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <IoChatbox size={12} />
              </div>
            </div>
            <div className="text-sm mt-3">Popup</div>
            <div className="text-xs opacity-80">
              A popup chat to display in the bottom corner of the page.
            </div>
            {styleType === "popup" && (
              <div className="absolute top-1 left-1 p-1 text-xs pl-3 pr-3 rounded-br-lg bg-background text-violet-500">
                selected
              </div>
            )}
          </div>
          <div
            className="p-3 border rounded-lg w-full relative cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-all"
            onClick={() => setStyleType("page")}
          >
            <div className="w-full h-14 rounded-lg bg-foreground relative overflow-hidden p-2 flex flex-col gap-2">
              <div className="p-1.5 rounded-lg text-xs bg-accent/30"></div>
              <div className="p-1.5 rounded-lg text-xs bg-accent/30 w-[70%]"></div>
            </div>
            <div className="text-sm mt-3">Page</div>
            <div className="text-xs opacity-80">
              Display a full page or component in the page.
            </div>
            {styleType === "page" && (
              <div className="absolute top-1 left-1 p-1 text-xs pl-3 pr-3 rounded-br-lg bg-background text-violet-500">
                selected
              </div>
            )}
          </div>
        </div>

        <div className="mt-1 mb-3 w-full p-4 text-xs bg-accent/10 border rounded-lg">
          <MdDraw size={22} />
          <div className="mt-2">
            You can edit the wiget type and style and preview it once {"it's"}{" "}
            created!
          </div>
        </div>

        <Button
          className="w-full font-semibold"
          size="sm"
          color="primary"
          endContent={<FaChevronRight />}
          isLoading={loading}
          onPress={create}
        >
          Create widget
        </Button>
      </DialogContent>
    </Dialog>
  );
}
