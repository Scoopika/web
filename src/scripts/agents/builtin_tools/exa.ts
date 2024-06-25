import { AgenticToolItem } from "@scoopika/types";

const exaClient: AgenticToolItem = {
  id: "exa_client",
  name: "Exa",
  description: "Web search tailored for LLMs",
  img: "https://exa.imgix.net/logo_cream.png",
  links: [
    {
      name: "Website",
      url: "https://exa.ai/",
    },
    {
      name: "Pricing",
      url: "https://exa.ai/pricing",
    },
    {
      name: "Terms of use",
      url: "https://exa.ai/Exa_Labs_Terms_of_Service.pdf",
    },
  ],
  tags: ["search"],
  methods: [
    {
      id: "exa_search",
      name: "Search",
      description: "Search the web for the given query",
    },
    {
      id: "exa_find_similar",
      name: "Find similar links",
      description: "Find similar links for the provided URL",
    },
    {
      id: "exa_get_contents",
      name: "Get contents",
      description:
        "Retrieve contents of documents based on a list of Exa document IDs",
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
        "Enter your Exa API key. Check the website to generate an API key",
      env: "EXA_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Exa API",
      default: "https://api.exa.ai",
      optional: true,
    },
  ],
};

export default exaClient;
