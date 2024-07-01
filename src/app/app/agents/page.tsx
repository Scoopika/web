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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agents"
}

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
            variant="bordered"
            startContent={<FaPlus />}
            as={Link}
            href="/app/new-agent"
          >
            Create new agent
          </Button>
        }
      />

      {agentsData.length < 1 && (
        <Empty
          title="Create your first agent"
          description="Agents are AI assistant see, talk, listen, learn, perform actions, and collaborate together"
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
        <div className="w-full flex flex-col">
          <div className="w-full p-3 pl-6 pr-6 rounded-lg bg-accent dark:bg-accent/30 text-sm flex items-center">
            <div className="w-full">Agent</div>
            <div className="w-full hidden lg:block">Links</div>
          </div>
          <div className="w-full flex flex-col">
            {agentsData.map((agent, index) => (
              <AgentItem key={`agent-item-${index}`} agent={agent} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-6">
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
