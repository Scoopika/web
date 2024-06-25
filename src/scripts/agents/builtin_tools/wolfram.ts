import { AgenticToolItem } from "@scoopika/types";

const wolframAlphaClient: AgenticToolItem = {
  id: "wolfram_alpha_client",
  name: "Wolfram Alpha",
  description:
    " LLM API client for answering computational, mathematical, and scientific questions",
  img: "https://www.wolfram.com/homepage/img/carousel-wolfram-alpha.png",
  links: [
    {
      name: "API page",
      url: "https://products.wolframalpha.com/llm-api/documentation",
    },
  ],
  tags: ["mathematical", "scientific", "questions"],
  methods: [
    {
      id: "ask_wolfram_alpha",
      name: "Ask mathematical & scientific questions",
      description:
        "Ask WolframAlpha questions in natural language about entities in chemistry, physics, geography, history, art, astronomy, and more",
    },
  ],
  options: [
    {
      id: "appId",
      index: 0,
      type: "secret",
      name: "App ID",
      placeholder: "Enter App ID",
      description:
        "Enter your WolframAlpha app ID. Check the website to generate one",
      env: "WOLFRAM_APP_ID",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with WolframAlpha API",
      default: "https://www.wolframalpha.com/api/",
      optional: true,
    },
  ],
};

export default wolframAlphaClient;
