"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function resumeSub(id: string | number) {
  if (!id) {
    return { success: false };
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "subscriptions",
            id: `${id}`,
            attributes: {
              cancelled: false,
            },
          },
        }),
      },
    );

    const data = await res.json();

    if ((data.errors && data.errors?.length > 0) || data.erro) {
      throw new Error("cancel error");
    }

    await revalidatePath("/app", "layout");

    return { success: true };
  } catch {
    return { success: false };
  }
}
