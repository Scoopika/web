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

  const isPro =
    session.user.plan === "none" || !session.user.plan.includes(":::")
      ? false
      : true;
  const existBoxes = await db.box.findMany({
    where: {
      userId: session.user.id,
    },
  });

  if (
    (!isPro && existBoxes.length === 1) ||
    (isPro && existBoxes.length === 4)
  ) {
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
