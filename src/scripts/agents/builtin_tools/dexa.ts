import { AgenticToolItem } from "@scoopika/types";

const dexaClient: AgenticToolItem = {
  id: "dexa_client",
  name: "Dexa",
  description: "Answers questions from the best podcasters",
  img: "https://asset.brandfetch.io/id88y2xmaG/idWJXcGtjH.png",
  links: [
    {
      name: "Website",
      url: "https://dexa.ai/",
    },
    {
      name: "Terms of use",
      url: "https://dexa.ai/terms",
    },
  ],
  tags: ["search", "question"],
  methods: [
    {
      id: "ask_dexa",
      name: "Ask Dexa",
      description:
        "Answers questions based on knowledge of trusted experts and podcasters. Example experts include: Andrew Huberman, Tim Ferriss, Lex Fridman, Peter Attia, Seth Godin, Rhonda Patrick, Rick Rubin, and more",
    },
  ],
  options: [
    {
      id: "apiKey",
      index: 0,
      type: "secret",
      name: "API Key",
      placeholder: "Enter API key",
      description:
        "Enter your Dexa API key. Check the website to generate an API key",
      env: "DEXA_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Dexa API",
      default: "https://dexa.ai",
      optional: true,
    },
  ],
};

export default dexaClient;
