"use server";

import { authOptions } from "@/lib/auth";
import { AgentData } from "@scoopika/types";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export default async function updateAgentData(
  id: string,
  payload: AgentData
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  try {
    await db.agent.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        payload: JSON.stringify(payload),
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}
