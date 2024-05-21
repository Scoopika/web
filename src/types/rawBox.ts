import { ToolSchema } from "@scoopika/types";

export interface RawBoxData {
  id: string;
  name: string;
  agents: string[];
  tools: ToolSchema[];
  manager: string;
  llm_client: string;
}
