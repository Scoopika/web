import AgentHead from "@/components/main/agents/page/head";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro, readPlanType } from "@/scripts/plan";
import { AgentData } from "@scoopika/types";
import { Metadata, ResolvingMetadata } from "next";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams?: {
    new?: string;
    tab?: string;
  };
}

export const maxDuration = 60;

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata> {
  const session = (await getServerSession(authOptions)) as Session;

  const agent = await db.agent.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!agent) {
    return {};
  }

  const agentData = JSON.parse(agent.payload) as AgentData;

  return {
    title: `${agentData.name}: ${searchParams?.tab ? searchParams.tab : "AI Agent"}`
  }
}

export default async function Page({ params, searchParams }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const plan = session.user.plan;
  const pro = isPro(plan);
  const isNew = searchParams?.new === "y";
  const planType = readPlanType(plan);

  const apiKeys = (
    await db.apikeys.findMany({
      where: {
        userId: session.user.id,
      },
    })
  ).map((k) => k.name);

  const agent = await db.agent.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!agent) {
    return redirect("/app/agents");
  }

  const agentData: AgentData = JSON.parse(agent.payload);

  return (
    <AgentHead
      agent={agentData}
      pro={pro}
      apiKeys={apiKeys}
      isNew={isNew}
      planType={planType}
      tab={searchParams?.tab}
    />
  );
}
