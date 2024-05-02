"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RawBoxData } from "@/types/rawBox";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";

export default async function createBox(
  payload: RawBoxData
): Promise<{ success: false } | { success: true; id: string }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const userId = session?.user.id;
  const id = randomUUID();
  payload.id = id;

  try {
    await db.box.create({
      data: {
        userId,
        name: payload.name,
        payload: JSON.stringify(payload),
        id,
      },
    });

    return { success: true, id };
  } catch {
    return { success: false };
  }
}
