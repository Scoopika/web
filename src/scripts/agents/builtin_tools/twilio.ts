import { AgenticToolItem } from "@scoopika/types";

const twilioClient: AgenticToolItem = {
  id: "twilio_client",
  name: "Twilio",
  description: "Twilio API to send and receive SMS messages",
  img: "https://logowik.com/content/uploads/images/twilio2236.jpg",
  links: [
    {
      name: "Website",
      url: "https://www.twilio.com/docs/conversations/api",
    },
  ],
  tags: ["sms", "communication"],
  methods: [
    {
      id: "twilio_send_message",
      name: "Send message",
      description:
        "Sends an text SMS message via the Twilio Conversation API to a specific conversation based on its ID",
    },
    {
      id: "twilio_get_messages",
      name: "Get messages",
      description:
        "Retrieves all SMS messages contained within a specific Twilio Conversation based on its ID",
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
        "Enter your Twilio API key. Check the website to generate an API key",
      env: "TWILIO_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base Url",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with Twilio API",
      default: "https://conversations.twilio.com/v1",
      optional: true,
    },
  ],
};

export default twilioClient;
