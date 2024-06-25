import { AgenticToolItem } from "@scoopika/types";

const midjourneyClient: AgenticToolItem = {
  id: "midjourney_client",
  name: "Midjourney",
  description: "Unofficial Midjourney client for generative images",
  img: "https://yt3.googleusercontent.com/OH8KZcHdx8b4K3inCUwOoKRgUHVZs14VuhLLRoe-qOOou726r1cgTn9jlFnGTIid5Ngso0pZ_Q=s900-c-k-c0x00ffffff-no-rj",
  links: [
    {
      name: "Website",
      url: "https://www.imagineapi.dev",
    },
    {
      name: "Pricing",
      url: "https://www.imagineapi.dev/pricing",
    },
  ],
  tags: ["image generation", "media"],
  methods: [
    {
      id: "midjourney_create_images",
      name: "Generate 4 images",
      description: "Creates 4 images from a prompt using the Midjourney API",
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
        "Enter your Midjourney Imagine API key. Check the website to generate an API key",
      env: "MIDJOURNEY_IMAGINE_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Midjourney Imagine API",
      default: "https://cl.imagineapi.dev",
      optional: true,
    },
  ],
};

export default midjourneyClient;
