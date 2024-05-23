import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import AppLayout from "@/components/app/appLayout";
import AgentsMainPage from "@/components/app/agents/main";
import { Metadata } from "next";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Agents"
}

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const agents = await db.agent.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const agentsData = agents.map(
    (agent) => JSON.parse(agent.payload) as AgentData,
  );

  return (
    <AppLayout session={session} title="Agents" sidebarActive="Agents">
      <AgentsMainPage session={session} agents={agentsData} />
    </AppLayout>
  );
}
