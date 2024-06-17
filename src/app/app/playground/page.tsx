import Playground from "@/components/main/agents/playground/main";
import generateToken from "@/functions/tokens/generate";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/scripts/plan";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";

export const fetchCache = "force-no-store";

interface Props {
  searchParams: {
    id?: string;
    voice?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const { id } = searchParams;

  const session = (await getServerSession(authOptions)) as Session;
  const pro = isPro(session.user.plan);

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
        userAvatar={session.user.image}
        agent={wantedAgent}
        agents={agents}
        apiKeys={apiKeys}
        pro={pro}
        token={token.token?.token}
        voice={searchParams?.voice === "y"}
      />
    </>
  );
}
