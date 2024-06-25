"use client";

import { AgentData, AgenticToolItem, AgenticToolSchema } from "@scoopika/types";
import AppHead from "../../head";
import { Button } from "@nextui-org/react";
import { FaCheck, FaChevronLeft, FaCode } from "react-icons/fa6";
import { MdApi } from "react-icons/md";
import builtinTools, { makeSample } from "@/scripts/agents/builtin_tools";
import Link from "next/link";
import { TbPointerCode } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import ToolPage from "./page";

interface Props {
  agent: AgentData;
  newApiTool: () => void;
  closeNew: () => void;
}

export default function AgentToolsBase({ agent, newApiTool, closeNew }: Props) {
  const [search, setSearch] = useState<string>("");
  const [openTool, setOpenTool] = useState<
    | {
        item: AgenticToolItem;
        tool: AgenticToolSchema;
        isNew: boolean;
      }
    | undefined
  >();

  if (openTool) {
    return (
      <ToolPage
        item={openTool.item}
        tool={openTool.tool}
        isNew={openTool.isNew}
        agent={agent}
        closeTool={() => setOpenTool(undefined)}
        closeNew={closeNew}
      />
    );
  }

  return (
    <>
      <AppHead
        title="Add new tool"
        description="Add a new tool to this agent allowing it to perform actions or fetch data"
        back={
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            startContent={<FaChevronLeft />}
            onPress={() => closeNew()}
          />
        }
      />

      <div className="w-full flex items-center gap-3 border-1 rounded-xl p-3 mt-4 bg-accent/10">
        <FaSearch className="opacity-50" />
        <input
          defaultValue={search}
          placeholder="Search available tools..."
          className="bg-transparent w-full text-sm"
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setSearch(`${value || ""}`.toLowerCase());
          }}
        />
      </div>

      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex gap-4">
        {`${search}`.length < 1 && (
          <>
            <div
              className="flex flex-col p-5 border-1 rounded-xl cursor-pointer w-full shadow border-black/20 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 transition-all dark:border-dashed hover:bg-accent/10 h-48"
              onClick={() => newApiTool()}
            >
              <div className="min-w-9 max-w-9 min-h-9 max-h-9 flex items-center justify-center border rounded-md mb-4">
                <MdApi />
              </div>
              <div className="h-full flex flex-col justify-end">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  External API
                  <div className="text-xs p-1 pl-2 pr-2 bg-accent/50 rounded-md">
                    No code
                  </div>
                </div>
                <div className="text-xs opacity-80">
                  Agents can send HTTP requests to any external APIs, use this
                  type of tools to add APIs to your agent
                </div>
              </div>
            </div>
            <Link
              href="https://docs.scoopika.com/tools/get-started"
              target="_blank"
              className="flex flex-col p-5 border-1 rounded-xl w-full shadow border-black/20 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 transition-all dark:border-dashed hover:bg-accent/10 h-48"
            >
              <div className="min-w-9 max-w-9 min-h-9 max-h-9 flex items-center justify-center border rounded-md mb-4">
                <FaCode />
              </div>
              <div className="h-full flex flex-col justify-end">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  Custom function
                  <div className="text-xs p-1 pl-2 pr-2 bg-accent/50 rounded-md">
                    Code
                  </div>
                </div>
                <div className="text-xs opacity-80">
                  Add custom functions from your code that the agent can call to
                  do anything you want it to allowing full flexibility
                </div>
              </div>
            </Link>
            <Link
              href="https://docs.scoopika.com/tools/get-started"
              target="_blank"
              className="flex flex-col p-5 border-1 rounded-xl w-full shadow border-black/20 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 transition-all dark:border-dashed hover:bg-accent/10 h-48"
            >
              <div className="min-w-9 max-w-9 min-h-9 max-h-9 flex items-center justify-center border rounded-md mb-4">
                <TbPointerCode />
              </div>
              <div className="h-full flex flex-col justify-end">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  Client-side actions
                  <div className="text-xs p-1 pl-2 pr-2 bg-accent/50 rounded-md">
                    Code
                  </div>
                </div>
                <div className="text-xs opacity-80">
                  Add custom functions defined on the client-side that the agent
                  can execute safely in the users browser in real-time
                </div>
              </div>
            </Link>
          </>
        )}
        {builtinTools
          .filter(
            (t) =>
              t.name.toLowerCase().includes(search) ||
              t.description.toLowerCase().includes(search)
          )
          .map((tool) => (
            <div
              key={`tool-base-builtin-item-${tool.id}`}
              className="flex flex-col p-5 border-1 rounded-xl cursor-pointer w-full shadow hover:border-black/20 dark:hover:border-white/20 transition-all relative hover:bg-accent/10"
              onClick={() => {
                const exist = (agent.agentic_tools || []).filter(
                  (t) => t.id === tool.id
                )[0];
                if (exist) {
                  setOpenTool({
                    item: tool,
                    tool: exist,
                    isNew: false,
                  });
                  return;
                }

                setOpenTool({
                  item: tool,
                  tool: makeSample(tool),
                  isNew: true,
                });
              }}
            >
              <img
                src={tool.img}
                className="min-w-8 max-w-8 min-h-8 max-h-8 mb-6 object-cover rounded-full bg-white p-0.5"
              />
              {(agent.agentic_tools || []).filter(
                (t) => t.id === tool.id
              )[0] && (
                <div className="absolute top-1 right-1 p-1 pl-2 pr-2 rounded-bl-md rounded-tr-lg bg-accent text-xs flex items-center gap-2">
                  <FaCheck />
                  in use
                </div>
              )}
              <div className="h-full flex flex-col justify-end">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  {tool.name}
                  <div className="opacity-70 text-xs">
                    {tool.methods.length}{" "}
                    {tool.methods.length <= 1 ? "method" : "methods"}
                  </div>
                </div>
                <div className="text-xs truncate opacity-80">
                  {tool.description}
                </div>
                <div className="flex items-center gap-2 truncate mt-2">
                  {tool.tags.map((tag) => (
                    <div
                      key={`base-tool-item-${tool.id}-tags-${tag}`}
                      className="text-xs p-1 pl-2 pr-2 bg-accent/50 rounded-md opacity-80"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="text-sm mt-10 opacity-70">
        Much more tools are coming soon
      </div>
    </>
  );
}
