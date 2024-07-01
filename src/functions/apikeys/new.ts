"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function newApiKey(
  name: string,
  value: string,
): Promise<{ success: false } | { success: true; id: string }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const secret = generateSecret();
  const source = process.env.SOURCE;

  if (!source) {
    throw new Error("Add the SOURCE variable to your .env");
  }

  const res = await fetch(source + "/private/encrypt", {
    method: "POST",
    headers: {
      authorization: secret,
    },
    body: JSON.stringify({
      id: session.user.id,
      data: value,
    }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error || "Error encrypting API key");
  }

  const encrypted = data.data;

  if (!encrypted || typeof encrypted !== "string") {
    throw new Error("Invalid data response from SOURCE");
  }

  const id = crypto.randomUUID();

  await db.apikeys.create({
    data: {
      id,
      name,
      value: encrypted,
      userId: session.user.id,
    },
  });

  await revalidatePath("/app", "layout");

  return { success: true, id };
}
