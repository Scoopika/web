"use client";

export default function frontend<ReturnType>(
  func: () => ReturnType,
  failed?: ReturnType,
): ReturnType | typeof failed {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return failed;
  }

  const res: ReturnType = func();

  return res;
}
