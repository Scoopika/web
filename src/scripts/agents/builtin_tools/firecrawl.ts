import { AgenticToolItem } from "@scoopika/types";

const firecrawlClient: AgenticToolItem = {
  id: "firecrawl_client",
  name: "Firecrawl",
  description:
    "Crawl and convert any website into markdown or structured data",
  img: "https://bookface-images.s3.amazonaws.com/logos/4ab40184581e8791028ab734d2290f35ebd290cc.png",
  links: [
    {
      name: "Website",
      url: "https://www.firecrawl.dev/",
    },
    {
      name: "Pricing",
      url: "https://www.firecrawl.dev/pricing",
    },
  ],
  tags: ["scrape", "crawl", "markdown"],
  methods: [
    {
      id: "firecrawl_scrape_url",
      name: "Scrape url",
      description: "Scrape the contents of a URL",
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
        "Enter your Firecrawl API key. Check the website to generate an API key",
      env: "FIRECRAWL_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Firecrawl API",
      default: "https://api.firecrawl.dev",
      optional: true,
    },
  ],
};

export default firecrawlClient;
