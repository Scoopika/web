import { AgenticToolItem } from "@scoopika/types";

const e2b: AgenticToolItem = {
  id: "e2b_client",
  name: "E2B (Python sandbox)",
  description: "Secure hosted sandboxes for AI-generated code execution",
  img: "https://media.licdn.com/dms/image/D4E0BAQHzsj9YitmSSw/company-logo_200_200/0/1697233773439/e2b_dev_logo?e=2147483647&v=beta&t=uykcXog-Hyqp58YR9BMl8pEwoZvPRuJO6bC8LPaol70",
  links: [
    {
      name: "Website",
      url: "https://e2b.dev/",
    },
    {
      name: "Pricing",
      url: "https://e2b.dev/docs/pricing",
    },
  ],
  tags: ["python", "code execution"],
  methods: [
    {
      id: "execute_python",
      name: "Execute Python code",
      description:
        "Execute python code in a Jupyter notebook cell and returns any result, stdout, stderr, display_data, and error",
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
        "Enter your E2B API key. Check the website to generate an API key",
      env: "E2B_API_KEY",
      optional: true,
    },
  ],
};

export default e2b;
