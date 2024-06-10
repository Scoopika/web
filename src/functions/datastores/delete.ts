"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function deleteDataStore(
  id: string,
): Promise<{success: boolean}> {
  if (!id) {
    return { success: false };
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const secret = generateSecret();
  const source = process.env.SOURCE;

  const res = await fetch(`${source}/private/deldb`, {
    method: "DELETE",
    headers: {
      authorization: secret
    },
    body: JSON.stringify({
      userId: session.user.id,
      id
    })
  });

  const data = await res.json();

  if (!data || !data.success) {
    return {success: false};
  }

  await db.historystore.delete({
    where: {
      userId: session.user.id,
      id,
    },
  });

  await revalidatePath("/app/data-stores");

  return { success: true };
}
