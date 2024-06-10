"use server";

import { authOptions } from "@/lib/auth";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";

export default async function encrypt(value: string) {
  const session = await getServerSession(authOptions);

  if (!session) return false;

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

  return encrypted;
}
