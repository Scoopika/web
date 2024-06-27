"use server";

import { authOptions } from "@/lib/auth";
import generateSecret from "@/scripts/secret";
import { getServerSession } from "next-auth";

export default async function getVoiceUsage(): Promise<
  | {
      success: false;
    }
  | {
      success: true;
      value: number;
    }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const source = process.env.SOURCE;

  if (typeof source !== "string") {
    throw new Error("Add the SOURCE environment variable");
  }

  const secret = generateSecret();
  const fetchData = async (name: string) => {
    const res = await fetch(
      `${source}/private/usage/${session.user.id}/${name}`,
      {
        headers: {
          authorization: secret,
        },
      }
    );

    const data = await res.json();
    return data as { success: true; value: number };
  };

  const data = await fetchData("speech");

  return data;
}
