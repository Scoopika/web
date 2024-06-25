"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createAgent(
  payload: AgentData
): Promise<{ success: false } | { success: true; id: string }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const isPro =
    session.user.plan === "none" || !session.user.plan.includes(":::")
      ? false
      : true;
  const existAgents = await db.agent.findMany({
    where: {
      userId: session.user.id,
    },
  });

  if (
    (!isPro && existAgents.length > 1) ||
    (isPro && existAgents.length === 10)
  ) {
    return { success: false };
  }

  const userId = session?.user.id;
  const id = randomUUID();
  payload.id = id;

  await db.agent.create({
    data: {
      userId,
      payload: JSON.stringify(payload),
      id,
    },
  });

  await revalidatePath("/app/", "layout");
  redirect(`/app/agents/${id}`);
}
