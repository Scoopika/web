import Playground from "@/components/main/agents/playground/main";
import generateToken from "@/functions/tokens/generate";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro, readPlan } from "@/scripts/plan";
import { AgentData } from "@scoopika/types";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Playground"
}

interface Props {
  searchParams: {
    id?: string;
    voice?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const { id } = searchParams;

  const session = (await getServerSession(authOptions)) as Session;
  const plan = readPlan(session.user.plan);

  const token = await generateToken();

  if (!token.success) {
    return (
      <div>{"Can't"} load right now. try again later or contact support</div>
    );
  }

  const apiKeys = (
    await db.apikeys.findMany({
      where: {
        userId: session.user.id,
      },
    })
  ).map((k) => k.name);

  const agents = (
    await db.agent.findMany({
      where: {
        userId: session.user.id,
      },
    })
  ).map((a) => JSON.parse(a.payload)) as AgentData[];

  const wantedAgent = agents.filter((a) => a.id === (id || "NONE"))[0];

  return (
    <>
      <Playground
        userId={session.user.id}
        agent={wantedAgent}
        agents={agents}
        apiKeys={apiKeys}
        token={token.token?.token}
        voice={searchParams?.voice === "y"}
        plan={plan.type}
      />
    </>
  );
}
