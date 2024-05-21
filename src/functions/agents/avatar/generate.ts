"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import OpenAI from "openai";

export default async function generateAvatar(
  agentName: string,
  agentDescription: string,
): Promise<{ success: false } | { success: true; data: string | undefined }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const prompt = `An avatar picture of ${agentName}, an AI agent for '${agentDescription}'. in neon cartoon theme`;

  const client = new OpenAI({
    apiKey: process.env.TOGETHER_API_KEY,
    baseURL: "https://api.together.xyz/v1",
  });

  try {
    const generation = await client.images.generate({
      model: "stabilityai/stable-diffusion-xl-base-1.0" as any,
      n: 1,
      prompt,
    });

    const image =
      generation.data[0].url ||
      "data:image/png;base64," + generation.data[0].b64_json;

    return { success: true, data: image };
  } catch (e: any) {
    console.log(e);
    return { success: false };
  }
}
