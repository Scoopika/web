"use client";

import { AgentData } from "@scoopika/types";
import SettingsRow from "../../settingsRow";
import { Button } from "@nextui-org/react";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import tryRequest from "@/scripts/tryRequest";
import updateAgentData from "@/functions/agents/update";
import ResourceLink from "../../resourceLink";

interface Props {
  agent: AgentData;
  pro: boolean;
}

const code = (id: string) => `// Server-side
await agent.run({
  options: {speak: true},
  inputs: {message: "Hello"}
  hooks: {
    onAudio: (a) => {
      console.log(a.read); // audio chunk url
    }
  }
});

// Client-side
const player = new AudioPlayer(); // comes from scoopika client library
await agent.run({
  options: {speak: true},
  inputs: {message: "Hello"}
  hooks: {
    onAudio: (a) => player.queue(a) // will play chunks in the browser
  }
})
`;

const voices = [
  { id: "aura-orpheus-en", name: "Orpheus", type: "American male" },
  { id: "aura-luna-en", name: "Luna", type: "American female" },
];

export default function AgentVoice({ agent, pro }: Props) {
  const [data, setData] = useState<AgentData>(agent);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setData(agent);
  }, [agent]);

  const save = async () => {
    if (loading) return;

    setLoading(true);
    tryRequest<Boolean>({
      loading: "Saving changes...",
      success: "Saved changes!",
      error: "Can't save changes",
      func: async () => {
        const res = await updateAgentData(agent.id, data);
        if (!res || !res.success) {
          throw new Error("Try again later or contact support!");
        }

        return res.success;
      },
      end: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <div className="text-sm opacity-80 mt-3">
        Customize {agent.name}
        {"'s"} voice
      </div>

      <div className="mt-4 flex items-center gap-4">
        <ResourceLink
          name="Check quick guide"
          link="https://docs.scoopika.com/guides/agents-voice"
        />
      </div>

      <div className="w-[15%] border-t-4 rounded-full mt-4"></div>

      <SettingsRow
        title="Change voice"
        description="Change the voice that this agent will use when speaking"
      >
        <div className="flex flex-wrap gap-4">
          {voices.map((v, index) => (
            <Button
              key={`voiceselect-${index}`}
              className="font-semibold"
              size="sm"
              variant={data.voice === v.id ? "solid" : "bordered"}
              color="default"
              onPress={() => setData(prev => ({...prev, voice: v.id}))}
              startContent={data.voice === v.id && <FaCheck />}
            >
              {v.name}: {v.type}
            </Button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow title="About this feature">
        <div className="text-xs opacity-80 flex flex-col gap-2">
          You can give your agent a voice that it will use to speak. you can
          use the agent audio in both server-side and client-side with real-time
          streaming. first response is received in ~600ms.
          <ResourceLink
            name="Use in your app"
            link="https://docs.scoopika.com/agents/speak"
          />
          <ResourceLink
            name="Need help? contact us"
            link="https://docs.scoopika.com/help/contact-us"
          />
        </div>
      </SettingsRow>
      <div className="w-full flex items-center justify-end p-4">
        <Button
          size="sm"
          color="primary"
          className="font-semibold w-full lg:max-w-max"
          endContent={<FaChevronRight />}
          onPress={() => save()}
          isLoading={loading}
        >
          Save changes
        </Button>
      </div>
    </>
  );
}
