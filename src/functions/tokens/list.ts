"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function listTokens(): Promise<
  { success: false } | { success: true; tokens: { id: string; name: string }[] }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  try {
    const tokens = await db.token.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return {
      success: true,
      tokens: tokens.map((t) => ({ id: t.id, name: t.name })),
    };
  } catch (err) {
    return { success: false };
  }
}
