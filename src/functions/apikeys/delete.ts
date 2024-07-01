"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";

export default async function deleteApiKey(
  id: string,
): Promise<{ success: boolean }> {
  if (!id) {
    throw new Error("API Key ID is required to be deleted");
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  await db.apikeys.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  return { success: true };
}
