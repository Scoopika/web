import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";
import { Suspense } from "react";
import AppHead from "@/components/main/head";
import Loading from "@/components/main/loading";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import Link from "next/link";
import ResourceLink from "@/components/main/resourceLink";
import AgentItem from "@/components/main/agents/item";
import Empty from "@/components/main/empty";

interface Props {
  session: Session;
}

const Agents = async ({ session }: Props) => {
  const agents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const agentsData: AgentData[] = agents.map((a) => JSON.parse(a.payload));

  return (
    <>
      <AppHead
        title="Your Agents"
        description="Personalized virtual AI assistants"
        action={
          <Button
            size="sm"
            color="primary"
            className="font-semibold"
            startContent={<FaPlus />}
            as={Link}
            href="/app/new-agent"
          >
            Create new agent
          </Button>
        }
      />

      <div className="w-24 h-20 bg-foreground/40 dark:bg-foreground/10 blur-2xl absolute top-0 left-0"></div>

      {agentsData.length < 1 && (
        <Empty
          title="Create your first agent"
          description="Agents are AI assistant that can collaborate, use external tools,
          speak, and learn"
          icon={<RiRobot2Fill />}
        >
          <Button
            size="sm"
            variant="flat"
            as={Link}
            href="/app/new-agent"
            className="font-semibold"
          >
            Create first agent
          </Button>
        </Empty>
      )}

      {agentsData.length > 0 && (
        <div className="w-full flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
          {agentsData.map((agent, index) => (
            <AgentItem key={`agent-item-${index}`} agent={agent} />
          ))}
        </div>
      )}

      <div className="mt-3 border-t-1 pt-6">
        <ResourceLink
          name="Learn more about agents"
          link={`https://docs.scoopika.com/agents`}
        />
      </div>
    </>
  );
};

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <Suspense fallback={<Loading />}>
      <Agents session={session} />
    </Suspense>
  );
}
