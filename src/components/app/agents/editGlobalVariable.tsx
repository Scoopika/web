"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import updateAgentData from "@/functions/agents/update";
import { Button } from "@nextui-org/react";
import { AgentData, PromptInput } from "@scoopika/types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  agent: AgentData;
  variable: PromptInput;
  closeEdit: () => void;
  updateAgent: (agent: AgentData, tab?: string) => void;
}

const typesColors = {
  string: "text-green-500",
  number: "text-orange-500",
  boolean: "text-purple-500",
};

export default function EditGlobalVariable({
  agent,
  variable,
  closeEdit,
  updateAgent,
}: Props) {
  const [open, setOpen] = useState<boolean>(true);
  const [description, setDescription] = useState<string | undefined>();
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const [required, setRequired] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setDescription(variable.description);
    setDefaultValue(variable.default);
    setRequired(Boolean(variable.required));
  }, [agent, variable]);

  const saveVariable = async () => {
    setLoading(true);
    const newVariable: PromptInput = {
      ...variable,
      description,
      default: defaultValue,
      required,
    };

    const newAgent: AgentData = JSON.parse(JSON.stringify(agent));

    for (let i = 0; i < newAgent.prompts.length; i++) {
      const prompt = newAgent.prompts[i];

      const variablesIds = prompt.inputs.map((i) => i.id);

      if (variablesIds.indexOf(variable.id) === -1) {
        continue;
      }

      const newVariables: PromptInput[] = [
        ...prompt.inputs.filter((i) => i.id !== variable.id),
        newVariable,
      ];

      newAgent.prompts[i] = { ...prompt, inputs: newVariables };
    }

    const t = toast.loading("Updating variable...");

    try {
      const res = await updateAgentData(agent.id, newAgent);

      if (!res.success) {
        throw new Error("Save error");
      }

      toast.success("Updated variable successfully!", { id: t });
      setOpen(false);
      setTimeout(() => {
        updateAgent(newAgent, "Variables");
        closeEdit();
      }, 300);
    } catch {
      toast.error("Can't update variable. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={
        loading
          ? () => {}
          : (state: boolean) => {
              setOpen(state);

              if (!state) {
                setTimeout(() => {
                  closeEdit();
                }, 300);
              }
            }
      }
    >
      <DialogContent
        className="bg-background backdrop-blur-xl"
        style={
          theme === "dark"
            ? {
                backgroundColor: "var(--background)",
              }
            : {}
        }
      >
        <p>Edit variable</p>
        <div className="w-full flex flex-col gap-2">
          <div className="flex w-full items-center gap-3">
            <input
              className="w-full pl-1.5 pr-1.5 p-0.5 opacity-80 rounded-md border-1 text-sm bg-transparent h-9 mb-2 cursor-not-allowed"
              value={`$${variable.id}`}
              readOnly
            />
            <input
              className={`w-full pl-1.5 pr-1.5 p-0.5 opacity-80 rounded-md border-1 text-sm bg-transparent h-9 mb-2 cursor-not-allowed ${
                typesColors[variable.type]
              }`}
              value={variable.type}
              readOnly
            />
          </div>
          <input
            className="w-full pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9 mb-2"
            placeholder="Description"
            defaultValue={description}
            onInput={(e) => {
              setDescription(e?.currentTarget?.value);
            }}
          />
          <input
            className="w-full pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9"
            placeholder="Default value"
            onInput={(e) => {
              setDefaultValue(e.currentTarget.value);
            }}
          />
          <div className="flex w-full items-center justify-end gap-2 text-xs mt-2 mb-2">
            Required
            <Switch checked={required} onCheckedChange={setRequired} />
          </div>
        </div>

        <Button
          size="sm"
          color="primary"
          className="w-full font-semibold"
          isLoading={loading}
          onPress={() => saveVariable()}
        >
          Save changes
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="w-full font-semibold"
          disabled={loading}
          onPress={() => {
            if (!loading) {
              setOpen(false);
              setTimeout(() => {
                closeEdit();
              }, 300);
            }
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
