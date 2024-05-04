"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@nextui-org/react";
import { AgentData, Prompt, PromptInput } from "@scoopika/types";
import { useEffect, useState } from "react";
import { FaHashtag, FaCheck } from "react-icons/fa6";
import { MdEdit, MdDownloadDone } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import PromptEngineSelection from "./engineSelection";
import PromptContentEditor from "./contentEditor";
import PromptVariables from "./variables";
import { AgentVariables } from "@/scripts/agents/variables";
import EngineOptions from "./engineOptions";
import { toast } from "sonner";
import updateAgentData from "@/functions/agents/update";
import cleanText from "@/scripts/cleanText";

interface Props {
  agent: AgentData;
  updateAgent: (agent: AgentData) => void;
  openEditor: boolean;
  prompt: Prompt;
  variables: AgentVariables[];
  closePrompt: () => void;
  newPrompt?: boolean;
}

export default function PromptEditor({
  agent,
  prompt,
  variables,
  openEditor,
  updateAgent,
  closePrompt,
  newPrompt
}: Props) {
  const [data, setData] = useState<Prompt>({} as Prompt);
  const [open, setOpen] = useState<boolean>(false);
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>();
  const [contentEdit, setContentEdit] = useState<boolean>();
  const [engineOpen, setEngineOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setOpen(openEditor);
    setData(prompt);
    setTempName(prompt.variable_name);
    setContentEdit(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey) {
        e.preventDefault();
        setContentEdit(true);
        return;
      }

      if (e.key === "Escape" && e.ctrlKey) {
        if (contentEdit === true) {
          e.preventDefault();
          setContentEdit(false);
        }
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [openEditor, prompt]);

  const saveChanges = async () => {
    if (!data.variable_name || data.variable_name.length < 3) {
      return toast.error("Prompt name should be at least 3 characters");
    }

    if (!data.content || data.content.length < 1) {
      return toast.error("Enter prompt instructions, please!");
    }

    setLoading(true);
    const t = toast.loading("Saving prompt...");

    try {
      const newAgent: AgentData = {
        ...agent,
        prompts: [...agent.prompts.filter((p) => p.id !== data.id), data],
      };
      const res = await updateAgentData(agent.id, newAgent);

      if (!res.success) {
        throw new Error("update error");
      }

      toast.success("Saved prompt successfully!", { id: t });
      setOpen(false);
      updateAgent(newAgent);
      closePrompt();
    } catch (err) {
      toast.error("Can't save prompt. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const updateName = () => {
    setData((prev) => ({
      ...prev,
      variable_name: tempName || prev.variable_name,
    }));
    setNameEdit(false);
  };

  const addVariable = (variable: PromptInput) => {
    setUpdating(true);
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        inputs: [...prev.inputs, variable],
      }));
      setContentEdit(true);
      setUpdating(false);
    }, 60);
  };

  const updatePrompt = (p: Prompt) => {
    setUpdating(true);
    setTimeout(() => {
      setData(p);
      setUpdating(false);
    }, 60);
  };

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(state: boolean) => {
          if (loading) return;

          setOpen(state);

          if (!state) {
            setTimeout(() => {
              closePrompt();
            }, 400);
          }
        }}
      >
        <DrawerContent className="min-h-[60svh] dark:bg-[#070707]">
          <div className="p-3 pl-5 pr-5 w-full flex flex-col h-full">
            <div className="w-full flex items-center">
              {nameEdit ? (
                <div className="flex items-center gap-2 p-1 rounded-lg min-w-max">
                  <input
                    data-vaul-no-drag
                    id="prompt-name-input"
                    className="bg-transparent border-0 outline-0 text-sm border-b-1 border-dashed p-0.5"
                    placeholder="Prompt name..."
                    autoFocus={nameEdit}
                    defaultValue={data.variable_name}
                    onInput={(e) => {
                      setTempName(cleanText(e.currentTarget.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateName();
                      }
                      if (e.key === "Escape") {
                        e.preventDefault();
                        setTempName(undefined);
                        setNameEdit(false);
                      }
                    }}
                    onBlur={() => {
                      if (!tempName || tempName === data.variable_name) {
                        setNameEdit(false);
                        setTempName(undefined);
                      }
                    }}
                  />
                  <Button
                    isIconOnly
                    size="sm"
                    color="primary"
                    className="transition-all w-6 h-6"
                    onPress={() => updateName()}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    className="transition-all w-6 h-6"
                    onPress={() => {
                      setTempName(undefined);
                      setNameEdit(false);
                    }}
                  >
                    <IoCloseOutline />
                  </Button>
                </div>
              ) : (
                <div
                  className="text-sm flex items-center p-1.5 pl-3 pr-3 rounded-lg bg-accent/40 text-foreground/90 gap-1 cursor-pointer hover:bg-accent/50 transition-all min-w-max"
                  onClick={() => setNameEdit(true)}
                >
                  <FaHashtag />
                  {data.variable_name}
                  <MdEdit className="ml-2" />
                </div>
              )}

              <div className="w-full flex items-center justify-end gap-3">
                <EngineOptions prompt={data} setPrompt={setData} />
                <PromptEngineSelection
                  prompt={data}
                  updatePrompt={updatePrompt}
                  open={engineOpen}
                  setOpen={setEngineOpen}
                />
                <Button
                  size="sm"
                  color="primary"
                  className="font-semibold"
                  startContent={<MdDownloadDone size={17} />}
                  isLoading={loading}
                  onPress={() => {
                    if (!loading) {
                      saveChanges();
                    }
                  }}
                >
                  Save prompt
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-full h-full pt-6">
              <div className="border-t-1 p-3 pr-0 pl-0 text-sm flex items-center gap-3 w-full">
                <div className="flex items-center gap-3 w-full">
                  {!updating && (
                    <PromptVariables
                      addVariable={addVariable}
                      prompt={data}
                      updatePrompt={updatePrompt}
                      variables={[
                        ...variables,
                        {
                          source: {
                            name: "prompt-3",
                            id: "promptprompt",
                          },
                          variable: {
                            id: "documents",
                            type: "number",
                            description: "The number of documents",
                          },
                        },
                      ]}
                    />
                  )}
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Button
                    size="sm"
                    color="default"
                    variant="flat"
                    startContent={<BsStars size={17} />}
                  >
                    Generate prompt
                  </Button>
                </div>
              </div>
              {!updating && (
                <PromptContentEditor
                  prompt={data}
                  variables={[
                    ...variables,
                    {
                      source: {
                        name: "prompt-3",
                        id: "promptprompt",
                      },
                      variable: {
                        id: "documents",
                        type: "number",
                        description: "The number of documents",
                      },
                    },
                  ]}
                  updatePrompt={setData}
                  focus={contentEdit}
                  updateFocus={setContentEdit}
                  addVariable={addVariable}
                />
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
