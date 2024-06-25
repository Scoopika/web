import {
  AgenticToolItem,
  AgenticToolItemOptions,
  AgenticToolSchema,
  AgenticToolSchemaOptions,
} from "@scoopika/types";
import weatherClient from "./weather";
import bingClient from "./bing";
import calculator from "./calculator";
import midjourneyClient from "./midjourney";
import dexaClient from "./dexa";
import e2b from "./e2b";
import exaClient from "./exa";
import firecrawlClient from "./firecrawl";
import novuClient from "./novu";
import perigonClient from "./perigon";
import serpApiClient from "./serp_api";
import serperClient from "./serper";
import slackClient from "./slack";
import tavilyClient from "./tavily";
import twilioClient from "./twilio";
import wikipediaClient from "./wikipedia";
import wolframAlphaClient from "./wolfram";

export function makeSample(tool: AgenticToolItem): AgenticToolSchema {
  const methods: string[] = tool.methods.map((m) => m.id);
  const options: AgenticToolSchemaOptions[] = [];

  for (const opt of tool.options) {
    options.push({
      id: opt.id,
      type: opt.type,
      value: opt.default as any,
    });
  }

  const sample: AgenticToolSchema = {
    id: tool.id,
    methods,
    options,
  };

  return sample;
}

export function getOptionValue(
  itemOption: AgenticToolItemOptions,
  toolOption: AgenticToolSchemaOptions
): string | undefined {
  const defaultValue =
    itemOption.default && `${itemOption.default}`.length > 0
      ? `${itemOption.default}`
      : undefined;
  const currentValue =
    toolOption.value && `${toolOption.value}`.length > 0
      ? `${toolOption.value}`
      : undefined;

  return currentValue || defaultValue;
}

const builtinTools: AgenticToolItem[] = [
  weatherClient,
  bingClient,
  calculator,
  midjourneyClient,
  dexaClient,
  e2b,
  exaClient,
  firecrawlClient,
  novuClient,
  perigonClient,
  serpApiClient,
  serperClient,
  slackClient,
  tavilyClient,
  twilioClient,
  wikipediaClient,
  wolframAlphaClient,
];

export default builtinTools;
