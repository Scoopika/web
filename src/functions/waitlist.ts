"use server";

import { db } from "@/lib/db";

export default async function addToWaitlist(
  email: string,
): Promise<{ success: false; error: string } | { success: true }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    typeof email !== "string" ||
    email.length < 1 ||
    !emailRegex.test(email)
  ) {
    return { success: false, error: "Invalid Email address" };
  }

  try {
    await db.waitlistv1.create({
      data: { email },
    });
  } catch {
    return {
      success: false,
      error: "Can't add your email, maybe it was added before, sorry :(",
    };
  }

  return { success: true };
}
