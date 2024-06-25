"use server";

import { authOptions } from "@/lib/auth";
import { AgentData } from "@scoopika/types";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isPro } from "@/scripts/plan";

export default async function updateAgentData(
  id: string,
  payload: AgentData,
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const pro = isPro(session.user.plan);
  const apiTools = (payload.in_tools || []).filter(t => t.type === "api");

  if (apiTools.length > 3 && !pro) {
    return {
      success: false
    }
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

    await revalidatePath(`/app/agents/${id}`);
    await revalidatePath(`/playground`, "layout");
    return { success: true };
  } catch {
    return { success: false };
  }
}
