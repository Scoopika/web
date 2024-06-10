import { AgentData } from "@scoopika/types";
import ResourceLink from "../../resourceLink";
import Code from "../../code";

interface Props {
  agent: AgentData;
}

function getEngines(agent: AgentData): string {
  const prompt = agent.prompts[0];

  if (!prompt) {
    return "{}";
  }

  const host = prompt.llm_client;
  return `engines: {
        ${host}: "YOUR_API_KEY"
    }`;
}

const setupCode = (
  engines: string
) => `import { Scoopika, Agent } from "@scoopika/scoopika";

const scoopika = new Scoopika({
    ${engines}
});`;

const runCode = (id: string) => `const agent = new Agent(
    "${id}",
    scoopika
);

(async () => {
    const response = await agent.run({
        inputs: {
          message: "Hello!"
        },
        hooks: { // streaming
          onToken: (t) => console.log(t)
        }
    });

    // Run with voice
    const responseWithVoice = await agent.run({
      options: { voice: true },
      inputs: { message: "Hello!" },
      hooks: {
        onAudio: (a) => {
          console.log(a.read); // audio chunk url
        }
      }
    })
})();`;

const clientCode = (id: string) => `import { Client, Agent, AudioPlayer } from "@scoopika/client"

const client = new Client("ENDPOINT_URL"); // replace with your endpoint url
const agent = new Agent("${id}", client);

(async () => {
  const response = await agent.run({
      inputs: {
        message: "Hello!"
      },
      hooks: { // streaming works too ;)
        onToken: (t) => console.log(t)
      }
  });

  // Run with voice (using the audio player to play the chunks in real-time)
  const player = new AudioPlayer();

  const responseWithVoice = await agent.run({
    options: { voice: true },
    inputs: { message: "Hello!" },
    hooks: {
      onAudio: (a) => player.queue(a)
    }
  })
})();
`

export default function AgentCode({ agent }: Props) {
  return (
    <>
      <p className="mt-3 text-sm opacity-80 flex items-center gap-2">
        Integrate {agent.name} into your application.{" "}
        <ResourceLink
          name="Check Quickstart"
          link="https://docs.scoopika.com/quickstart"
        />
      </p>

      <div className="text-sm mt-6 mb-3">
        1. Set the <b>SCOOPIKA_TOKEN</b> environment variable. click on your
        profile pic in top-right corner and generate a new token if you{" "}
        {"haven't"} yet
      </div>
      <Code code="SCOOPIKA_TOKEN=<TOKEN_VALUE>" language="text" />

      <div className="text-sm mt-6 mb-3 flex flex-col gap-2">
        2. Install Scoopika server-side package{" "}
        <ResourceLink
          name="Check Docs"
          link="https://docs.scoopika.com/packages/ts/scoopika"
        />
      </div>
      <Code code="npm i @scoopika/scoopika" language="bash" />

      <div className="text-sm mt-6 mb-3 flex flex-col gap-2">
        3. Import and setup. if you have an API key for{" "}
        {agent.prompts[0].llm_client} added to your account, then you {"don't"}{" "}
        need to add it to the engines. when keys are added from your code{" "}
        {"they're"} never shared with us. you can add an API key to the platform
        from the top-right corner.
        <ResourceLink
          name="Learn more"
          link="https://docs.scoopika.com/guides/scoopika-on-your-server"
        />
      </div>
      <Code code={setupCode(getEngines(agent))} language="typescript" />

      <div className="text-sm mt-6 mb-3">4. Setup and run agent</div>
      <Code code={runCode(agent.id)} language="typescript" />

      <div className="text-sm mt-6 mb-3 flex flex-col gap-2">
        5. Learn more about how to use agents, and setup a Scoopika endpoint for web integration and to run agents on client-side:
        <ResourceLink
          name="Check guides"
          link="https://docs.scoopika.com/guides"
        />
      </div>

      <div className="text-sm mt-6 mb-3 flex flex-col gap-2">
        6. After setting up a Scoopika endpoint (see guides). you can run the agent on the client-side
        <Code language="bash" code="npm i @scoopika/client" />
        <Code language="typescript" code={clientCode(agent.id)} />
        <ResourceLink
          name="Learn more about using agents"
          link="https://docs.scoopika.com/agents"
        />
        <ResourceLink
          name="Need help? contact us"
          link="https://docs.scoopika.com/help/contact-us"
        />
      </div>
    </>
  );
}
