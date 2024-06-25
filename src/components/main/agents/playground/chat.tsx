"use client";

import { Button } from "@nextui-org/react";
import {
  Agent,
  Client,
  FromSchema,
  JSONSchema,
  createActionSchema,
} from "@scoopika/client";
import { AgentData, LLMToolCall, RawEngines } from "@scoopika/types";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { RiRobot2Fill, RiVoiceprintLine } from "react-icons/ri";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaRocket,
} from "react-icons/fa6";
import Code from "../../code";
import { MdContentCopy, MdInfo } from "react-icons/md";
import { toast } from "sonner";
import remarkHtml from "remark-html";
import { remark } from "remark";
import Link from "next/link";
import { IoIosClose, IoMdTrash } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatState } from "./state";

interface Props {
  userId: string;
  agent: AgentData;
  engines: RawEngines;
  token: string;
}

const UserMessage = ({
  text,
  images,
  openImage,
}: {
  text: string;
  images: string[];
  openImage: (i: string) => any;
}) => {
  return (
    <div className="flex w-full justify-end gap-4 lg:p-4">
      <div className="p-4 rounded-t-md rounded-b-2xl bg-accent/40 text-sm">
        {images.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            {images.map((image, index) => (
              <img
                key={`imgusermsg-${text}-${index}`}
                src={image}
                className="w-14 h-14 rounded-xl hover:opacity-80 transition-all cursor-pointer"
                onClick={() => openImage(image)}
              />
            ))}
          </div>
        )}
        {text}
      </div>
    </div>
  );
};

const AgentMessage = ({
  avatar,
  content,
  toolCalls,
  openTool,
}: {
  avatar?: string | null;
  content: string;
  toolCalls: { call: LLMToolCall; result: any }[];
  openTool: (t: { call: LLMToolCall; result: any }) => any;
}) => {
  const markdown = remark().use(remarkHtml).processSync(content);

  return (
    <div className="lg:p-4 flex flex-col lg:flex-row lg:items-start gap-2 md:gap-4 group w-full mt-3">
      {avatar ? (
        <img
          src={avatar}
          className="w-10 h-10 rounded-full object-cover p-1 border-1"
        />
      ) : (
        <div className="w-10 h-10 rounded-full flex items-center justify-center border-1 p-1">
          <RiRobot2Fill />
        </div>
      )}
      <div className="rounded-t-md rounded-b-2xl text-sm opacity-90 pt-3">
        {toolCalls.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            {toolCalls.map((t) => (
              <div
                key={`toolcall-${t.call.id}`}
                className="text-xs opacity-70 flex items-center gap-2 cursor-pointer hover:opacity-100 transition-all"
                onClick={() => openTool(t)}
              >
                <FaCheck />
                Talked with {t.call.function.name}
                <FaChevronRight size={12} />
              </div>
            ))}
          </div>
        )}
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: markdown }}
        ></div>
        <div className="flex items-center gap-3 mt-4 group-hover:opacity-100 opacity-0 transition-all">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => {
              navigator.clipboard.writeText(`${content}`);
              toast.success("Copied message content");
            }}
            startContent={<MdContentCopy />}
          />
        </div>
      </div>
    </div>
  );
};

const getAgent = (
  userId: string,
  token: string,
  engine: string,
  id: string
) => {
  const client = new Client(
    `https://scoopika-run-35.deno.dev/scoopika-agent/${userId}/${token}/${engine}/${id}`
  );
  const agentInstance = new Agent(id, client);

  return { client, agentInstance };
};

export default function PlaygroundChat({
  agent,
  engines,
  token,
  userId,
}: Props) {
  const llmClient = Object.keys(engines)[0];
  const llmClientKey: string | undefined =
    typeof llmClient === "string" ? (engines as any)[llmClient] : undefined;
  const engineReq = llmClientKey
    ? `${llmClient}--KEY--${llmClientKey}`
    : "NO-KEY";

  const { client, agentInstance } = getAgent(userId, token, engineReq, agent.id);
  const {
    changeSession,
    messages,
    status,
    loading,
    generating,
    streamPlaceholder,
    newRequest,
  } = useChatState(client, agentInstance, {
    agent_name: agent.name,
    scroll: () => {
      const elm = document.getElementById("bottom-div");
      if (elm) elm.scrollIntoView();
    },
  });

  const [openTool, setOpenTool] = useState<
    { call: LLMToolCall; result: any } | undefined
  >();
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [openImage, setOpenImage] = useState<string | undefined>(undefined);
  const [back, setBack] = useState<boolean>(false);

  const run = async () => {
    if (loading || generating || textInput.length < 1) return;

    const elm = document.getElementById("chat-input") as HTMLInputElement;
    elm.value = "";

    await fetch(`https://scoopika-run-35.deno.dev/add-agent/${agent.id}`, {
      method: "POST",
      body: JSON.stringify({ agent }),
    });

    setTextInput("");
    setImages([]);
    await newRequest({
      inputs: {
        message: textInput,
        images,
      },
      hooks: {
        onError: () => {
          toast.error("We had an issue. sorry :(", {
            description:
              "Try refreshing the page. this can be due to the session expiring",
          });
        },
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files || []);
    const imageFiles = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imageFiles)
      .then((imagePreviews) => setImages((prev) => [...prev, ...imagePreviews]))
      .catch((_error) => toast.error("Can't read uploaded image(s)"));
  };

  return (
    <div className="max-w-screen pb-24 md:pb-0">
      <DropdownMenu open={back} onOpenChange={setBack}>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="flat"
            className="font-semibold"
            startContent={<FaChevronLeft />}
            onPress={() => setBack(true)}
          >
            Go back
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <Button
            size="sm"
            variant="light"
            startContent={<FaChevronLeft />}
            className="justify-start"
            as={Link}
            href="/app/playground"
          >
            Chat with another agent
          </Button>
          <Button
            size="sm"
            variant="light"
            startContent={<RiRobot2Fill />}
            className="justify-start"
            as={Link}
            href={`/app/agents/${agent.id}`}
          >
            Go to {agent.name} page
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="text-xs text-center w-full mt-2 flex justify-center mb-3">
        <Link
          href="https://docs.scoopika.com/guides/build-scoopika-playground"
          target="_blank"
          className="text-center p-1.5 pl-3 pr-3 border-1 rounded-lg md:rounded-full bg-accent/20 md:max-w-[80%] flex md:items-center gap-2 group hover:border-black/20 dark:hover:border-white/20 transition-all"
        >
          <FaRocket />
          <div className="text-start md:text-center">
            This playground is built using Scoopika, learn how
          </div>
        </Link>
      </div>
      <div className={`p-14 relative mt-10 ${messages.length > 0 && "hidden"}`}>
        <div className="absolute w-full border-t-1 left-0 top-4"></div>
        <div className="absolute w-full border-t-1 left-0 bottom-4"></div>
        <div className="absolute h-full border-r-1 left-4 top-0"></div>
        <div className="absolute h-full border-r-1 right-4 top-0"></div>
        <div className="w-full flex flex-col items-center justify-center gap-3">
          {agent.avatar ? (
            <img
              src={agent.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent">
              <RiRobot2Fill />
            </div>
          )}
          <div className="text-sm opacity-80">Chatting with {agent.name}</div>
        </div>
        <div className="w-full flex items-center text-center text-xs opacity-80 mt-6 lg:pr-6 lg:pl-6">
          You might face problems in long-going chats due to the fact that this
          playground uses an in-memory store in a Serverless environment and
          sessions are not persistent
        </div>
      </div>
      <div className="w-full flex-col flex items-center justify-end gap-4 lg:p-10 lg:pr-14 lg:pl-14">
        {messages.map((message, index) => {
          if (message.role === "agent") {
            return (
              <AgentMessage
                key={`agentmessage-${index}`}
                openTool={setOpenTool}
                content={`${message.response.content}`}
                avatar={agent.avatar}
                toolCalls={message.tools}
              />
            );
          }

          return (
            <UserMessage
              key={`usermessage-${index}`}
              openImage={setOpenImage}
              text={`${message?.request?.message}`}
              images={message?.request?.images || []}
            />
          );
        })}

        {streamPlaceholder && streamPlaceholder.response.content.length > 0 && (
          <AgentMessage
            openTool={setOpenTool}
            content={`${streamPlaceholder.response.content}`}
            avatar={agent.avatar}
            toolCalls={streamPlaceholder.response.tools_calls}
          />
        )}

        <div id="bottom-div"></div>
      </div>

      <div className="flex justify-end flex-col md:flex-row md:items-center gap-4 fixed bottom-20 right-8 border-black/20 dark:border-white/20">
        {typeof status === "string" && (
          <Button
            size="sm"
            variant="bordered"
            isLoading
            className="backdrop-blur"
          >
            {`${status}...`}
          </Button>
        )}
        <Button
          size="sm"
          variant="bordered"
          className="font-semibold text-red-500 border-1 backdrop-blur"
          startContent={<IoMdTrash />}
          onPress={() => changeSession()}
        >
          Clear session
        </Button>
        <Button
          size="sm"
          variant="bordered"
          id="voice-switch"
          className="font-semibold border-1 backdrop-blur hidden lg:flex"
          startContent={<RiVoiceprintLine size={16} />}
          endContent={<FaChevronRight />}
          as={Link}
          href={`/app/playground?id=${agent.id}&voice=y`}
        >
          Switch to voice chat
        </Button>
      </div>

      {/** Message bar */}
      <div className="fixed bottom-0 left-0 flex flex-col items-center justify-center w-full p-4 md:pl-80 md:pr-6 md:pb-4 min-h-max gap-4">
        <div
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          className={`w-full p-2 border-1 rounded-xl flex flex-col gap-4 backdrop-blur-xl bg-background/90 ${
            inputFocus && "border-black/50 dark:border-white/30"
          }`}
        >
          {images.length > 0 && (
            <div className="flex items-center p-2 pb-0 gap-4">
              {images.map((image, index) => (
                <div
                  key={`imagepreview-${index}`}
                  className="w-12 h-12 relative group"
                >
                  <img
                    src={image}
                    className="w-12 h-12 bg-accent rounded-xl object-cover border-1 relative"
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<IoIosClose size={18} />}
                    onPress={() =>
                      setImages((prev) => prev.filter((i) => i !== image))
                    }
                    className="w-full h-full backdrop-blur absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex w-full items-center gap-3 p-2 pt-0 pb-0 pr-0">
            <input
              type="file"
              accept="image/*"
              multiple
              onInput={handleImageChange}
              id="file-input"
              className="hidden"
            />
            <label htmlFor="file-input">
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                startContent={<LuImagePlus />}
                onPress={() => {
                  const elm = document.getElementById("file-input");
                  if (elm) elm.click();
                }}
              />
            </label>
            <input
              autoFocus
              className="bg-transparent border-0 outline-none text-sm w-full min-h-max resize-none"
              placeholder="Enter your message..."
              id="chat-input"
              onInput={(e) => {
                const value = e?.currentTarget?.value;
                setTextInput(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") run();
              }}
            />
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              startContent={!loading && <BsFillSendFill />}
              isLoading={loading}
              onPress={() => run()}
            />
          </div>
        </div>
      </div>

      {openImage && (
        <Dialog
          open={typeof openImage === "string"}
          onOpenChange={() => setOpenImage(undefined)}
        >
          <DialogContent className="flex items-center justify-center">
            <img src={openImage} className="w-64 h-64 rounded-2xl" />
          </DialogContent>
        </Dialog>
      )}

      {openTool && (
        <Dialog
          open={typeof openTool === "object"}
          onOpenChange={() => setOpenTool(undefined)}
        >
          <DialogContent className="">
            <div className="font-semibold">{openTool.call.function.name}</div>
            <div className="w-full flex justify-center">
              <Code
                language="json"
                className="max-w-96"
                code={
                  typeof openTool.result === "string"
                    ? openTool.result
                    : JSON.stringify(openTool.result, null, 4)
                }
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
