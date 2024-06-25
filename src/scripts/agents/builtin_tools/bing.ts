import { AgenticToolItem } from "@scoopika/types";

const bingClient: AgenticToolItem = {
  id: "bing_client",
  name: "Bing Search",
  description: "Bing web search",
  img: "https://cdn.vox-cdn.com/thumbor/lw7eaG_tnqPDo-Jy5CVzQ22WyCY=/0x0:660x440/1400x1050/filters:focal(330x220:331x221)/cdn.vox-cdn.com/uploads/chorus_asset/file/21937385/binglogo.jpg",
  links: [
    {
      name: "Webiste",
      url: "https://www.microsoft.com/en-us/bing/apis/bing-web-search-api",
    },
    {
      name: "Pricing",
      url: "https://www.microsoft.com/en-us/bing/apis/pricing",
    },
    {
      name: "Legal",
      url: "https://www.microsoft.com/en-us/bing/apis/legal",
    },
  ],
  tags: ["search"],
  methods: [
    {
      id: "bing_web_search",
      name: "Search",
      description:
        "Searches the web using the Bing search engine to return the most relevant web pages for a given query. Can also be used to find up-to-date news and information about many topics",
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
        "Enter your Bing API key. Check the website to generate an API key",
      env: "BING_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with the Bing API",
      default: "https://api.bing.microsoft.com",
      optional: true,
    },
  ],
};

export default bingClient;
