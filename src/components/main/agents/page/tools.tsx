"use client";

import Editor from "@monaco-editor/react";
import { Button } from "@nextui-org/react";
import { AgentData, InApiTool } from "@scoopika/types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaCode } from "react-icons/fa6";
import { MdApi, MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import SettingsRow from "../../settingsRow";
import { Input } from "@/components/ui/input";
import ToolInputs from "../toolInputs";
import AppHead from "../../head";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToolHeaders from "../toolHeaders";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import tryRequest from "@/scripts/tryRequest";
import updateAgentData from "@/functions/agents/update";
import Empty from "../../empty";
import { AiFillApi } from "react-icons/ai";
import ProMessage from "../../proMessage";

interface Props {
  agent: AgentData;
  pro: boolean;
}

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export default function AgentTools({ agent, pro }: Props) {
  const { theme } = useTheme();
  const sampleTool: InApiTool = {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    url: "",
    type: "api",
    method: "GET",
    headers: [],
    inputs: {
      type: "object",
      properties: {},
    },
  };

  const [selectTool, setSelectTool] = useState<boolean>(false);
  const [newToolOpen, setNewToolOpen] = useState<"new" | "edit" | undefined>(
    undefined,
  );
  const [newTool, setNewTool] = useState<InApiTool>({ ...sampleTool });
  const [newToolLoading, setNewToolLoading] = useState<boolean>(false);
  const [deleteTool, setDeleteTool] = useState<string | undefined>(undefined);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [startNew, setStartNew] = useState<boolean>(false);

  const checkValue = (value?: string) => {
    return typeof value === "string" && value.length > 0;
  };

  const saveTool = async () => {
    if (newToolLoading) return;

    if (!checkValue(newTool.name) || !checkValue(newTool.description)) {
      return toast.error("Fill tool name and description");
    }

    if (!checkValue(newTool.url)) {
      return toast.error("Fill tool API URL");
    }

    setNewToolLoading(true);
    tryRequest({
      loading: "Saving changes...",
      success: "Saved tool",
      error: "Can't save tool",
      func: async () => {
        const tools = (agent.in_tools || []).filter(
          (t) => t.type !== "api" || t.id !== newTool.id,
        );
        const payload: AgentData = {
          ...agent,
          in_tools: [
            ...tools,
            {
              ...newTool,
              id: newToolOpen === "edit" ? newTool.id : crypto.randomUUID(),
            },
          ],
        };

        if (
          (payload.in_tools || []).filter((t) => t.type === "api").length > 3 &&
          !pro
        ) {
          throw new Error(
            "Upgrade your plan to add more than 3 API tools to your app",
          );
        }

        const res = await updateAgentData(agent.id, payload);

        if (!res || !res.success) {
          throw new Error("Can't update agent. contact support");
        }
      },
      end: () => {
        setNewToolLoading(false);
        setNewToolOpen(undefined);
        setNewTool({ ...sampleTool });
      },
    });
  };

  const deleteToolNow = async () => {
    if (deleteLoading || !deleteTool) return;

    setDeleteLoading(true);
    tryRequest<boolean>({
      loading: "Removing tool...",
      success: "Removed tool",
      error: "Can't remove tool",
      func: async () => {
        const tools = [
          ...(agent.in_tools || []).filter(
            (t) => t.type !== "api" || t.id !== deleteTool,
          ),
        ];
        const res = await updateAgentData(agent.id, {
          ...agent,
          in_tools: tools,
        });

        if (!res || !res.success) {
          throw new Error("Can't update agent. contact support");
        }

        return res.success;
      },
      end: (s) => {
        setDeleteLoading(false);
        if (s) {
          setDeleteTool(undefined);
        }
      },
    });
  };

  if (newToolOpen) {
    return (
      <>
        <AppHead
          title="New API Tool"
          description="Give this agent access to a new API it can call based on context"
          back={
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              startContent={<FaChevronLeft />}
              onPress={() => setNewToolOpen(undefined)}
            />
          }
        />
        <SettingsRow
          title="Tool name"
          description="Give this tool a clear name (e.g search_web)"
        >
          <Input
            placeholder="Tool name"
            defaultValue={newTool.name}
            onInput={(e) => {
              const value = e?.currentTarget?.value;
              setNewTool((prev) => ({ ...prev, name: value }));
            }}
          />
        </SettingsRow>
        <SettingsRow
          title="Tool description"
          description="Describe what your tools does and when the agent should call it"
        >
          <Input
            placeholder="Describe this tool"
            defaultValue={newTool.description}
            onInput={(e) => {
              const value = e?.currentTarget?.value;
              setNewTool((prev) => ({ ...prev, description: value }));
            }}
          />
        </SettingsRow>
        <SettingsRow
          title="Tool inputs"
          description="Those are the variables the agent will send this tool when calling it. variables can be used in the url and request body using the `${input_name}` syntax"
        >
          <ToolInputs tool={newTool} updateTool={setNewTool} />
        </SettingsRow>
        <SettingsRow
          title="API Url"
          description="Request will be sent to this URL. inputs or variables can be added using the `${input_id}` syntax. Invalid URLs will cause errors"
        >
          <Input
            placeholder="API Url (e.g. https://api.github.com/repos/scoopika/scoopika)"
            defaultValue={newTool.url}
            type="url"
            onInput={(e) => {
              const value = e?.currentTarget?.value;
              setNewTool((prev) => ({ ...prev, url: value }));
            }}
          />
        </SettingsRow>
        <SettingsRow
          title="Request method"
          description="The method used to send the request"
        >
          <Select
            defaultValue={newTool.method}
            onValueChange={(v: any) =>
              setNewTool((prev) => ({ ...prev, method: v }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Input type" />
            </SelectTrigger>
            <SelectContent>
              {methods.map((m, index) => (
                <SelectItem key={`selectnewmethod-${index}`} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingsRow>
        <SettingsRow
          title="Request headers"
          description="Set the headers used in requests to this API"
        >
          <ToolHeaders tool={newTool} updateTool={setNewTool} />
        </SettingsRow>
        {newTool.method !== "GET" && (
          <SettingsRow
            title="Request body"
            description="Define the request body or data to be sent to the API. this can be in any format based on the API you're using. You can add inputs using the `${input_id}` syntax"
          >
            <div className="border-1 rounded-xl border-black/20 dark:border-white/20 overflow-hidden w-full flex flex-col">
              <div className="p-3 text-xs opacity-80">Request body editor</div>
              <Editor
                defaultLanguage="bash"
                defaultValue={newTool.body}
                onChange={(v) => setNewTool((prev) => ({ ...prev, body: v }))}
                height={"12rem"}
                className="bg-transparent border-1"
                loading={
                  <div className="text-xs opacity-80">Loading editor...</div>
                }
                options={{
                  minimap: {
                    enabled: false,
                  },
                  automaticLayout: true,
                  lineNumbers: "off",
                }}
                theme={theme === "dark" ? "vs-dark" : "light"}
              />
            </div>
          </SettingsRow>
        )}
        <div className="w-full flex items-center justify-end p-4">
          <Button
            size="sm"
            color="primary"
            className="font-semibold w-full lg:max-w-max"
            endContent={<FaChevronRight />}
            onPress={() => saveTool()}
            isLoading={newToolLoading}
          >
            Save tool
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHead
        title="Tools"
        description="Give your agent access to external APIs and functions"
        action={
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="light"
              as={Link}
              href="https://docs.scoopika.com/agents/features/tools"
              target="_blank"
            >
              Learn more
            </Button>
            <Dialog open={selectTool} onOpenChange={setSelectTool}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="bordered"
                  className="font-semibold border"
                  endContent={<FaChevronRight />}
                >
                  Add tool
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="font-semibold">Add tool</div>
                <div className="text-sm opacity-80 mb-6">
                  Select the type of tool you want to add to this agent
                </div>
                <div className="w-full flex items-center gap-4">
                  <div
                    className="p-4 border-1 rounded-xl cursor-pointer w-full hover:border-black/20 dark:hover:border-white/20 transition-all relative"
                    onClick={() => {
                      setSelectTool(false);
                      setNewTool({ ...sampleTool });
                      setNewToolOpen("new");
                    }}
                  >
                    <MdApi className="mb-2" />
                    <div className="absolute top-0 right-0 p-1 pl-2 pr-2 rounded-bl-md rounded-tr-lg bg-foreground text-background text-xs">
                      No code
                    </div>
                    <div className="text-sm font-semibold">External API</div>
                    <div className="text-xs opacity-80">
                      Add APIs that the agent can send HTTP requests to
                    </div>
                  </div>
                  <Link
                    href="https://docs.scoopika.com/tools/get-started"
                    target="_blank"
                    className="p-4 border-1 rounded-xl w-full hover:border-black/20 dark:hover:border-white/20 transition-all relative"
                  >
                    <FaCode className="mb-2" />
                    <div className="absolute top-0 right-0 p-1 pl-2 pr-2 rounded-bl-md rounded-tr-lg bg-accent text-xs">
                      Code
                    </div>
                    <div className="text-sm font-semibold">Custom function</div>
                    <div className="text-xs opacity-80">
                      Add custom functions from your code.
                    </div>
                  </Link>
                </div>
                <Link
                  href="https://docs.scoopika.com/tools/get-started"
                  target="_blank"
                  className="p-4 border-1 rounded-xl w-full hover:border-black/20 dark:hover:border-white/20 transition-all relative"
                >
                  <FaCode className="mb-2" />
                  <div className="absolute top-0 right-0 p-1 pl-2 pr-2 rounded-bl-md rounded-tr-lg bg-accent text-xs">
                    Code
                  </div>
                  <div className="text-sm font-semibold">
                    Client-side actions
                  </div>
                  <div className="text-xs opacity-80">
                    Add custom functions the agent can execute in the users
                    browser
                  </div>
                </Link>
              </DialogContent>
            </Dialog>
          </div>
        }
      />
      <div className="text-sm">
        <div className="flex w-full flex-col gap-3 mt-6">
          {(
            (agent.in_tools || []).filter(
              (t) => t.type === "api",
            ) as InApiTool[]
          ).length < 1 && (
            <Empty
              title="Create first tool"
              description="You can add API tools from the platform with no-code giving your agent the ability to call external APIs. You can also add custom functions from your code!"
              icon={<AiFillApi />}
            />
          )}
          {(
            (agent.in_tools || []).filter(
              (t) => t.type === "api",
            ) as InApiTool[]
          ).map((t, i) => (
            <div
              key={`agenttoolitem-${i}`}
              className={`flex items-center p-2 rounded-xl gap-2 group ${
                !(i & 1) && "bg-accent/40"
              }`}
            >
              <div className="truncate min-w-max">{t.name}</div>
              <div className="w-full min-w-max flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all gap-3">
                <Button
                  size="sm"
                  isIconOnly
                  startContent={<MdEdit />}
                  onPress={() => {
                    setNewTool(t);
                    setNewToolOpen("edit");
                  }}
                />
                <Button
                  size="sm"
                  isIconOnly
                  startContent={<MdDelete />}
                  className="text-red-500"
                  onPress={() => setDeleteTool(t.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <ProMessage
          pro={pro}
          current={
            (agent.in_tools || []).filter((t) => t.type === "api").length
          }
          limit={1}
          info="Upgrade to Pro plan to add more than 3 API tools to your agent"
        />
        {typeof deleteTool === "string" && (
          <Dialog
            open={typeof deleteTool === "string"}
            onOpenChange={
              !deleteLoading ? () => setDeleteTool(undefined) : () => {}
            }
          >
            <DialogContent>
              <div className="font-semibold">Remove tool</div>
              <p className="text-sm opacity-80">
                {agent.name} {"won't"} be able to use this API tool again!
              </p>
              <div className="w-full flex flex-col lg:flex-row lg:justify-end gap-4">
                <Button
                  size="sm"
                  variant="flat"
                  className="font-semibold"
                  onPress={() => {
                    if (!deleteLoading) {
                      setDeleteTool(undefined);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  className="font-semibold bg-red-500/10 border-1 border-red-500"
                  onPress={() => deleteToolNow()}
                  isLoading={deleteLoading}
                >
                  Remove tool
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
