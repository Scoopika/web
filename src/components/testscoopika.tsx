"use client";
import { useEffect } from "react";
import { Agent, Client } from "@scoopika/client";

const client = new Client("/api/scoopika");
const agent = new Agent("7c47b7f1-b632-449e-8247-f55962415f0a", client);

export default function TestScoopika() {
  const runAgent = async () => {
    const response = await agent.run({
      inputs: {
        message: "Hello!",
      },
      hooks: {
        onToken: (t) => console.log(t),
      },
    });

    console.log(response);
  };

  useEffect(() => {
    runAgent();
  }, []);

  return <></>;
}
