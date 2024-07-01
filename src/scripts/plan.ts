export function readPlanType(plan: string): "free" | "basic" | "scale" {
  if (plan === "free" || plan === "none" || !plan.includes(":::")) {
    return "free";
  }

  const type = (plan.split(":::")[2] || "basic") as "basic" | "scale";
  return type;
}

export function readPlan(plan: string): {
  status: string;
  id: string;
  type: "free" | "basic" | "scale";
} {
  const parts = plan.split(":::");

  if (parts.length !== 2) {
    return {
      id: "",
      status: "active",
      type: "free",
    };
  }

  const type = readPlanType(plan);
  return {
    id: parts[0],
    status: parts[1],
    type,
  };
}

export function isPro(plan: string): boolean {
  return plan !== "none" && plan !== "free" && plan.includes(":::");
}

export const features: string[] = [
  "Up to 10 agents",
  "Up to 4 smart boxes",
  "Serverless database for persistent history",
  "Early access to new features",
];
