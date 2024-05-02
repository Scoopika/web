"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import { getServerSession } from "next-auth";

export default async function listAgents(): Promise<
  { success: false } | { success: true; agents: AgentData[] }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
    };
  }

  const agents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return {
    success: true,
    agents: agents.map((agent) => JSON.parse(agent.payload) as AgentData),
  };
}
