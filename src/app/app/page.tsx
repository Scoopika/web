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
import { FaBook, FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import Greeting from "@/components/main/greeting";
import { TbWorldBolt } from "react-icons/tb";
import { LuExternalLink } from "react-icons/lu";
import Footer from "@/components/footer";

interface Props {
  session: Session;
}

const developerResources: {
  name: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Documentation",
    description:
      "Clear in-depth documentation for how to use Scoopika and integrate it in your application for both server-side and client-side use",
    link: "https://docs.scoopika.com",
    icon: <FaBook size={17} />,
  },
  {
    name: "Web integration",
    description:
      "Learn how to build AI-powered web applications with Scoopika and how to run agents on the client-side with real-time streaming and client-side actions",
    link: "https://docs.scoopika.com/guides/scoopika-for-the-web",
    icon: <TbWorldBolt size={19} />,
  },
  {
    name: "Open-source",
    description:
      "99% of Scoopika is open-sourced. Check the repositories of Scoopika to report issues, help us improve Scoopika, or just check how the code works",
    link: "https://github.com/scoopika",
    icon: <FaGithub size={19} />,
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
        <div className="w-full rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="w-8 h-8 bg-accent/50 border-1 rounded-lg flex items-center justify-center font-semibold text-lg">
              1
            </div>
            <div className="opacity-80">First step</div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Create your first AI agent
          </h3>
          <div className="text-sm opacity-80 mb-8 lg:max-w-[70%]">
            Create your first personalized AI assistant that can see, talk,
            listen, and take actions. Creating an agent, testing it in in the
            playground, and integrating it into your app takes about 5 minutes
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Button
              size="sm"
              color="primary"
              as={Link}
              href="/app/new-agent"
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
              endContent={<FaExternalLinkAlt />}
            >
              Follow 2-minutes guide
            </Button>
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

      <div className="w-full flex items-center overflow-auto gap-4">
        {agentsData.map((agent, index) => (
          <Avatar
            key={`agenticonhome-${index}`}
            className="relative group cursor-pointer"
          >
            <AvatarFallback>{agent.name.substring(0, 1)}</AvatarFallback>
            <AvatarImage
              src={agent.avatar}
              className="border-1 border-black/20 dark:border-white/20 object-cover"
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

      <div className="pt-8 border-t-1 dark:border-accent/60">
        <div className="w-full rounded-2xl pb-5 mb-4">
          <h3 className="text-lg font-semibold mb-2">Integrate in your app!</h3>
          <div className="text-sm opacity-80 mb-8">
            Integrate and use Scoopika agents in your application. open-source,
            type-safe, free, and easy to start!
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Button
              size="sm"
              color="primary"
              as={Link}
              href="https://docs.scoopika.com/quickstart"
              target="_blank"
              className="font-semibold"
              endContent={<FaExternalLinkAlt />}
            >
              Follow 2-minutes guide
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex gap-4">
          {developerResources.map((r, index) => (
            <Link
              key={`developerresourceitem-${index}`}
              href={r.link}
              target="_blank"
              className="p-5 border-1 rounded-2xl bg-accent/20 hover:border-black/20 dark:hover:border-white/20 min-h-max transition-all relative group"
            >
              <div className="w-10 h-10 flex items-center justify-center border-1 rounded-2xl bg-accent/20 mb-5">
                {r.icon}
              </div>
              <div className="h-full flex flex-col">
                <div className="font-semibold mb-1">{r.name}</div>
                <div className="text-sm opacity-80">{r.description}</div>
              </div>
              <LuExternalLink className="absolute top-4 right-4 scale-0 group-hover:scale-100 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      <Footer />
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
