import { AgentData } from "@scoopika/types";

const itemValue = <K extends keyof AgentData>(
  data: AgentData,
  key: K,
): AgentData[K] | undefined => {
  const value = data[key];

  if (!value || (typeof value === "string" && value.length < 1)) {
    return undefined;
  }

  return value;
};

export default itemValue;
