import { AgenticToolItem } from "@scoopika/types";

const novuClient: AgenticToolItem = {
  id: "novu_client",
  name: "Novu",
  description: "Send notifications (email, SMS, in-app, push, etc)",
  img: "https://avatars.githubusercontent.com/u/77433905?v=4",
  links: [
    {
      name: "Website",
      url: "https://novu.co/",
    },
    {
      name: "Pricing",
      url: "https://novu.co/pricing",
    },
    {
      name: "Terms of use",
      url: "https://novu.co/terms",
    },
  ],
  tags: ["notifications"],
  methods: [
    {
      id: "novu_trigger_event",
      name: "Send notification",
      description:
        "Sends a notification to a person given their novu `subscriberId` and an `email` or `phone` number. Useful for sending emails or SMS text messages to people",
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
        "Enter your Novu API key. Check the website to generate an API key",
      env: "NOVU_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Novu API",
      default: "https://api.novu.co/v1",
      optional: true,
    },
  ],
};

export default novuClient;
