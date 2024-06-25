"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function deleteBox(
  id: string,
): Promise<{ success: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  await db.box.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  await revalidatePath("/app/boxes");

  return { success: true };
}
