"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function listKeys(): Promise<
  { success: false } | { success: true; keys: { id: string; name: string }[] }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const keys = await db.apikeys.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return {
    success: true,
    keys: keys.map((t) => ({ id: t.id, name: t.name })),
  };
}
