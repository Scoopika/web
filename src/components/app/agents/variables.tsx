"use client";

import { Button } from "@nextui-org/react";
import { Prompt, PromptInput } from "@scoopika/types";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdDataset, MdEdit, MdDelete } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { AgentVariables } from "@/scripts/agents/variables";

interface Props {
  variables: AgentVariables[];
  prompt: Prompt;
  addVariable: (variable: PromptInput) => void;
  updatePrompt: (p: Prompt) => void;
}

const types: PromptInput["type"][] = ["string", "number", "boolean"];

export default function PromptVariables({
  variables,
  prompt,
  addVariable,
  updatePrompt,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>();
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const [id, setID] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>("string");
  const [required, setRequired] = useState<boolean>(true);
  const [edit, setEdit] = useState<PromptInput | undefined>();

  useEffect(() => {
    setDescription(undefined);
    setType("string");
    setRequired(true);
    setID(undefined);
  }, [prompt]);

  const add = () => {
    if (!id) {
      return toast.error("Variable ID is required");
    }

    const exist: boolean =
      prompt.inputs.filter((input) => input.id === id).length > 0
        ? true
        : false;
    if (exist) {
      return toast.error(`Variable with the ID '${id}' already exist`);
    }

    toast.success(`Added variable ${id}:${type}`);
    addVariable({
      id,
      type: type as any,
      required,
      description,
      default: defaultValue,
    });
  };

  const getOtherSource = () =>
    variables.filter(
      (v) => v.variable.id === id && v.source.id !== prompt.id
    )[0];

  const importVariable = () => {
    const exist: boolean =
      prompt.inputs.filter((input) => input.id === id).length > 0
        ? true
        : false;
    if (exist) {
      return toast.error(`Variable with the ID '${id}' already exist`);
    }
    const variable = getOtherSource();
    toast.success(`Imported variable from ${variable.source.name}`);
    addVariable(variable.variable);
  };

  const deleteVariable = (id: string) => {
    const wantedVaraibles = prompt.inputs.filter((v) => v.id !== id);
    const deletedVariable = prompt.inputs.filter((v) => v.id === id);
    updatePrompt({ ...prompt, inputs: wantedVaraibles });

    const t = toast.success(`Deleted ${id}`, {
      cancel: (
        <Button
          size="sm"
          onPress={() => {
            updatePrompt({
              ...prompt,
              inputs: [...wantedVaraibles, ...deletedVariable],
            });
            toast.success(`Restored ${id}`);
          }}
        >
          Undo
        </Button>
      ),
    });
  };

  const updateVariable = () => {
    if (!edit) return;
    const restInputs = prompt.inputs.filter((i) => i.id !== edit.id);
    updatePrompt({ ...prompt, inputs: [...restInputs, edit] });
    toast.success(`Updated ${edit.id}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            color="default"
            variant="flat"
            startContent={<MdDataset size={20} />}
          >
            Variables
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-64 overflow-auto">
          {!edit ? (
            <>
              <div className="text-sm mb-1">Variables</div>
              <div className="text-xs opacity-80">Dynamic input values</div>
              <div className="flex flex-col gap-2 mt-3">
                {prompt.inputs.map((variable) => (
                  <div
                    key={`variableselection-${variable.id}`}
                    className="text-sm p-1 border-1 rounded-md flex items-center gap-2"
                  >
                    <p className="text-sm w-full">{variable.id}</p>
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="w-6 h-6"
                      onPress={() => deleteVariable(variable.id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="text-sm mb-2 flex items-center gap-2">
                <Button
                  isIconOnly
                  color="default"
                  variant="flat"
                  size="sm"
                  className="w-6 h-6"
                  onPress={() => setEdit(undefined)}
                >
                  <FaChevronLeft />
                </Button>
                <p>Edit {edit.id}</p>
              </div>
              <input
                className="w-full pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9 mb-2"
                placeholder="Description"
                defaultValue={edit.description}
                onInput={(e) => {
                  const value =  e?.currentTarget?.value;
                  setEdit((prev) => {
                    if (!prev) return;
                    return {
                      ...prev,
                      description: value || "",
                    };
                  });
                }}
              />
              <input
                onInput={(e) => {
                  const value =  e?.currentTarget?.value;
                  setEdit((prev) => {
                    if (!prev) return;
                    return {
                      ...prev,
                      default: value || "",
                    };
                  });
                }}
                defaultValue={edit.default}
                className="w-full pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9"
                placeholder="Default value"
              />
              <div className="flex w-full items-center justify-end gap-2 text-xs mt-2 mb-2">
                Required
                <Switch
                  checked={edit.required}
                  onCheckedChange={(state: boolean) => {
                    setEdit((prev) => {
                      if (!prev) return;
                      return {
                        ...prev,
                        required: state,
                      };
                    });
                  }}
                />
              </div>
              <Button
                color="primary"
                size="sm"
                className="w-full"
                onPress={() => updateVariable()}
              >
                Save
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>

      {/* ----- */}

      <Popover open={newOpen} onOpenChange={setNewOpen}>
        <PopoverTrigger asChild>
          <Button
            id="newVariableButton"
            size="sm"
            color="default"
            variant="flat"
            startContent={<IoAdd size={20} />}
          >
            Add variable
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-96">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center w-full gap-4">
              <input
                className="max-w-36 pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9"
                placeholder="Variable ID*"
                defaultValue={id}
                onInput={(e) => {
                  setID(e.currentTarget.value);
                }}
              />
              <Select
                defaultValue={type}
                onValueChange={(value: string) => {
                  setType(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Data type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem
                      key={`newvariable-type-select-${type}`}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <input
              className="w-full pl-1.5 pr-1.5 p-0.5 rounded-md border-1 text-sm bg-transparent h-9"
              placeholder="Description"
              defaultValue={description}
              onInput={(e) => {
                setDescription(e.currentTarget.value);
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
            <div className="w-full flex items-center gap-3">
              <Button
                size="sm"
                color="primary"
                className="w-full font-semibold"
                onPress={() => add()}
              >
                Add variable
              </Button>
              <Button
                size="sm"
                color="default"
                variant="flat"
                disabled={!getOtherSource()}
                className="w-full"
                onPress={() => {
                  if (getOtherSource()) {
                    importVariable();
                  }
                }}
              >
                {!getOtherSource()
                  ? "Can't import variable"
                  : `Import from ${getOtherSource().source.name}`}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
