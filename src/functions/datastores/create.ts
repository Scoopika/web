"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/scripts/plan";
import generateSecret from "@/scripts/secret";
import { DataStore } from "@/types/dataStore";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function sleep(ms?: number) {
  if (typeof ms !== "number") {
    ms = 0;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function createDatastore(
  name: string,
): Promise<{ success: false; error?: string } | { success: true }> {
  const session = await getServerSession(authOptions);

  if (!session || !name) {
    return { success: false };
  }

  const pro = isPro(session.user.plan);
  const secret = generateSecret();
  const source = process.env.SOURCE;
  const id = crypto.randomUUID();

  if (!pro) {
    return { success: false };
  }

  const res = await fetch(`${source}/private/newdb`, {
    method: "POST",
    headers: {
      authorization: secret,
    },
    body: JSON.stringify({
      userId: session.user.id,
      id,
    }),
  });

  const data = await res.json();

  if (!data || !data.success) {
    console.error(data.error || "Error with newdb");
    return { success: false };
  }

  await db.historystore.create({
    data: {
      id,
      name,
      userId: session.user.id,
    },
  });

  await revalidatePath("/app/data-stores");

  return {
    success: true,
  };
}
