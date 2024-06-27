"use client";

import { AgentData, RawEngines } from "@scoopika/types";
import { Agent, Client } from "@scoopika/client";
import { TiMicrophone } from "react-icons/ti";
import { toast } from "sonner";
import { BsFillSendFill } from "react-icons/bs";
import { Tooltip, Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaChevronLeft, FaPause, FaPlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useVoiceChatState } from "@scoopika/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiRobot2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface Props {
  userId: string;
  agent: AgentData;
  engines: RawEngines;
  token: string;
}

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

export default function VoiceChat({ userId, agent, engines, token }: Props) {
  const llmClient = Object.keys(engines)[0];
  const llmClientKey: string | undefined =
    typeof llmClient === "string" ? (engines as any)[llmClient] : undefined;
  const engineReq = llmClientKey
    ? `${llmClient}--KEY--${llmClientKey}`
    : "NO-KEY";
  const { client, agentInstance } = getAgent(
    userId,
    token,
    engineReq,
    agent.id
  );
  const [back, setBack] = useState<boolean>(false);
  const { theme } = useTheme();
  const {
    changeSession,
    messages,
    loading,
    agentVoicePlayer,
    generating,
    newRequest,
    voiceRecorder,
    recorderState,
    recognizedText,
    supportRecognition,
    working,
    pauseAgentVoice,
    voicePlaying,
    resumeAgentVoice,
    agentVoicePaused,
  } = useVoiceChatState(client, agentInstance, {
    agent_name: agent.name,
    agent_voice: {
      canvas: "wave-canvas",
      audio: "agent-voice-player",
      wave_color: theme === "light" ? "#000" : "#fff",
    },
  });

  const send = async () => {
    if (loading || generating) return;

    if (!voiceRecorder) {
      return toast.error("Can't initialize voice recorder :(");
    }

    await fetch(`https://scoopika-run-35.deno.dev/add-client/${userId}`, {
      method: "POST",
      body: JSON.stringify({ token, engines }),
    });
    await fetch(`https://scoopika-run-35.deno.dev/add-agent/${agent.id}`, {
      method: "POST",
      body: JSON.stringify({ agent }),
    });

    try {
      await newRequest();
    } catch {
      toast.error("Faced unexpected error. please try again later!");
    }
  };

  const toggleRecorder = () => {
    if (!voiceRecorder) return;

    if (recorderState === "recording") {
      return voiceRecorder.pause();
    }

    if (recorderState === "stopped") {
      if (agentVoicePlayer) agentVoicePlayer.pause();
      voiceRecorder.start();
    }

    if (recorderState === "paused") {
      if (agentVoicePlayer) agentVoicePlayer.pause();
      voiceRecorder.resume();
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        return send();
      }

      if (e.code === "Space") {
        e.preventDefault();
        return toggleRecorder();
      }

      if (e.key === "r" && e.ctrlKey) {
        e.preventDefault();
        if (!voiceRecorder) return;
        if (recorderState === "paused") {
          voiceRecorder.resume();
          return;
        }

        if (recorderState === "stopped") {
          voiceRecorder.start();
          return;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DropdownMenu open={back} onOpenChange={setBack}>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="flat"
            className="font-semibold max-w-max"
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

      <div className="fixed top-24 lg:top-4 right-4 flex items-center gap-4">
        {voicePlaying && !agentVoicePaused && (
          <Button
            size="sm"
            variant="flat"
            onPress={() => pauseAgentVoice()}
            startContent={<FaPause />}
          >
            Pause agent
          </Button>
        )}
        {voicePlaying && agentVoicePaused && (
          <Button
            size="sm"
            variant="flat"
            onPress={() => resumeAgentVoice()}
            startContent={<FaPlay />}
          >
            Resume agent
          </Button>
        )}
      </div>

      <div className="w-full p-16 flex flex-col items-center justify-center">
        <canvas id="wave-canvas" />
        <audio id="agent-voice-player" />
        {messages.length < 1 && (!recognizedText || recognizedText.length < 1) && (
          <div className="text-sm mb-2 text-center">
            Start talking by pressing the mic button
          </div>
        )}
        <div className="text-xs opacity-80 text-center">
          {supportRecognition === false
            ? "Your browser doesn't support voice recognition. you should expect extra latency in responses"
            : recognizedText}
        </div>
      </div>
      <div className="fixed w-full bottom-0 left-0 lg:pl-64 z-40 pb-5 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center pl-6 pr-6">
          <div className="w-full"></div>
          <div className="p-2 pl-4 pr-4 bg-black/20 dark:bg-accent/30 rounded-2xl flex items-center justify-center gap-4 relative backdrop-blur">
            <Tooltip content="Wipe memory" size="sm">
              <Button
                isIconOnly
                variant="flat"
                onPress={() => {
                  changeSession();
                  pauseAgentVoice();
                }}
                startContent={<MdDelete size={16} />}
              />
            </Tooltip>
            <Tooltip content="Cancel recording" size="sm">
              <Button
                isIconOnly
                variant="flat"
                onPress={() => {
                  if (voiceRecorder) voiceRecorder.stop();
                }}
                startContent={<IoClose size={16} />}
                isDisabled={recorderState === "stopped" || working}
              />
            </Tooltip>
            {recorderState === "stopped" && (
              <Tooltip content="Press and start talking" size="sm">
                <Button
                  isIconOnly
                  variant="flat"
                  size="lg"
                  className="bg-red-500/30 dark:bg-red-500/10 text-red-500 hover:bg-red-500/40 dark:hover:bg-red-500/20"
                  onPress={() => toggleRecorder()}
                  startContent={!working && <TiMicrophone size={20} />}
                  isLoading={working}
                />
              </Tooltip>
            )}
            {recorderState === "recording" && (
              <>
                <Tooltip size="sm" content="Pause recording">
                  <Button
                    isIconOnly
                    variant="flat"
                    size="lg"
                    onPress={() => {
                      if (voiceRecorder) voiceRecorder.pause();
                    }}
                    isLoading={working}
                    startContent={!working && <FaPause size={16} />}
                  />
                </Tooltip>
              </>
            )}

            {recorderState === "paused" && (
              <>
                <Button
                  isIconOnly
                  variant="flat"
                  size="lg"
                  onPress={() => {
                    if (voiceRecorder) voiceRecorder.resume();
                  }}
                  startContent={<FaPlay size={16} />}
                />
              </>
            )}

            <Tooltip content="Submit" size="sm">
              <Button
                isIconOnly
                variant="flat"
                onPress={() => send()}
                startContent={<BsFillSendFill size={14} />}
                isDisabled={
                  recorderState === "stopped" || working
                }
              />
            </Tooltip>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </>
  );
}
