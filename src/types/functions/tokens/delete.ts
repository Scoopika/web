"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";

export default async function deleteTokenForever(id: string): Promise<
    {success: boolean}
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const secret = generateSecret();
  const source = process.env["SOURCE"];

  if (!source) {
    throw new Error("Source not found in env");
  }

  try {
    const res = await fetch(`${source}/private/token`, {
      method: "DELETE",
      headers: {
        authorization: secret,
      },
      body: JSON.stringify({
        id,
        userId: session.user.id,
      }),
    });

    const data = await res.json();
    if (!data || !data.success) {
        return {success: false};
    }

    await db.token.delete({
        where: {
            id,
            userId: session.user.id
        }
    })

    return {success: true}
  } catch {
    return {success: false}
  }
}
