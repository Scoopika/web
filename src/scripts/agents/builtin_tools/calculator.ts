import { AgenticToolItem } from "@scoopika/types";

const calculator: AgenticToolItem = {
  id: "calculator",
  name: "Calculator",
  description: "Basic calculator for simple mathematical expressions",
  img: "https://cdn.iconscout.com/icon/free/png-256/free-calculator-1859951-1575939.png",
  links: [
    {
      name: "Github",
      url: "https://github.com/josdejong/mathjs",
    },
  ],
  tags: ["math", "free"],
  methods: [
    {
      id: "calculate",
      name: "Calculate",
      description:
        'Computes the result of simple mathematical expressions. Handles basic arithmetic operations like addition, subtraction, multiplication, division, exponentiation, and common functions like sin, cos, abs, exp, and random. Example expressions: "1.2 * (2 + 4.5)", "12.7 cm to inch", "sin(45 deg) ^ 2"',
    },
  ],
  options: [],
};

export default calculator;
