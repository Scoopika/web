"use client";

import { useState } from "react";

interface Step {
  title: string;
  description: string;
  img: string;
}

const steps: Step[] = [
  {
    title: "Create agent",
    description:
      "Give your agent a name and description, and you can add or generate an avatar for it as well",
    img: "",
  },
  {
    title: "Add a prompt",
    description:
      "Prompts contain the instructions for how your agent should behave, they can also have structured inputs variables",
    img: "",
  },
  {
    title: "Integrate into your application",
    description:
      "Generate an access token, and use it to run the agent in your application using our libraries for both server and client side",
    img: "",
  },
  {
    title: "Discover advanced features",
    description:
      "Scoopika has a full bag of features that might be useful for your use case, we recommend you alway check the documentation to learn more about them",
    img: "",
  },
];

export default function StartingSteps() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="flex w-[80%] gap-16 min-h-[30rem]">
      <div className="w-full flex flex-col p-6">
        <h2 className="text-3xl font-semibold w-full">
          Start Building with Ease
        </h2>

        <div className="flex flex-col gap-2 mt-8">
          {steps.map((step, index) => (
            <div
              key={`startingstep-${index}`}
              className={`p-3 border-1 rounded-lg shadow transition-all cursor-pointer hover:border-black/20 dark:hover:border-white/20 ${index === activeStep && "border-violet-400 hover:border-violet-400"}`}
              onClick={() => setActiveStep(index)}
            >
              <p className="font-semibold">
                {index + 1}
                {"."} {step.title}
              </p>
              <p className="text-sm transition-all">
                {index === activeStep && step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full h-full border-1 rounded-lg bg-accent/20"></div>
      </div>
    </div>
  );
}
