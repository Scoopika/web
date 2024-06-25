"use server";

import { decode } from 'base64-arraybuffer'
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import supabase from '@/lib/supabase';

export default async function generateAvatar(
  agentName: string,
  agentDescription: string
): Promise<{ success: false } | { success: true; data: string | undefined }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const token = process.env.HUGGINGFACE_TOKEN;
  const prompt = `Avatar for ${agentName}: '${agentDescription}'`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      }),
    }
  );

  console.log(response.status);
  if (!response.ok) {
    return { success: false };
  }

  const result = await response.blob();

  const { data, error } = await supabase.storage.from("avatars").upload(
    crypto.randomUUID(), result
  )

  if (typeof data?.path !== "string" || error) {
    return { success: false };
  }

  return {
    success: true,
    data: "https://gwsxxjxhbvifhzqsbpfp.supabase.co/storage/v1/object/public/avatars/" + data.path,
  };
}
