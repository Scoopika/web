import { AgenticToolItem } from "@scoopika/types";

const wikipediaClient: AgenticToolItem = {
  id: "wikipedia_client",
  name: "Wikipedia",
  description: "Wikipedia page search and summaries",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png",
  links: [
    {
      name: "APIs page",
      url: "https://www.mediawiki.org/wiki/API",
    },
  ],
  tags: ["search", "wikipedia", "free"],
  methods: [
    {
      id: "wikipedia_search",
      name: "Search wikipedia pages",
      description: "Searches Wikipedia for pages matching the given query",
    },
    {
      id: "wikipedia_get_page_summary",
      name: "Get Wikipedia page summary",
      description: "Gets a summary of the given Wikipedia page",
    },
  ],
  options: [
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. You can use any Wikipedia web API you want",
      default: "https://en.wikipedia.org/api/rest_v1",
      optional: true,
    },
  ],
};

export default wikipediaClient;
