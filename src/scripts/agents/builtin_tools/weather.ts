import { AgenticToolItem } from "@scoopika/types";

const weatherClient: AgenticToolItem = {
  id: "weather_client",
  name: "Weather",
  description: "Get current weather data based on location",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQvZo7ieC19NLR5bOmaAMH8zq-WNY-lM3qw&s",
  links: [
    {
      name: "Website",
      url: "https://www.weatherapi.com",
    },
    {
      name: "Pricing",
      url: "https://www.weatherapi.com/pricing.aspx",
    },
    {
      name: "Terms of Use",
      url: "https://www.weatherapi.com/terms.aspx",
    },
  ],
  tags: ["weather"],
  methods: [
    {
      id: "get_current_weather",
      name: "Get current weather",
      description:
        "Location to get the weather for. Can be a city name, zipcode, IP address, or lat/lng coordinates",
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
        "Enter your Weather API key. Check the website to generate an API key",
      env: "WEATHER_API_KEY",
      optional: true,
    },
    {
      id: "apiBaseUrl",
      index: 1,
      type: "string",
      name: "Base URL",
      placeholder: "Enter API base Url",
      description:
        "The API base url. can use any other API that's compatible with the Weather API",
      default: "https://api.weatherapi.com/v1",
    },
  ],
};

export default weatherClient;
