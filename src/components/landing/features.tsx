"use client";

import { RiRobot2Fill } from "react-icons/ri";
import { HiMiniCubeTransparent } from "react-icons/hi2";
import { TbTools } from "react-icons/tb";
import { HiDatabase } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";

interface Tab {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  link: string;
  comp: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "Agents",
    icon: <RiRobot2Fill size={16} />,
    title: "LLM-Powered Agents",
    link: "https://docs.scoopika.com/agents",
    description:
      "Craft intuitive AI assistants for your applications. Leverage Scoopika's LLM-powered agents to enable users to interact with their data seamlessly using natural language.",
    features: [
      "Natural language interaction & customizable personalities",
      "Equip agents with tools & APIs",
      "Real-Time streaming for next-level performance",
    ],
    comp: (
      <>
        <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <FaUser />
          </div>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Check my latest search history query, and tell me more information
            about it
          </p>
        </div>
        <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <RiRobot2Fill />
          </div>
          <div className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
              <FaCheck />
              called get_history
            </p>
            I see that {"you've"} searched about unicorns lately...
          </div>
        </div>
      </>
    ),
  },
  {
    id: "Multi-agent boxes",
    icon: <HiMiniCubeTransparent size={16} />,
    title: "Multi-agent Smart Boxes",
    link: "https://docs.scoopika.com/multi-agent-boxes",
    description:
      "Empower your AI agents to work together seamlessly. They'll break complex tasks into steps and each agent will perform the steps that better fits it.",
    features: [
      "Context-aware processing with managed memory",
      "Flexible tooling and collaboration",
      "Parallel agent execution with real-time responses",
    ],
    comp: (
      <>
        <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <FaUser />
          </div>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Tell me more about the recent error my deployment number {"#123"}{" "}
            faced
          </p>
        </div>
        <div className="w-64 flex items-center gap-2 transition-all hover:translate-x-2 duration-500 text-xs mb-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <HiMiniCubeTransparent size={16} />
          </div>
          Assigned task to <span className="text-violet-500">{"@deplo"}</span>
        </div>
        <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
          <div className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
              <FaCheck />
              {"@deplo"} called deployment_info
            </p>
            The recent error in your deployment was caused by a missing
            dependency...
          </div>
        </div>
      </>
    ),
  },
  {
    id: "Tools",
    icon: <TbTools size={16} />,
    title: "External Tools",
    link: "https://docs.scoopika.com/tools",
    description:
      "Connect your agents seamlessly to your custom tools, APIs, and functions, empowering them to execute actions, retrieve data, and automate tasks within your application ecosystem.",
    features: [
      "Seamless tool integration. Any function can be a tool",
      "Enhanced data validation & full type safety",
      "Intelligent error handling & auto-healing",
    ],
    comp: (
      <>
        <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <FaUser />
          </div>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Search Bing for results about space
          </p>
        </div>
        <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <RiRobot2Fill />
          </div>
          <div className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
              <FaCheck />
              called search_web
            </p>
            <p className="p-1 pt-0 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
              <IoMdClose />
              search_web validation failed
            </p>
            Sorry, but I {"can't"} search using Bing, only Google is
            available...
          </div>
        </div>
      </>
    ),
  },
  {
    id: "History stores",
    icon: <HiDatabase size={16} />,
    title: "Long-term Memory",
    link: "https://docs.scoopika.com/history-stores",
    description:
      "Say goodbye to complex history management. Scoopika provides a built-in, managed serverless data store for your chat history sessions. Deploy it with just a single click.",
    features: [
      "One-Click deployment & zero setup",
      "Simplified session management",
      "Fast with APIs served on the edge",
    ],
    comp: (
      <>
        <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <FaUser />
          </div>
          <p className="text-xs opacity-60">sent to session {"#123"}</p>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Do you remember my name from our previous conversation yesterday?
          </p>
        </div>
        <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <RiRobot2Fill />
          </div>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Yes I remember, your name is Kais...
          </p>
        </div>
      </>
    ),
  },
  {
    id: "Client-side actions",
    icon: <RiSendPlane2Fill size={16} />,
    title: "Client-Side Actions",
    link: "https://docs.scoopika.com/tools/client-side-actions",
    description:
      "Empower agents to execute functions directly within the user's browser, facilitating real-time interaction and dynamic experiences.",
    features: [
      "Seamless Client-side execution (super easy)",
      "Real-time user experience",
      "Full type-safety and data validation",
    ],
    comp: (
      <>
        <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <FaUser />
          </div>
          <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            Filter my deployments to show only failed deployments before 1 May
            2024
          </p>
        </div>
        <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
            <RiRobot2Fill />
          </div>
          <div className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
            <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
              <FaCheck />
              called filter_deployments
            </p>
            I just filtered your deployments...
          </div>
        </div>
      </>
    ),
  },
  // {
  //   id: "Missions",
  //   icon: <GoTasklist size={18} />,
  //   title: "Missions",
  //   link: "",
  //   description:
  //     "Handle complex requests that require multiple tasks by multiple agents and tools with ease using Missions",
  //   features: [
  //     "Describe the mission requirements, and assign the wanted agents and tools to it",
  //     "Scoopika will create a list tasks that are automatically assigned to the most suitable agents",
  //     "All agents results results are auto verification, making sure the mission has bee achieved with a final report.",
  //   ],
  //   comp: (
  //     <>
  //       <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
  //         <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
  //           <FaUser />
  //         </div>
  //         <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
  //           Get my recent website traffic data, make a report about it with
  //           future expectations, and publish it to my blog
  //         </p>
  //       </div>
  //       <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
  //         <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
  //           <GoTasklist size={20} />
  //         </div>
  //         <p className="text-xs opacity-60">Created 3 tasks</p>
  //         <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
  //           <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
  //             <FaCheck />
  //             @webtraf called web_traffic
  //           </p>
  //           <p className="p-1 w-64 rounded-full text-xs flex items-center gap-1 mb-2 opacity-60">
  //             <FaCheck />
  //             @webtraf completed task #1
  //           </p>
  //           <p className="w-64 rounded-full text-xs flex items-center gap-1 mb-2">
  //             Making a report about the traffic...
  //           </p>
  //         </p>
  //       </div>
  //     </>
  //   ),
  // },
  // {
  //   id: "RAG",
  //   icon: <LiaVectorSquareSolid size={18} />,
  //   title: "Retrieval-Augmented Generation (RAG)",
  //   link: "",
  //   description:
  //     "Enhance the capabilities of your agents with custom knowledge about your application and users, retrieved based on the context",
  //   features: [
  //     "Enable agents to access custom knowledge sources and incorporate them into the generation process",
  //     "Provide users with more relevant and meaningful results",
  //     "Load any file and website to your RAG vector store with one line of code",
  //   ],
  //   comp: (
  //     <>
  //       <div className="w-64 flex flex-col text-sm gap-2 mb-6 transition-all hover:translate-x-2 duration-500">
  //         <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
  //           <FaUser />
  //         </div>
  //         <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
  //           How to use this platform to create new agents?
  //         </p>
  //       </div>
  //       <div className="w-64 flex flex-col text-sm gap-2 transition-all hover:translate-x-2 duration-500">
  //         <div className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground text-background">
  //           <RiRobot2Fill />
  //         </div>
  //         <p className="w-full p-2 border-1 rounded-lg bg-accent/20 text-xs">
  //           {"Here's"} a step-by-step guide to help you create new agents:
  //           {"\n\n..."}
  //         </p>
  //       </div>
  //     </>
  //   ),
  // },
];

const TabPage = ({ tab }: { tab: Tab }) => {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-semibold">{tab.title}</h2>
      <p className="text-sm mt-2 w-full lg:max-w-[50%] mb-8">{tab.description}</p>
      <div className="flex flex-col gap-4 w-full lg:max-w-[50%] mb-10">
        {tab.features.map((feature, index) => (
          <p
            key={`tabsubfeature-${tab.id}-${index}`}
            className="text-sm opacity-90 flex gap-3 items-center"
          >
            <span className="min-w-5 min-h-5 max-w-5 max-h-5 flex items-center justify-center bg-foreground text-background rounded-full">
              <FaCheck />
            </span>
            <span className="opacity-80">{feature}</span>
          </p>
        ))}
      </div>
      <Button
        as={Link}
        href={tab.link}
        target="_blank"
        variant="light"
        className="font-semibold max-w-max"
        endContent={<IoChevronForwardOutline />}
      >
        Learn more
      </Button>

      <div className="absolute right-0 bottom-0 w-[70%] min-h-[80%] max-h-[80%] flex flex-col items-end justify-end overflow-hidden p-14 pr-16 z-10 hidden lg:flex">
        {tab.comp}
      </div>
    </div>
  );
};

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("Agents");
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [hide, setHide] = useState<"r" | "l" | undefined>();

  const switchTab = (id: string, index: number) => {
    if (id === activeTab) {
      return;
    }

    const direction = index > activeTabIndex ? "l" : "r";

    setHide(direction);

    setTimeout(() => {
      setActiveTab(id);
    }, 200);

    setTimeout(() => {
      setActiveTabIndex(index);
      setHide(undefined);
    }, 500);
  };

  return (
    <div className="w-[80%] p-4 border-1 rounded-xl dark:border-white/20 bg-background min-h-[32rem] max-h-[32rem] shadow-lg relative">
      <div className="flex items-center justify-center w-full absolute -top-8 left-0 z-30">
        <div className="flex items-center p-2 pl-4 pr-4 bg-background border-r-1 border-l-1 border-t-1 rounded-t-lg gap-2 max-w-[80%] overflow-auto">
          {tabs.map((tab, index) => (
            <Button
              key={`featuretab-${tab.id}`}
              size="sm"
              variant="light"
              startContent={tab.icon}
              className={`min-w-max border-1 ${tab.id !== activeTab ? "opacity-70 border-transparent" : "shadow-lg border-border"} transition-all`}
              onPress={() => switchTab(tab.id, index)}
            >
              {tab.id}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={`${hide && "opacity-0"} transition-all duration-500 p-4 pt-12 md:p-20 w-full min-h-[30rem] max-h-[30rem] overflow-auto border-1 rounded-xl`}
      >
        <TabPage tab={tabs[activeTabIndex]} />
      </div>
    </div>
  );
}
