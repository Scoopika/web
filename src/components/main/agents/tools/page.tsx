"use client";

import {
  AgentData,
  AgenticToolItem,
  AgenticToolItemOptions,
  AgenticToolSchema,
} from "@scoopika/types";
import AppHead from "../../head";
import { Button } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight, FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getOptionValue } from "@/scripts/agents/builtin_tools";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import decrypt from "@/functions/decrypt";
import Loading from "../../loading";
import tryRequest from "@/scripts/tryRequest";
import encrypt from "@/functions/encrypt";
import updateAgentData from "@/functions/agents/update";
import ResourceLink from "../../resourceLink";

interface Props {
  agent: AgentData;
  item: AgenticToolItem;
  tool: AgenticToolSchema;
  isNew: boolean;
  closeTool: () => void;
  closeNew: () => void;
}

export default function ToolPage({
  agent,
  item,
  tool,
  isNew,
  closeTool,
  closeNew,
}: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AgenticToolSchema>(tool);
  const [saving, setSaving] = useState<boolean>(false);

  const decryptValues = async () => {
    if (!data) return;

    const options = [...data.options.filter((o) => o.type === "secret")];

    for await (const opt of options) {
      if (!opt.value || `${opt.value}`.length < 1) {
        opt.value = undefined as any;
        continue;
      }
      opt.value = await decrypt(`${opt.value}`);
    }

    setData((prev) => ({
      ...prev,
      options: [...options, ...prev.options.filter((o) => o.type !== "secret")],
    }));
    setLoading(false);
  };

  useEffect(() => {
    if (tool && item) {
      setData(tool);
      if (isNew) {
        setLoading(false);
      } else {
        decryptValues();
      }
    }
  }, []);

  const getToolOption = (itemOption: AgenticToolItemOptions) => {
    let option = data.options.filter((o) => o.id === itemOption.id)[0];
    if (!option) {
      console.log("NO OPTION", itemOption.id);
      option = {
        id: itemOption.id,
        type: itemOption.type,
        value: itemOption.default as any,
      };
    }

    return option;
  };

  const encryptValues = async (): Promise<AgenticToolSchema> => {
    const options = [...data.options.filter((o) => o.type === "secret")];

    for await (const opt of options) {
      if (!opt.value || `${opt.value}`.length < 1) {
        opt.value = undefined as any;
        continue;
      }
      opt.value = await encrypt(`${opt.value}`);
    }

    return {
      ...data,
      options: [...data.options.filter((o) => o.type !== "secret"), ...options],
    };
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);

    const newTool = await encryptValues();
    const newAgent: AgentData = {
      ...agent,
      agentic_tools: [
        ...(agent.agentic_tools || []).filter((t) => t.id !== tool.id),
        newTool,
      ],
    };

    tryRequest<boolean>({
      loading: "Saving tool...",
      success: "Saved tool",
      error: "Can't save tool",
      func: async () => {
        const res = await updateAgentData(agent.id, newAgent);
        if (!res || !res.success) {
          throw new Error("Can't save agent data, please contact support");
        }

        return res.success;
      },
      end: (s) => {
        setSaving(false);
        if (s) closeNew();
      },
    });
  };

  const updateOptionValue = (
    itemOption: AgenticToolItemOptions,
    value: string | undefined,
  ) => {
    setData((prev) => ({
      ...prev,
      options: [
        ...prev.options.filter((o) => o.id !== itemOption.id),
        {
          id: itemOption.id,
          type: itemOption.type,
          value: value as any,
        },
      ],
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AppHead
        title={item.name}
        description={item.description}
        back={
          <img
            src={item.img}
            className="min-w-7 max-w-7 min-h-7 max-h-7 object-cover rounded-full bg-white p-0.5"
          />
        }
        action={
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-end gap-4">
            <Button
              size="sm"
              variant="light"
              startContent={<FaChevronLeft />}
              onPress={() => closeTool()}
              isDisabled={saving}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="bordered"
              className="border"
              endContent={<FaChevronRight />}
              isLoading={saving}
              onPress={() => save()}
            >
              Save tool
            </Button>
          </div>
        }
      />

      <div className="mt-6 flex items-center gap-6">
        {item.links.map((link, index) => (
          <ResourceLink
            key={`sourcelink-${index}`}
            name={link.name}
            link={link.url}
            underline={false}
            showIcon={true}
          />
        ))}
      </div>

      {item.options.length > 0 && (
        <div className="p-5 border rounded-xl mt-6">
          <div className="font-semibold">Options</div>

          <div className="w-full flex flex-col gap-8 mt-6">
            {item.options
              .sort((a, b) => a.index - b.index)
              .map((opt) => (
                <div
                  key={`tool-option-${item.id}-${opt.id}`}
                  className="flex flex-col"
                >
                  <div className="text-sm">{opt.name}</div>
                  <div className="text-xs opacity-70 mb-3">
                    {opt.description}
                    {opt.type === "secret" && " (Encrypted)"}
                  </div>
                  <div className="flex items-center gap-3 p-2 pl-4 border rounded-xl bg-accent/10 h-10">
                    <input
                      className="bg-transparent w-full text-sm"
                      type={opt.type === "secret" ? "password" : opt.type}
                      placeholder={opt.placeholder}
                      defaultValue={getOptionValue(opt, getToolOption(opt))}
                      onInput={(e) => {
                        const value = e?.currentTarget?.value;
                        updateOptionValue(opt, value);
                      }}
                    />
                    {opt.type === "secret" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            color="success"
                            variant="light"
                            className="w-7 h-7"
                            isIconOnly
                            startContent={<FaLock />}
                          />
                        </DialogTrigger>
                        <DialogContent>
                          <div className="font-semibold">Encrypted</div>
                          <div className="text-sm opacity-80">
                            All API keys are encrypted and never accessed by our
                            team. usually you can add an environment variable to
                            your env file if {"you're"} afraid to add it here so{" "}
                            {"it's"} never shared with us, but notice that this
                            tool {"won't"} work when using it in the playground
                            in that case.
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  {opt.env && (
                    <div className="text-xs opacity-70 mt-3">
                      No need to trust us for your API key, you can add{" "}
                      <b>{`'${opt.env}'`}</b> to your environment variables on
                      your servers and {"they'll"} never be shared with us
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="p-5 border rounded-xl mt-6">
        <div className="font-semibold mb-6">Methods</div>
        {item.methods.map((method) => (
          <div
            key={`tool-method-${item.id}-${method.id}`}
            className="bg-accent/80 dark:bg-accent/20 shadow p-3 rounded-md flex flex-col w-full"
          >
            <div className="w-full flex items-center gap-3">
              <div className="min-w-max text-sm">{method.name}</div>
              <div className="w-full flex items-center justify-end">
                <Switch
                  defaultChecked={tool.methods.indexOf(method.id) !== -1}
                  onCheckedChange={(state) => {
                    setData((prev) => ({
                      ...prev,
                      methods: prev.methods.filter((m) => m !== method.id),
                    }));

                    if (state) {
                      setData((prev) => ({
                        ...prev,
                        methods: [
                          ...prev.methods.filter((m) => m !== method.id),
                          method.id,
                        ],
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div className="text-xs opacity-70 mt-3">{method.description}</div>
          </div>
        ))}
      </div>

      <div className="text-sm opacity-70 mt-5">
        Disclaimer: Scoopika team does not own this tool and has not been
        involved into its development, please make sure you check the {"tool's"}{" "}
        terms of use and privacy policy before using it. if you are the owner of
        this tool and want us to take it off our platform, please contact us at
        team@scoopika.com
      </div>
    </>
  );
}
