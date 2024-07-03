import AppHead from "@/components/main/head";
import UpgradePlan from "@/components/main/upgrade";
import { authOptions } from "@/lib/auth";
import { readPlanType } from "@/scripts/plan";
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import NewWidget from "@/components/main/widgets/new";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";

export const metadata: Metadata = {
  title: "AI Widgets",
  description:
    "Ready-to-use no-code widgets you can embed in your website or no-code builder and enable users to interact with your AI agents via text, audio, and images",
};

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const plan = readPlanType(session.user.plan);

  const widgets = await db.widget.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const agents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const agentsData = agents.map(agent => JSON.parse(agent.payload)) as AgentData[];

  if (plan !== "free") {
    return (
      <>
        <UpgradePlan description="Upgrade your plan to create ready-to-use widgets and embed them in your website or no-code builder in seconds so users can interact with your AI agents via text, audio, and images from your app" />
      </>
    );
  }

  return (
    <>
      <AppHead
        title="Widgets"
        description="Ready-to-use AI widgets for your app"
        action={<NewWidget agents={agentsData} />}
      />
      {widgets.map(w => (
        <div key={`widget-${w.id}`}>
          {w.name}
        </div>
      ))}
    </>
  );
}
