import { AgenticToolItem } from "@scoopika/types";

const perigonClient: AgenticToolItem = {
  id: "perigon_client",
  name: "Perigon",
  description:
    "Real-time news API and web content data from 140,000+ sources. Structured and enriched by AI, primed for LLMs",
  img: "https://www.goperigon.com/img/logo-secondary.svg",
  links: [
    {
      name: "Website",
      url: "https://www.goperigon.com/products/news-api",
    },
  ],
  tags: ["search", "news"],
  methods: [
    {
      id: "search_news_articles",
      name: "Search news articles",
      description: "Search for news articles indexed by Perigon",
    },
    {
      id: "search_news_stories",
      name: "Search new stories",
      description:
        "Search for news stories indexed by Perigon. Stories are clusters of related news articles and are useful for finding top stories and trending headlines",
    },
    {
      id: "search_people",
      name: "Search people",
      description: "Search for well-known people indexed by Perigon",
    },
    {
      id: "search_companies",
      name: "Search companies",
      description:
        "Search for companies indexed by Perigon. Includes public and private companies sourced from public records and Wikidata",
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
        "Enter your Perigon API key. Check the website to generate an API key",
      env: "PERIGON_API_KEY",
      optional: true,
    },
  ],
};

export default perigonClient;
