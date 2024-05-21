"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function deleteAgent(
  id: string,
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  try {
    await db.agent.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}
