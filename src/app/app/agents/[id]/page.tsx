import AgentHead from "@/components/main/agents/page/head";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro, readPlanType } from "@/scripts/plan";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams?: {
    new?: string;
  };
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
    />
  );
}
