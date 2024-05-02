export function readPlan(plan: string): { status: string; id: string } {
  const parts = plan.split(":::");

  if (parts.length !== 2) {
    throw new Error("Invalid plan data");
  }

  return {
    id: parts[0],
    status: parts[1],
  };
}

export const features: string[] = [
  "Up to 10 agents",
  "Up to 4 smart boxes",
  "Serverless database for persistent history",
  "Unlimited agents prompts",
  "Early access to new features",
];

