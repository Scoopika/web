import { AgenticToolItem } from "@scoopika/types";

const serpApiClient: AgenticToolItem = {
  id: "serpapi_client",
  name: "SerpApi Google search",
  description: "Wrapper around SerpAPI for Google search",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QPITmvkzT2pvLd4FDn_Sz9Ma3XCaxjeDfQ&s",
  links: [
    {
      name: "Website",
      url: "https://serpapi.com/",
    },
    {
      name: "Pricing",
      url: "https://serpapi.com/pricing",
    },
    {
      name: "Legal & terms",
      url: "https://serpapi.com/legal",
    },
  ],
  tags: ["search", "google"],
  methods: [
    {
      id: "serpapi_google_search",
      name: "Google search",
      description:
        "Uses Google Search to return the most relevant web pages for a given query. Useful for finding up-to-date news and information about any topic",
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
        "Enter your SerpApi API key. Check the website to generate an API key",
      env: "SERPAPI_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with SerpApi",
      default: "https://serpapi.com",
      optional: true,
    },
  ],
};

export default serpApiClient;
