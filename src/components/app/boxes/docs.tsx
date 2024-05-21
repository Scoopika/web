"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BoxData } from "@scoopika/types";
import { MdContentCopy, MdInfo } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darkTheme from "@/lib/codeTheme";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  box: BoxData;
}

function getEngines(box: BoxData): string {
  const used: string[] = [];

  for (const agent of box.agents) {
    const prompt = agent.prompts[0];
    if (!prompt) {
      continue;
    }

    if (used.indexOf(prompt.llm_client) !== -1) {
      continue;
    }

    used.push(prompt.llm_client);
  }

  const hosts = used.map((u) => `${u}: "YOUR_API_KEY"`);

  return `engines: {
        ${hosts}
    }`;
}

const Code = ({ code, language }: { code: string; language: string }) => {
  const copy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied code!");
  };

  return (
    <div className="w-full rounded-xl border-1 bg-foreground dark:bg-accent/10 relative group">
      <Button
        size="sm"
        isIconOnly
        variant="flat"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all backdrop-blur"
        onPress={() => copy()}
      >
        <MdContentCopy />
      </Button>
      <SyntaxHighlighter language={language} style={{ ...darkTheme } as any}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const serverCode = (
  id: string,
  engines: string,
) => `import { Scoopika, Agent } from "@scoopika/scoopika";

const scoopika = new Scoopika({
    token: "YOUR_SCOOPIKA_TOKEN",
    ${engines}
});

const agent = new Agent(
    "${id}",
    scoopika
);

(async () => {
    const response = await agent.run({
        inputs: {
            message: "Hello!"
        },
        hooks: {
            onToken: (t) => console.log(t)
        }
    });

    console.log(response);
})();
`;

const apiCode = (id: string, engines: string) => `// Example with Express

import express from "express";
import { Scoopika, Container } from "@scoopika/scoopika";

const scoopika = new Scoopika({
    token: "YOUR_SCOOPIKA_TOKEN",
    ${engines}
});

const container = new Container({
    scoopika,
    agents: ["${id}"]
});

const app = express();
app.use(express.json()); // Required middleware

// Add route to handle all Scoopika requests
app.post("/scoopika", (req, res) => {
    container.handleRequest({
        request: req.body,
        stream: (s) => res.write(s),
        end: () => res.end()
    });
})

app.listen(4149, () => {
    console.log("Listening on port 4149");
})
`;

const clientCode = (
  id: string,
) => `// Make sure you have an API running with Scoopika. check API tab ☝

import { Client, Agent } from "@scoopika/client";

const client = new Client("http://127.0.0.1:4149/scoopika"); // replace with your API Url
const agent = new Agent(
    "${id}",
    client
);

(async () => {
    const response = await agent.run({
        inputs: {
            message: "Hello!"
        },
        hooks: { // real-time streaming
            onToken: (t) => console.log(t)
        }
    });

    console.log(response);
})();
`;

export default function BoxDocs({ children, box }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen overflow-auto flex flex-col items-center min-w-[70%]">
        <div className="w-full">Use in your app</div>

        {(box.agents?.length || 0) === 0 && (
          <div className="w-full p-2 border-1 rounded-lg bg-accent/40 text-sm flex items-center gap-2">
            <MdInfo />
            This box {"doesn't"} have any agents!
          </div>
        )}

        <Tabs className="w-full" variant="underlined">
          <Tab
            key="server"
            title="Server-side"
            className="w-full flex flex-col gap-3"
          >
            <div className="flex items-center text-sm gap-1 mb-2">
              Refer to{" "}
              <Link
                href="https://docs.scoopika.com/quickstart"
                target="_blank"
                className="underline"
              >
                Quickstart
              </Link>
            </div>
            <Code language="bash" code="npm install @scoopika/scoopika" />
            <Code
              language="typescript"
              code={serverCode(box.id, getEngines(box))}
            />
          </Tab>

          <Tab
            key="api"
            title="API usage"
            className="w-full flex flex-col gap-3"
          >
            <div className="flex items-center text-sm gap-1 mb-2">
              Refer to{" "}
              <Link
                href="https://docs.scoopika.com/guides/scoopika-for-the-web"
                target="_blank"
                className="underline"
              >
                Web setup docs
              </Link>
            </div>
            <Code language="bash" code="npm install @scoopika/scoopika" />
            <Code
              language="typescript"
              code={apiCode(box.id, getEngines(box))}
            />
          </Tab>

          <Tab
            key="client"
            title="Client-side"
            className="w-full flex flex-col gap-3"
          >
            <div className="flex items-center text-sm gap-1 mb-2">
              Refer to{" "}
              <Link
                href="https://docs.scoopika.com/packages/ts/client"
                target="_blank"
                className="underline"
              >
                Client-side docs
              </Link>
            </div>
            <Code language="bash" code="npm install @scoopika/client" />
            <Code language="typescript" code={clientCode(box.id)} />
          </Tab>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
