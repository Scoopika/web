import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import AgentsMainPage from "@/components/app/agents/main";
import { Metadata } from "next";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Agents",
};

interface Props {
  searchParams: {
    new?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const tokens = await db.token.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const agents = await db.agent.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const agentsData = agents.map(
    (agent) => JSON.parse(agent.payload) as AgentData
  );

  return (
    <AgentsMainPage
      tokens={tokens}
      session={session}
      agents={agentsData}
      newAgent={searchParams.new === "y"}
    />
  );
}
