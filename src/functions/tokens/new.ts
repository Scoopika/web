"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";

export default async function newToken(
  name: string,
): Promise<
  { success: false } | { success: true; token: { id: string; token: string } }
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
      method: "POST",
      headers: {
        authorization: secret,
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    });

    const data = (await res.json()) as {
      success: boolean;
      id: string;
      token: string;
      error: string;
    };

    if (!data.success) {
      throw new Error(data.error);
    }

    await db.token.create({
      data: {
        id: data.id,
        name: name,
        userId: session.user.id,
        value: data.token.substring(0, 4),
      },
    });

    return {
      success: true,
      token: {
        id: data.id,
        token: data.token,
      },
    };
  } catch {
    return { success: false };
  }
}
