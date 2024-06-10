"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteAgent(
  id: string,
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  await db.agent.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  await revalidatePath("/app", "layout");
  return redirect("/app/agents");
}
