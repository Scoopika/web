"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function deleteDataStore(id: string, deploymentId: string) {
  if (!id || !deploymentId) {
    return { success: false };
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const res = await fetch(
    `${process.env.DENO_URL}/deployments/${deploymentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.DENO_TOKEN}`
      }
    }
  );

  if (res.status !== 200) {
    return { sucecss: false };
  }

  await db.datastore.delete({
    where: {
      userId: session.user.id,
      id,
    },
  });

  return { success: true };
}
