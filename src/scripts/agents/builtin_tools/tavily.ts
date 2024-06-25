import { AgenticToolItem } from "@scoopika/types";

const tavilyClient: AgenticToolItem = {
  id: "tavily_client",
  name: "Tavily",
  description: "Web search API tailored for LLMs",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRut3QhmGldBp3mF6rFLhESHRUhBD-aPgRTg&s",
  links: [
    {
      name: "Website",
      url: "https://tavily.com/",
    },
    {
      name: "Pricing",
      url: "https://tavily.com/#pricing",
    },
  ],
  tags: ["search"],
  methods: [
    {
      id: "tavily_web_search",
      name: "Web search",
      description:
        "Searches the web to find the most relevant pages for a given query and summarizes the results. Very useful for finding up-to-date news and information about any topic",
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
        "Enter your Tavily API key. Check the website to generate an API key",
      env: "TAVILY_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Tavily API",
      default: "https://api.tavily.com",
      optional: true,
    },
  ],
};

export default tavilyClient;
