import { InApiTool, Parameter } from "@scoopika/types";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa6";
import SettingsRow from "../settingsRow";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { MdDelete, MdEdit, MdSettings } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  tool: InApiTool;
  updateTool: Dispatch<SetStateAction<InApiTool>>;
}

const methods = ["string", "number", "boolean", "array"];

const textColors: Record<Parameter["type"], string> = {
  string: "text-green-500 dark:text-green-300",
  number: "text-orange-500 dark:text-orange-300",
  boolean: "text-purple-500 dark:text-purple-300",
  object: "text-gold-500 dark:text-gold-300",
  array: "text-pink-500 dark:text-pink-300",
};

export default function ToolInputs({ tool, updateTool }: Props) {
  const [newInputOpen, setNewInputOpen] = useState<boolean>(false);
  const [newInput, setNewInput] = useState<Parameter>({
    type: "string",
    required: true,
  });
  const [newInputKey, setNewInputKey] = useState<string>("");
  const [newInputType, setNewInputType] = useState<Parameter["type"]>("string");
  const [newInputEnum, setNewInputEnum] = useState<string>("");
  const [itemsType, setItemsType] = useState<"string" | "number" | "boolean">(
    "string"
  );

  const isValid = (value?: string) => {
    return typeof value === "string" && value.length > 0;
  };

  const resolveEnums = () => {
    const type = newInputType === "array" ? itemsType : newInputType;
    const enums = newInputEnum.split(",").map((e) => {
      if (type === "string" || type === "object") return e;
      if (type === "number") return Number(e);
      if (type === "boolean") return Boolean(e);
      return e;
    });

    return enums;
  };

  const startNewInput = () => {
    setNewInput({ type: "string", required: true });
    setNewInputKey("");
    setNewInputType("string");
    setNewInputEnum("");
    setItemsType("string");
  };

  const addInput = () => {
    const input: Parameter = {
      ...newInput,
    };

    input.type = newInputType;
    if (input.type === "array") {
      input.items = { type: itemsType };
    }

    const enums = resolveEnums();
    if (enums.length) {
      input.enum = enums;
    }

    if (!isValid(newInputKey)) {
      return toast.error("Input ID is required");
    }

    setNewInputOpen(false);
    updateTool((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        properties: { ...prev.inputs.properties, [newInputKey]: input } as any,
      },
    }));
    startNewInput();
    toast.success("Saved input!");
  };

  const editInput = (key: string, input: Parameter) => {
    setNewInput(input);
    setNewInputKey(key);
    setNewInputEnum((input.enum || []).join(","));
    setNewInputType(input.type);
    setItemsType(
      input?.type === "array"
        ? input?.items?.type || ("string" as any)
        : "string"
    );
  };

  const deleteInput = (key: string) => {
    const inputs = { ...tool.inputs.properties };
    delete inputs[key];
    updateTool((prev) => ({
      ...prev,
      inputs: { ...prev.inputs, properties: inputs },
    }));
  };

  return (
    <>
      <Button
        size="sm"
        variant="flat"
        className="font-semibold w-full"
        endContent={<FaChevronRight />}
        onPress={() => {
          startNewInput();
          setNewInputOpen(true);
        }}
      >
        Add input
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="flat"
            className="font-semibold w-full"
            startContent={<MdSettings size={16} />}
          >
            Manage inputs
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-64 overflow-auto">
          {Object.keys(tool?.inputs?.properties || []).length < 1 && (
            <p className="text-xs opacity-80">No inputs yet!</p>
          )}
          <div className="w-full flex flex-col gap-2">
            {Object.keys(tool?.inputs?.properties || []).map((k, i) => (
              <div
                key={`toolinputitem-${i}-${k}`}
                className={`flex items-center w-full text-xs gap-1 rounded-xl p-1 pl-2 pr-2 group ${
                  !(i & 1) && "bg-accent/40"
                }`}
              >
                <div className="flex items-center gap-1 truncate w-full">
                  {k}:{" "}
                  <span
                    className={`${
                      (textColors as any)[
                        (tool?.inputs?.properties?.[k] || ({} as any))?.type ||
                          "string"
                      ]
                    }`}
                  >
                    {(tool?.inputs?.properties?.[k] || ({} as any))?.type}
                  </span>
                </div>
                <div className="w-full min-w-max flex items-center justify-end transition-all opacity-0 group-hover:opacity-100 gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<MdEdit />}
                    onPress={() => {
                      editInput(k, tool?.inputs?.properties?.[k] as any);
                      setNewInputOpen(true);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<MdDelete />}
                    className="text-red-500"
                    onPress={() => deleteInput(k)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {newInputOpen && (
        <Dialog open={true} onOpenChange={setNewInputOpen}>
          <DialogContent className="max-h-screen overflow-auto dark:border-white/20">
            <div className="font-semibold">Input</div>
            <SettingsRow
              title="ID"
              description="Use this input in request link or body using the `${id}` syntax"
            >
              <Input
                placeholder="Input ID"
                className="max-w-full"
                defaultValue={newInputKey}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setNewInputKey(value);
                }}
              />
            </SettingsRow>
            <SettingsRow
              title="Description"
              description="Describe the input so the agent understands it"
            >
              <Input
                placeholder="Description (e.g the user ID)"
                className="max-w-full"
                defaultValue={newInput.description}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setNewInput((prev) => ({ ...prev, description: value }));
                }}
              />
            </SettingsRow>
            <SettingsRow title="Type" description="The data type of the input">
              <Select
                defaultValue={newInputType}
                onValueChange={(v: any) => setNewInputType(v)}
              >
                <SelectTrigger
                  className={`${(textColors as any)[newInputType]}`}
                >
                  <SelectValue placeholder="Input type" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((m, index) => (
                    <SelectItem
                      key={`selectnewmethod-${index}`}
                      value={m}
                      className={`${(textColors as any)[m]}`}
                    >
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingsRow>
            {newInputType === "array" && (
              <SettingsRow
                title="Items type"
                description="The data type of items in this array"
              >
                <Select
                  defaultValue={itemsType}
                  onValueChange={(v: any) => setItemsType(v)}
                >
                  <SelectTrigger
                    className={`${(textColors as any)[itemsType]}`}
                  >
                    <SelectValue placeholder="Items type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["string", "number", "boolean"].map((m, index) => (
                      <SelectItem
                        key={`selectnewmethod-${index}`}
                        value={m}
                        className={`${(textColors as any)[m]}`}
                      >
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SettingsRow>
            )}
            <SettingsRow
              title="Default value"
              description="The default value to fallback to (optional)"
            >
              <Input
                placeholder="Default"
                className="max-w-full"
                defaultValue={newInput.default}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setNewInput((prev) => ({ ...prev, default: value }));
                }}
              />
            </SettingsRow>
            <SettingsRow
              title="Enum (optional)"
              description="List of accepted values separated by comma (without space)"
            >
              <Input
                placeholder="Enum values (e.g. desc, asc)"
                className="max-w-full"
                defaultValue={newInputEnum}
                onInput={(e) => {
                  const value = e?.currentTarget?.value;
                  setNewInputEnum(value);
                }}
              />
            </SettingsRow>
            <div className="w-full flex items-center gap-3 justify-end">
              <div className="text-sm opacity-80">
                Is this input value required or not
              </div>
              <Switch
                defaultChecked={newInput.required ? true : false}
                onCheckedChange={(v) =>
                  setNewInput((prev) => ({ ...prev, required: v } as any))
                }
              />
            </div>
            <Button
              size="sm"
              color="primary"
              className="font-semibold w-full"
              onPress={() => addInput()}
            >
              Save input
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
