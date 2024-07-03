"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Widget } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function newWidget({
  name,
  agent,
  store,
  styleType
}: {
  name: string;
  agent: string;
  store?: string;
  styleType?: string
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  if (
    typeof agent !== "string" ||
    typeof name !== "string" ||
    name.length < 3
  ) {
    return { success: false };
  }

  const data: Widget = {
    userId: session.user.id,
    id: `${crypto.randomUUID()}`,
    agentId: agent,
    name,
    store: store || "memory",
    audio: "n",
    vision: "n",
    pdf: "n",
    type: "chat",
    styleType: styleType || "popup",
    theme: "solid",
    welcomeMsg: "Hello, how can I assist you today?",
    radius: "25px",
    primaryColor: "black",
    primaryTextColor: "white",
    bgColor: "white",
    textColor: "black",
    waveColor: "black",
    cssContainer: "",
    cssInput: "",
    allowedSources: "",
  };

  await db.widget.create({ data });

  await revalidatePath("/app/widgets", "page");
  return {success: true};
}
