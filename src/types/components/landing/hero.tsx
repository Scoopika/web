"use client";

import { useState } from "react";
import Tools from "@/components/landing/tools";
import WaitlistDialog from "@/components/joinWaitlist";

export default function Hero() {
  const [color, setColor] = useState<string>("brandwhite");

  return (
    <main className="pt-16 pb-8 min-h-max relative w-full">
      <div className="flex flex-col w-full h-full justify-center items-center pt-16">
        <h1 className="text-4xl sm:text-5xl font-semibold relative z-20  py-2 items-center">
          Build Your <span className="primaryTitle">AI-Powered</span>
        </h1>
        <h1 className="text-4xl sm:text-5xl font-semibold relative z-20  py-2 mb-2 items-center">
          Features That Shine
        </h1>
        <p className="mt-4 opacity-80 text-base mb-12 text-center">
          Scoopika is an open-source system for building controllable and
          predictable <br /> AI-powered context-aware products that enable users
          to <br /> interact with their data in natural language.
        </p>
        <WaitlistDialog color={color} />
        <Tools updateColor={setColor} />
        <div className="flex flex-col items-center w-full relative pt-20">
          <div className="flex flex-col gap-3 w-[50%] rounded-r-full justify-center items-center h-1 bg-gradient-to-r from-background via-[var(--brandpurple)] to-background opacity-60"></div>
        </div>
      </div>
    </main>
  );
}
