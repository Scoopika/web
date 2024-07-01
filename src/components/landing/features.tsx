"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaTools } from "react-icons/fa";
import { FaBrain, FaDatabase } from "react-icons/fa6";
import { RiRobot2Fill, RiVoiceprintFill } from "react-icons/ri";
import { TbMessageChatbot } from "react-icons/tb";

const tabs: {
  name: string;
  icon: React.ReactNode;
  image: string;
  index: number;
}[] = [
  {
    index: 0,
    name: "Agents",
    icon: <RiRobot2Fill size={15} />,
    image: "/images/agents.png",
  },
  {
    index: 1,
    name: "Tools",
    icon: <FaTools size={15} />,
    image: "/images/tools.png",
  },
  {
    index: 2,
    name: "Memory",
    icon: <FaDatabase size={15} />,
    image: "/images/memory.png",
  },
  {
    index: 3,
    name: "Knowledge",
    icon: <FaBrain size={15} />,
    image: "/images/knowledge.png",
  },
  {
    index: 4,
    name: "Voice",
    icon: <RiVoiceprintFill size={17} />,
    image: "/images/voice.png",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="hidden w-fit relative mt-16 sm:flex border border-secondary-light/[0.35] rounded-full bg-secondary/[0.2] mx-auto px-3 py-1 space-x-4 sm:space-x-1 backdrop-blur">
        {tabs
          .sort((a, b) => a.index - b.index)
          .map((tab, index) => (
            <Button
              key={`features-tab-${index}`}
              size="sm"
              radius="lg"
              variant={activeTab === tab.index ? "flat" : "light"}
              startContent={tab.icon}
              className={`${index === 0 && "rounded-r-sm"} ${
                index === tabs.length - 1 && "rounded-l-sm"
              }`}
              onPress={() => setActiveTab(tab.index)}
            >
              {tab.name}
            </Button>
          ))}
      </div>
      <img
        src={tabs.find((tab) => tab.index === activeTab)?.image}
        className="hidden sm:block w-full md:w-[80%] object-cover border-1 rounded-2xl mt-6"
      />
    </>
  );
}
