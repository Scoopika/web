import { AgenticToolItem } from "@scoopika/types";

const serperClient: AgenticToolItem = {
  id: "serper_client",
  name: "Serper Google search",
  description: "Wrapper around Serper for Google search",
  img: "https://pbs.twimg.com/profile_images/1622631647702142976/KTEBvoBO_400x400.jpg",
  links: [
    {
      name: "Website",
      url: "https://serper.dev/",
    },
    {
      name: "Terms of use",
      url: "https://serper.dev/terms",
    },
  ],
  tags: ["search", "google"],
  methods: [
    {
      id: "serper_google_search",
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
        "Enter your Serper API key. Check the website to generate an API key",
      env: "SERPER_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Serper API",
      default: "https://google.serper.dev",
      optional: true,
    },
  ],
};

export default serperClient;
