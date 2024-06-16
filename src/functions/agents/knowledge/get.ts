"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function getKnowledge(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) return { success: false };

  const knowledge = await db.knowledge.findMany({
    where: {
      userId: session.user.id,
      agentId: id,
    },
  });

  return { success: true, knowledge };
}
