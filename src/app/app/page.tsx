import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";
import { Suspense } from "react";
import AppHead from "@/components/main/head";
import Loading from "@/components/main/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FaVideo, FaBook } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import Greeting from "@/components/main/greeting";
import ResourceLink from "@/components/main/resourceLink";

interface Props {
  session: Session;
}

const resources: { name: string; link: string }[] = [
  {
    name: "Agents",
    link: "agents",
  },
  {
    name: "Multi-agent boxes",
    link: "multi-agent-boxes",
  },
  {
    name: "Chat stores (long-term memory)",
    link: "history-stores",
  },
  {
    name: "Tools",
    link: "tools",
  },
  {
    name: "Web integration",
    link: "guides/scoopika-for-the-web",
  },
];

const Home = async ({ session }: Props) => {
  const agents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const agentsData: AgentData[] = agents.map((a) => JSON.parse(a.payload));

  if (agentsData.length < 1) {
    return (
      <>
        <AppHead
          title={`Welcome, ${session.user.name}!`}
          description="Let's get you started in few moments"
        />
        <div className="w-24 h-20 bg-foreground/30 dark:bg-foreground/10 blur-2xl absolute top-0 left-0"></div>
        <div className="w-full bg-accent border-1 dark:border-0 dark:bg-accent/20 rounded-2xl p-5">
          <h3 className="text-xl font-semibold mb-2">
            Create your first agent
          </h3>
          <div className="text-sm opacity-80 mb-8">
            Create and run your first AI agent in a minute
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              color="primary"
              as={Link}
              href="/new-agent"
              className="font-semibold"
              endContent={<FaChevronRight />}
            >
              Create new agent
            </Button>
            <Button
              size="sm"
              variant="flat"
              as={Link}
              href="https://docs.scoopika.com/quickstart"
              target="_blank"
              className="font-semibold"
              startContent={<FaVideo />}
              endContent={<FaExternalLinkAlt />}
            >
              Watch 2-minutes video
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <div className="flex flex-col gap-2">
            {resources.map((r, index) => (
              <ResourceLink
                key={`resource-link-${index}`}
                name={r.name}
                link={`https://docs.scoopika.com/${r.link}`}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHead
        title={<Greeting text={session.user.name} />}
        description="Welcome back to your AI portal"
      />
      <div className="w-24 h-20 bg-foreground/30 dark:bg-foreground/10 blur-2xl absolute top-0 left-0"></div>

      <div className="w-full flex items-center overflow-auto gap-4">
        {agentsData.map((agent, index) => (
          <Avatar
            key={`agenticonhome-${index}`}
            className="relative group cursor-pointer"
          >
            <AvatarFallback>{agent.name.substring(0, 1)}</AvatarFallback>
            <AvatarImage
              src={agent.avatar}
              className="border-1 border-black/20 dark:border-white/20"
            ></AvatarImage>
            <Link
              href={`/app/agents/${agent.id}`}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-background/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <FaChevronRight />
            </Link>
          </Avatar>
        ))}
      </div>

      <div className="w-full bg-accent border-1 dark:border-0 dark:bg-accent/20 rounded-2xl p-5">
        <h3 className="text-xl font-semibold mb-2">Integrate in your app!</h3>
        <div className="text-sm opacity-80 mb-8">
          Integrate and use Scoopika in your application. open-source,
          type-safe, and free
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button
            size="sm"
            color="primary"
            as={Link}
            href="https://docs.scoopika.com/quickstart"
            target="_blank"
            className="font-semibold"
            startContent={<FaVideo />}
            endContent={<FaExternalLinkAlt />}
          >
            Watch 2-minutes video
          </Button>
          <Button
            size="sm"
            variant="flat"
            as={Link}
            href="https://docs.scoopika.com"
            target="_blank"
            className="font-semibold"
            startContent={<FaBook />}
            endContent={<FaExternalLinkAlt />}
          >
            Check documentation
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">Resources</h3>
        <div className="flex flex-col gap-2">
          {resources.map((r, index) => (
            <ResourceLink
              key={`resource-link-${index}`}
              name={r.name}
              link={`https://docs.scoopika.com/${r.link}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <Suspense fallback={<Loading />}>
      <Home session={session} />
    </Suspense>
  );
}
