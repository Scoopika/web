"use server";

import { authOptions } from "@/lib/auth";
import { PlanData } from "@/types/planData";
import { getServerSession } from "next-auth";

export default async function getPlanData(
  id: number | string,
): Promise<{ success: false } | { success: true; data: PlanData }> {
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
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      },
    );

    const data = (await res.json()) as PlanData;

    if (data?.errors && data?.errors?.length > 0) {
      throw new Error("Invalid");
    }

    return {
      success: true,
      data,
    };
  } catch {
    return { success: false };
  }
}
