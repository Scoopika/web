"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import { AgentData, ApiToolSchema, ToolSchema } from "@scoopika/types";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { newTool } from "../tabs/tools";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface Props {
  data: { new: boolean; tool: ToolSchema };
  updateAgent: (agent: AgentData) => void;
  closeEdit: () => void;
}

const methods: ApiToolSchema["method"][] = [
  "get",
  "post",
  "delete",
  "put",
  "patch",
];

export default function AddAgentTool({ data, updateAgent, closeEdit }: Props) {
  const [tool, setTool] = useState<ApiToolSchema>(newTool.tool);
  const [loading, setLoading] = useState<boolean>(false);
  const [tempHeaderKey, setTempHeaderKey] = useState<string | undefined>();
  const [tempHeaderValue, setTempHeaderValue] = useState<string | undefined>();
  const [headersOpen, setHeadersOpen] = useState<boolean>(false);

  useEffect(() => {
    setTool(JSON.parse(JSON.stringify(data.tool)));
    setLoading(false);
  }, [data]);

  const updateFunction = <K extends keyof ApiToolSchema["tool"]["function"]>(
    key: K,
    data: ToolSchema["tool"]["function"][K]
  ) => {
    setTool((prev) => ({
      ...prev,
      tool: {
        ...prev?.tool,
        function: { ...prev?.tool.function, [key]: data },
      },
    }));
  };

  const updateTool = <K extends keyof ApiToolSchema>(
    key: K,
    data: ApiToolSchema[K]
  ) => {
    setTool((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  return (
    <>
      <div className="w-full flex items-center gap-3 text-sm mb-5">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onPress={() => {
            if (!loading) {
              closeEdit();
            }
          }}
          disabled={loading}
        >
          <FaChevronLeft />
        </Button>
        <p className="font-semibold">{data.new ? "New tool" : "Edit tool"}</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Input
          placeholder="Tool name"
          defaultValue={tool?.tool?.function?.name}
          autoFocus
          onInput={(e) => {
            updateFunction("name", e.currentTarget.value || "");
          }}
        />
        <Input
          placeholder="Describe what this tool does"
          defaultValue={tool?.tool?.function?.description}
          onInput={(e) => {
            updateFunction("description", e.currentTarget.value || "");
          }}
        />

        <div className="w-full flex items-center gap-3">
          <Input
            placeholder="API Url"
            defaultValue={tool?.url}
            className="w-full"
            type="url"
            onInput={(e) => {
              updateTool("url", e.currentTarget.value || "");
            }}
          />
          <Select
            defaultValue={tool.method}
            onValueChange={(value: ApiToolSchema["method"]) => {
              updateTool("method", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Request method" />
            </SelectTrigger>
            <SelectContent>
              {methods.map((method) => (
                <SelectItem key={`methodselectitem-${method}`} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex flex-col p-2 border-1 rounded-md">
          <div className="w-full flex items-center">
            <p className="text-sm min-w-max">Headers</p>
            <div className="w-full flex items-center justify-end">
              <Popover open={headersOpen} onOpenChange={setHeadersOpen}>
                <PopoverTrigger asChild>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "ArrowDown") {
                        setHeadersOpen(true);
                      }
                    }}
                  >
                    <MdAdd size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Input
                    placeholder="Header key"
                    className="mb-2 text-sm"
                    defaultValue={tempHeaderKey}
                    onInput={(e) => {
                      setTempHeaderKey(e.currentTarget.value);
                    }}
                  />
                  <Input
                    placeholder="Header value"
                    className="mb-2 text-sm"
                    defaultValue={tempHeaderValue}
                    onInput={(e) => {
                      setTempHeaderValue(e.currentTarget.value);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    className="w-full"
                    onPress={() => {
                      if (!tempHeaderKey || !tempHeaderValue) {
                        return toast.error("Header key and value are required");
                      }
                      const headers = tool.headers;
                      updateTool("headers", {
                        ...headers,
                        [tempHeaderKey]: tempHeaderValue,
                      });
                      setTempHeaderKey(undefined);
                      setTempHeaderValue(undefined);
                      setHeadersOpen(false);
                    }}
                  >
                    Add
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {Object.keys(tool.headers || {}).length > 0 && (
            <div className="mt-1 w-full flex flex-col">
              {Object.keys(tool.headers || {}).map((key, index) => (
                <div
                  key={`headeritem-${key}`}
                  className={`flex items-center w-full mt-2 rounded-md group p-2 pl-3 pr-3 ${
                    !(index & 1) && "bg-black/20 dark:bg-accent/30"
                  }`}
                >
                  <p className="text-sm min-w-max">{key}</p>
                  <div className="w-full flex items-center justify-end overflow-hidden opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={() => {
                        const headers = JSON.parse(
                          JSON.stringify(tool.headers)
                        );
                        delete headers[key];
                        updateTool("headers", headers);
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex flex-col p-3 border-1 rounded-md">
          <div className="text-sm mb-3">Parameters</div>
          
        </div>
      </div>
    </>
  );
}
