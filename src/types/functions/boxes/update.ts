"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { RawBoxData } from "@/types/rawBox";

export default async function updateBoxData(
  id: string,
  payload: RawBoxData
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  try {
    await db.box.update({
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
