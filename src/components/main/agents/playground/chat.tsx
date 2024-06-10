"use client";

import { Button } from "@nextui-org/react";
import { Agent, Client } from "@scoopika/client";
import {
  AgentData,
  Inputs,
  LLMToolCall,
  RawEngines,
  RunHistory,
} from "@scoopika/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { RiRobot2Fill, RiVoiceprintLine } from "react-icons/ri";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Code from "../../code";
import { MdContentCopy } from "react-icons/md";
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

interface Props {
  userId: string;
  userAvatar?: string | null;
  agent: AgentData;
  engines: RawEngines;
  setEngines: Dispatch<SetStateAction<RawEngines>>;
  pro: boolean;
  token: string;
}

const UserMessage = ({
  text,
  images,
  openImage,
  avatar,
}: {
  text: string;
  images: string[];
  openImage: (i: string) => any;
  avatar?: string | null;
}) => {
  return (
    <div className="flex w-full justify-end gap-4 lg:p-4">
      <div className="p-4 rounded-t-md rounded-b-2xl bg-accent/40 text-sm">
        {images.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            {images.map((image) => (
              <img
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

export default function PlaygroundChat({
  agent,
  engines,
  setEngines,
  pro,
  token,
  userId,
  userAvatar,
}: Props) {
  const [client, setClient] = useState<Client>(
    new Client(
      `https://scoopika-run-35.deno.dev/scoopika-agent/${userId}/${agent.id}`
    )
  );
  const [agentInstance, setAgentInstance] = useState<Agent>(
    new Agent(agent.id, client)
  );

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [images, setImages] = useState<string[]>([]);
  const [openImage, setOpenImage] = useState<string | undefined>(undefined);
  const [openTool, setOpenTool] = useState<
    { call: LLMToolCall; result: any } | undefined
  >(undefined);
  const [messages, setMessages] = useState<RunHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<string>(crypto.randomUUID());
  const [goingMessage, setGoingMessage] = useState<string>("");
  const [goingTools, setGoingTools] = useState<
    { call: LLMToolCall; result: any }[]
  >([]);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [recordOpen, setRecordOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [back, setBack] = useState<boolean>(false);

  const scroll = () => {
    const elm = document.getElementById("bottom-div");

    if (elm) elm.scrollIntoView();
  };

  const run = async () => {
    if (loading) return;

    const elm = document.getElementById("chat-input") as HTMLInputElement;

    if (elm) {
      elm.value = "";
      elm.focus();
    }

    if (!message || message.length < 1) return;
    const run = crypto.randomUUID();

    const request: RunHistory = {
      role: "user",
      at: Date.now(),
      run_id: "",
      session_id: "",
      request: {
        message: message || "",
        session_id: session,
        run_id: run,
        plug: {
          images: images.length > 0 ? [...images] : undefined,
        },
      },
    };

    setLoading(true);
    setMessages((prev) => [...prev, request]);
    setImages([]);
    scroll();

    await fetch(`https://scoopika-run-35.deno.dev/add-client/${userId}`, {
      method: "POST",
      body: JSON.stringify({ token, engines }),
    });

    setStatus("Thinking");
    try {
      await agentInstance.run({
        inputs: {
          message,
          session_id: session,
          run_id: run,
          plug: request.request.plug,
        } as Inputs,
        hooks: {
          onStart: async () => {
            setMessage("");
            setImages([]);
            const messages = await client.store.getSessionRuns(session);
            await setMessages(messages);
            scroll();
          },
          onToken: async (t) => {
            setStatus(undefined);
            await setGoingMessage((prev) => (prev += t));
            scroll();
          },
          onToolCall: (call) => {
            setStatus("Talking with " + call.function.name);
          },
          onToolResult: (res) => {
            setGoingTools((prev) => [...prev, res]);
            setStatus("Thinking");
          },
          onFinish: async () => {
            setStatus(undefined);
            const messages = await client.store.getSessionRuns(session);
            setGoingMessage("");
            setGoingTools([]);
            setMessages(messages);
            scroll();
          },
        },
      });
    } catch {
      toast.error("Sorry. had an error running this time :(", {
        description:
          (request?.request?.plug?.images || []).length !== 0
            ? "Make sure the LLM powering the agent supports vission"
            : "There was a problem in the LLM or on our side refresh and try again",
      });
    } finally {
      setGoingMessage("");
      setLoading(false);
      setStatus(undefined);
    }
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

  const startRecording = async (): Promise<void> => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing audio devices:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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
      <div className="w-full flex flex-col items-center justify-center gap-3 mt-10">
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
      <div className="w-full flex items-center pr-6 pl-6">
        <div className="text-xs opacity-80 text-center w-full mt-2 mb-8 flex justify-center">
          <p className="text-center md:max-w-[80%]">
            This playground <b className="underline">is built using Scoopika</b>
            . Notice that the session is not saved and will reset after a while
          </p>
        </div>
      </div>
      <div className="w-full flex-col flex items-center justify-end gap-4 lg:p-10 lg:pr-14 lg:pl-14">
        {messages.map((message) => {
          if (message.role === "agent") {
            return (
              <AgentMessage
                openTool={setOpenTool}
                content={`${message.response.content}`}
                avatar={agent.avatar}
                toolCalls={message.tools}
              />
            );
          }

          return (
            <UserMessage
              openImage={setOpenImage}
              avatar={userAvatar}
              text={`${message?.request?.message}`}
              images={message?.request?.plug?.images || []}
            />
          );
        })}

        {goingMessage && goingMessage.length > 0 && (
          <AgentMessage
            openTool={setOpenTool}
            content={`${goingMessage}`}
            avatar={agent.avatar}
            toolCalls={goingTools}
          />
        )}

        <div id="bottom-div"></div>
      </div>

      <div className="flex justify-end flex-col md:flex-row md:items-center gap-4 fixed bottom-36 md:bottom-20 right-8 border-black/20 dark:border-white/20">
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
          onPress={() => {
            setSession(crypto.randomUUID());
            setMessages([]);
          }}
        >
          Clear session
        </Button>
        <Button
          size="sm"
          variant="bordered"
          className="font-semibold border-1 backdrop-blur"
          startContent={<RiVoiceprintLine size={16} />}
          endContent={<FaChevronRight />}
        >
          Switch to voice chat
        </Button>
      </div>

      {/** Message bar */}
      <div className="fixed bottom-0 left-0 flex flex-col items-center justify-center w-full p-4 md:pl-80 md:pr-6 pb-20 md:pb-4 min-h-max gap-4">
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
                <div className="w-12 h-12 relative group">
                  <img
                    key={`imagepreview-${index}`}
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
                setMessage(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") run();
              }}
            />
            {/* {!loading && (
              <Button
                size="sm"
                variant="light"
                isIconOnly
                startContent={<FaMicrophone size={14} />}
                onPress={() => {
                  setRecordOpen(true);
                  setIsRecording(true);
                  startRecording();
                }}
              />
            )} */}
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

      <Dialog open={recordOpen} onOpenChange={setRecordOpen}>
        <DialogContent>
          <div className="font-semibold">Record voice</div>
          {isRecording ? (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div>Recording...</div>
              <Button size="sm" color="primary">
                Submit recording
              </Button>
              <Button
                size="sm"
                variant="flat"
                onPress={() => {
                  stopRecording();
                  setRecordOpen(false);
                }}
              >
                Cancel recording
              </Button>
            </div>
          ) : (
            <></>
          )}
        </DialogContent>
      </Dialog>

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
