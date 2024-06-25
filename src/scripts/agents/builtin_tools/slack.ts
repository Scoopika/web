import { AgenticToolItem } from "@scoopika/types";

const slackClient: AgenticToolItem = {
  id: "slack_client",
  name: "Slack",
  description: "Send and receive Slack messages",
  img: "https://assets-global.website-files.com/621c8d7ad9e04933c4e51ffb/65eba5ffa14998827c92cc01_slack-octothorpe.png",
  links: [
    {
      name: "Website",
      url: "https://api.slack.com/docs",
    },
  ],
  tags: ["communication"],
  methods: [
    {
      id: "slack_send_message",
      name: "Send messages",
      description: "Sends a slack message to a slack channel",
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
        "Enter your Slack API key. Check the website to generate an API key",
      env: "SLACK_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Slack API",
      default: "https://slack.com/api",
      optional: true,
    },
  ],
};

export default slackClient;
