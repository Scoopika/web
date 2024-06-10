import NewAgent from "@/components/main/agents/new";
import AppHead from "@/components/main/head";
import UpgradePlan from "@/components/main/upgrade";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/scripts/plan";
import { Button } from "@nextui-org/react";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default async function NewAgentPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const agents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const plan = session.user.plan;
  const pro = isPro(plan);

  if (!pro && agents.length > 1) {
    return (
      <UpgradePlan back="/app/agents" description="Create up to 10 AI agents" />
    );
  }

  return (
    <>
      <AppHead
        title="New Agent"
        description="Create a new personalized AI agent"
        back={
          <Button
            isIconOnly
            startContent={<FaChevronLeft />}
            variant="flat"
            size="sm"
            as={Link}
            href="/app/agents"
          ></Button>
        }
      />
      <NewAgent />
    </>
  );
}
