import Navbar from "@/components/navbar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Globe from "@/components/ui/globe";
import {
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaDatabase,
  FaFilePdf,
  FaGithub,
  FaGoogle,
  FaImage,
  FaLink,
  FaMicrophone,
  FaXTwitter,
} from "react-icons/fa6";
import runCode from "@/components/code/run";
import Footer from "@/components/footer";
import "@/styles/landing.css";
import { FlipWords } from "@/components/ui/flip-words";
import { SparklesCore } from "@/components/ui/sparkles";
import CheckItem from "@/components/checkItem";
import { RiRobot2Fill } from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import { MdCode, MdDataObject } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
  IconSquareRoundedCheckFilled,
  IconLocationBolt,
  IconDatabase,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Offer, Plans } from "./pricing/page";

const words = ["multimodal", "reliable", "unique", "interactive"];

const features = [
  {
    title: "Built for developers",
    description:
      "Built for engineers, developers, dreamers, thinkers and doers.",
    icon: <IconTerminal2 />,
  },
  {
    title: "Ease of use",
    description:
      "Just send inputs to your AI agent, much easier than sending a fetch request",
    icon: <IconEaseInOut />,
  },
  {
    title: "LLM Output validation",
    description:
      "Built-in validation for JSON object generation with retries and error handling",
    icon: <IconSquareRoundedCheckFilled />,
  },
  {
    title: "Real-time streaming",
    description: "Stream text & voice responses as they're being generated",
    icon: <IconLocationBolt />,
  },
  {
    title: "Affordable",
    description:
      "Introduces $0 to your LLMs costs. Only pay for extra useful features",
    icon: <IconCurrencyDollar />,
  },
  {
    title: "Host anywhere",
    description:
      "Host your own Scoopika endpoint on your favorite cloud. memory & knowledge stores are on us ;)",
    icon: <IconCloud />,
  },
  {
    title: "Managed memory",
    description:
      "No more need to manage conversations with AI and store messages yourself, we got you covered!",
    icon: <IconDatabase />,
  },
  {
    title: "Open source",
    description:
      "Proudly open source for you and every builder to develop and use with freedom",
    icon: <IconHeart />,
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#717171] dark:from-[#51515151] to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#717171] dark:from-[#51515151] to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-white transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default async function Home() {
  return (
    <div className="bg-foreground text-background dark:bg-background dark:text-foreground">
      {/* <div className="soptheader">
        <div className="spotlight">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> */}
      <Navbar session={null} active="Home" className="dark" />

      <div className="relative w-full flex flex-col p-8 pt-20 md:p-12 overflow-hidden rounded-md dark min-h-screen">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1}
            particleDensity={50}
            className="w-full h-full opacity-80"
            particleColor="#919191"
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-12 lg:pl-20 lg:pr-20">
          <div className="w-full">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold w-full text-start">
                Build{" "}
                <span className="moving-gradient">
                  <FlipWords
                    duration={2000}
                    words={words}
                    className="text-black dark:text-black"
                  />
                </span>{" "}
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold w-full text-start mt-3">
                LLM-powered apps
              </h1>
              <h1
                style={{
                  textShadow: "3px 3px 0px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold w-full text-start mt-3 opacity-70"
              >
                10x faster
              </h1>
            </div>
            <p className="opacity-80 text-xs md:text-sm lg:text-base mt-8">
              Open-source platform providing all the tools needed to build
              multimodal AI-powered applications utilizing LLMs and AI agents,
              perfect for creating AI chat interfaces and data extraction.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mt-8">
              <Button
                color="primary"
                size="md"
                as={Link}
                href="https://app.scoopika.com/login"
                className="font-semibold"
                style={{
                  boxShadow: "0px 5px 15px 5px rgba(255, 255, 255, .1)",
                }}
                endContent={<FaChevronRight size={14} />}
              >
                Start for free
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-2 text-xs opacity-70">
              <CheckItem title="Connect your LLMs providers" />
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-4">
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-white/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  flex flex-col items-center justify-center gap-3">
                <CardItem>
                  <div className="p-3 flex gap-3 border rounded-xl w-full backdrop-blur bg-accent/20 hover:border-white/20 hover:scale-105 transition-all">
                    <div className="w-10 h-10 p-2">
                      <RiRobot2Fill />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">AI agents</div>
                      <div className="text-xs opacity-70">
                        Create multimodal AI agents that can interact with your
                        data & APIs and generate voice responses in real-time
                      </div>
                    </div>
                  </div>
                </CardItem>
                <CardItem className="w-2 h-2 border rounded-full">
                  <div></div>
                </CardItem>
                <CardItem className="p-3 flex gap-3 border rounded-xl w-full backdrop-blur bg-accent/20 hover:border-white/20 hover:scale-105 transition-all">
                  <div className="w-10 h-10 p-2">
                    <MdDataObject />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Structured data generation
                    </div>
                    <div className="text-xs opacity-70">
                      Generate validated JSON based on any schema from multiple
                      data sources including text, images, audio, and URLs.
                    </div>
                  </div>
                </CardItem>
                <div className="flex flex-col gap-1">
                  <CardItem>
                    <div className="w-2 h-2 border rounded-full"></div>
                  </CardItem>
                </div>
                <div className="p-3 flex gap-3 border rounded-xl w-full backdrop-blur bg-accent/20 hover:border-white/20 hover:scale-105 transition-all">
                  <div className="w-10 h-10 p-2">
                    <FaDatabase />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Long-term memory
                    </div>
                    <div className="text-xs opacity-70">
                      No more need to manage conversations history, we did it
                      for you with managed Serverless encrypted memory stores
                    </div>
                  </div>
                </div>
                <div className="p-3 flex gap-3 border rounded-xl w-full backdrop-blur bg-accent/20 hover:border-white/20 hover:scale-105 transition-all">
                  <div className="w-10 h-10 p-2">
                    <IoLibrary />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Knowledge stores
                    </div>
                    <div className="text-xs opacity-70">
                      Expand your AI agents knowledge by uploading files or
                      websites to Serverless knowledge stores served edge-close
                      to users
                    </div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-12 lg:pl-20 lg:pr-20 min-h-max">
          <Link
            href="/lost-in-the-galaxy"
            className="border rounded-xl bg-accent/20 p-6"
          >
            <div className="text-xs max-w-max border border-violet-400 bg-violet-400/5 p-0.5 pl-2 pr-2 rounded-full mb-4">
              Live now
            </div>
            <div>Lost in the galaxy</div>
            <div className="text-sm opacity-70">
              40-days event building open source AI products in public using
              Scoopika
            </div>
            <div className="text-sm mt-4 flex items-center gap-2">
              Join us
              <FaChevronRight />
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-12 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="w-full flex items-center">
              <h2
                style={{
                  textShadow: "10px 5px 35px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl w-full text-start w-full"
              >
                Simple Process
              </h2>
              <div
                className="w-5 h-5 rounded-full blur-2xl"
                style={{
                  boxShadow: "0px 5px 200px 120px rgba(255, 255, 255, .05)",
                }}
              ></div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex gap-10">
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl bg-accent/10 flex items-center justify-center gap-2 overflow-hidden group">
                <img
                  src="https://fireworks.ai/images/fireworks-logos/apple-touch-icon.png"
                  className="w-12 h-12 p-2 border rounded-xl bg-accent/20 group-hover:border-purple-600 transitiona-all duration-500"
                />
                <img
                  src="https://static.vecteezy.com/system/resources/previews/022/227/364/original/openai-chatgpt-logo-icon-free-png.png"
                  className="w-16 h-16 p-3 border rounded-xl bg-accent/20 group-hover:border-green-400 transitiona-all duration-300"
                />
                <img
                  src="https://cdn-1.webcatalog.io/catalog/together-ai/together-ai-social-preview.png?v=1714781863270"
                  className="w-12 h-12 p-2 border rounded-xl bg-accent/20 object-cover group-hover:border-white transitiona-all duration-500"
                />
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">00. Connect your provider</div>
                <div className="text-sm opacity-70">
                  Safely connect your LLM provider that will power your app from
                  the platform or your code in seconds
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl bg-accent/10 flex items-center justify-center gap-2 overflow-hidden">
                <div className="p-1 pl-2 pr-2 text-sm border-violet-500 bg-violet-500/5 border rounded-xl text-violet-400" />
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="p-1 pl-2 pr-2 text-sm border-violet-500 bg-violet-500/5 border rounded-xl text-violet-400 max-w-max" />

                  <div
                    className="p-2 pl-4 pr-4 text-sm border-violet-500 bg-violet-500/5 border rounded-xl text-violet-400"
                    style={{
                      boxShadow: "0px 0px 100px 0px #8b5cf6",
                    }}
                  >
                    Create AI agent
                  </div>
                  <div className="p-1 pl-2 pr-2 text-sm border-violet-500 bg-violet-500/5 border rounded-xl text-violet-400 max-w-max" />
                </div>

                <div className="p-1 pl-2 pr-2 text-sm border-violet-500 bg-violet-500/5 border rounded-xl text-violet-400" />
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">01. Create AI bot/agent</div>
                <div className="text-sm opacity-70">
                  AI agents can be used to build automation apps, AI
                  conversational bots (text & voice), or for data extraction
                  tasks.
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl bg-accent/10 overflow-hidden p-4 group">
                <div className="relative text-xs opacity-70 transition-all group-hover:-translate-y-24">
                  <pre>{runCode}</pre>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">02. Build</div>
                <div className="text-sm opacity-70">
                  Use the agent in your app or deploy a Scoopika endpoint in
                  seconds with your favorite cloud hosting service.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-12 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="w-full flex items-center">
              <h2
                style={{
                  textShadow: "10px 5px 35px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl w-full text-start w-full"
              >
                Features that matter
              </h2>
              <div
                className="w-5 h-5 rounded-full blur-2xl opacity-20"
                style={{
                  boxShadow: "0px 5px 200px 120px #8b5cf6",
                }}
              ></div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 flex gap-10">
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl bg-accent/10 flex flex-col items-center justify-center gap-2 overflow-hidden group p-4">
                <div className="w-full p-2 flex items-center gap-3 border rounded-xl hover:bg-violet-400/5 transition-all cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center border border-violet-400 bg-violet-400/5 rounded-lg">
                    <MdCode />
                  </div>
                  <div className="truncate">
                    <div className="text-xs">Functions</div>
                    <div className="text-xs opacity-70 truncate">
                      Custom function from your code
                    </div>
                  </div>
                </div>
                <div className="w-full p-2 flex items-center gap-3 border rounded-xl hover:bg-violet-400/5 transition-all cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center border border-violet-400 bg-violet-400/5 rounded-lg">
                    <FaGoogle />
                  </div>
                  <div>
                    <div className="text-xs">Google</div>
                    <div className="text-xs opacity-70 truncate">
                      Search google for resutls
                    </div>
                  </div>
                </div>
                <div className="w-full p-2 flex items-center gap-3 border rounded-xl hover:bg-violet-400/5 transition-all cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center border border-violet-400 bg-violet-400/5 rounded-lg">
                    <AiFillApi />
                  </div>
                  <div>
                    <div className="text-xs">Your API</div>
                    <div className="text-xs opacity-70 truncate">
                      Connect any API you want
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">APIs & Tools</div>
                <div className="text-sm opacity-70">
                  Equip your AI agents with APIs and tools they can use to fetch
                  data or perform actions based on context
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl backdrop-blur p-6 group">
              <div className="w-full h-48 border rounded-xl overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center gap-1 relative p-2">
                  <div className="w-6 h-20 bg-white rounded-xl transition-all group-hover:h-14"></div>
                  <div className="w-6 h-10 bg-white rounded-xl transition-all group-hover:h-20"></div>
                  <div className="w-6 h-16 bg-white rounded-xl transition-all group-hover:h-10"></div>
                  <div className="w-6 h-14 bg-white rounded-xl transition-all group-hover:h-16"></div>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">Voice interaction</div>
                <div className="text-sm opacity-70">
                  Accept voice inputs, process multiple audio files in parallel,
                  and stream voice responses in under 300ms
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6 group">
              <div className="w-full h-48 border rounded-xl bg-accent/10 overflow-hidden p-4 flex flex-col items-center justify-center gap-2">
                <div className="p-3 border rounded-xl flex items-center gap-3 transition-all">
                  <FaFilePdf />
                  <FaLink />
                </div>
                <FaChevronDown size={11} className="transition-all" />
                <div className="p-2 pl-3 pr-3 border rounded-xl flex items-center text-xs transition-all">
                  Clean data & store embeddings
                </div>
                <FaChevronDown
                  size={11}
                  className="h-0 opacity-0 scale-0 group-hover:h-max group-hover:opacity-100 group-hover:scale-100 transition-all"
                />
                <div className="h-0 p-2 pl-3 pr-3 border rounded-xl flex items-center text-xs opacity-0 scale-0 group-hover:h-max group-hover:opacity-100 group-hover:scale-100 transition-all">
                  Served on the edge to your agents
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">Knowledge Stores</div>
                <div className="text-sm opacity-70">
                  Upload files, PDFs, or websites to knowledge stores to expand
                  your AI agents knowledge
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-center md:h-[25rem] gap-10">
            <div className="w-full h-full border rounded-xl bg-accent/20 backdrop-blur p-6 flex flex-col group">
              <div className="flex flex-col gap-5 w-full">
                <div>
                  <div className="text-xs mb-2 opacity-80">Speed</div>
                  <div className="w-full border border-violet-300/50 rounded-full p-1 flex items-center justify-end pr-36 group-hover:pr-2 transition-all duration-1000">
                    <div className="p-2 rounded-r-full rounded-l-lg bg-gradient-to-r from-transparent to-violet-500 w-12 group-hover:w-24 transition-all duration-1000"></div>
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-2 opacity-80">Security</div>
                  <div className="w-full border border-violet-300/50 rounded-full p-1 flex items-center justify-end pr-24 group-hover:pr-2 transition-all duration-1000">
                    <div className="p-2 rounded-r-full rounded-l-lg bg-gradient-to-r from-transparent to-violet-500 w-12 group-hover:w-24 transition-all duration-1000"></div>
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-2 opacity-80">Accuracy</div>
                  <div className="w-full border border-violet-300/50 rounded-full p-1 flex items-center justify-end pr-48 group-hover:pr-4 transition-all duration-1000">
                    <div className="p-2 rounded-r-full rounded-l-lg bg-gradient-to-r from-transparent to-violet-500 w-12 group-hover:w-24 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
              <div className="h-full"></div>
              <div className="text-2xl mt-8">Fast & Reliable</div>
              <div className="opacity-70 text-sm mt-3">
                Scoopika is optimized for performance and real-time interactive
                applications, with built-in streaming, memory encryption, LLM
                output validation, and smart errors recovery
              </div>
            </div>
            <div className="w-full h-[20rem] md:h-full border rounded-xl bg-accent/20 backdrop-blur p-6 relative overflow-hidden group">
              <Globe className="absolute -right-8 -bottom-72 opacity-35" />
              <div className="w-full h-full absolute z-10 p-10 transition-all group-hover:bg-background/60 top-0 left-0">
                <div className="text-3xl">Scale globally</div>
                <div className="max-w-[90%] mt-6">
                  Built to effortlessly scale on your own rules. Both knowledge
                  & memory stores are scalable and served edge-close to your
                  users from 26 regions across the globe
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 flex gap-10">
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6 group">
              <div className="w-full h-48 border rounded-xl bg-accent/10 flex items-center justify-center gap-2 overflow-hidden p-4">
                <div className="w-20 h-20 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-14 group-hover:h-14">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
                <div className="w-14 h-14 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-10 group-hover:h-10">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
                <div className="w-10 h-10 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-20 group-hover:h-20">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">Vision</div>
                <div className="text-sm opacity-70">
                  Just simply use a LLM that supports vision and send your
                  images as inputs without any additional setup
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl overflow-hidden group relative">
                <div className="absolute bottom-0 left-0 w-full bg-background p-2 z-20">
                  <div className="flex items-center gap-3 border rounded-lg p-2 bg-background pl-3 pr-3">
                    <FaLink className="opacity-50 min-w-max" size={13} />
                    <FaImage className="opacity-50 min-w-max" size={13} />
                    <div className="w-full text-xs opacity-50">
                      Your message...
                    </div>
                    <FaMicrophone className="opacity-50" size={13} />
                  </div>
                </div>
                <div className="flex flex-col gap-10 items-center justify-center p-4 group-hover:-translate-y-20 transition-all">
                  <div className="flex items-center w-full justify-end">
                    <div>
                      <div className="text-xs text-violet-300">You</div>
                      <div className="text-xs opacity-80">
                        Is Scoopika a paid platform?
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full">
                    <div>
                      <div className="text-xs text-violet-300">
                        AI Assistant
                      </div>
                      <div className="text-xs opacity-80">
                        Based on the knowledge I have
                        <br />
                        <br />
                        Scoopika has a free-forever plan so you can use its core
                        features on your servers totally for free, but it
                        provides paid options with more features like long-term
                        memory and knowledge stores
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">Playground</div>
                <div className="text-sm opacity-70">
                  AI agents can be used to build automation apps, AI
                  conversational bots (text & voice), or for data extraction
                  tasks.
                </div>
              </div>
            </div>
            <div className="h-full border rounded-xl bg-accent/20 backdrop-blur p-6">
              <div className="w-full h-48 border rounded-xl bg-accent/10 overflow-hidden p-4 group flex flex-col items-center justify-center gap-2">
                <div className="p-3 border rounded-xl flex items-center gap-3 transition-all">
                  <FaMicrophone />
                  <FaImage />
                  <FaFilePdf />
                  <FaLink />
                </div>
                <FaChevronDown size={11} className="transition-all" />
                <div className="p-2 pl-3 pr-3 border rounded-xl flex items-center text-xs transition-all">
                  Validated JSON data
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg mb-3">Data Extraction</div>
                <div className="text-sm opacity-70">
                  Extract data from multiple data sources and generate a
                  validated JSON object based on any data schema
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-12 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="w-full flex items-center">
              <h2
                style={{
                  textShadow: "10px 5px 35px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl w-full text-start w-full"
              >
                Why Scoopika?
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-5 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="flex items-center gap-3 text-3xl md:text-4xl">
              Use cases
            </div>
            <div className="text-sm lg:text-base opacity-70 mt-6">
              With Scoopika you can build any AI application that can be built
              with the OpenAI SDK, now 10 times faster, more reliable, with
              multimodal inputs.
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <CheckItem title="Custom AI assistants for your website" />
              <CheckItem title="Multimodal AI-powered search engine" />
              <CheckItem title="Rabbit R1 (but the real software)" />
            </div>
          </div>
          <div className="w-full flex items-center justify-end"></div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-5 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div
              className="flex items-center gap-3 text-3xl md:text-4xl mb-3 text-red-500"
              style={{
                textShadow: "0px 0px 5px #ef4444",
              }}
            >
              <IoMdClose className="" /> No code
            </div>
            <div
              className="flex items-center gap-3 text-3xl md:text-4xl"
              style={{
                textShadow: "0px 0px 5px rgba(255, 255, 255, .5)",
              }}
            >
              <FaCheck className="" /> Clean code
            </div>
            <div className="text-sm lg:text-base opacity-70 mt-6">
              Built from the ground to be easily integrated in web applications,
              with simple APIs, full type-safety, and easy error handling
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <CheckItem title="Works with any web framework, React, and NextJS" />
              <CheckItem title="Streaming made easy with hooks" />
              <CheckItem title="Deploy a Scoopika endpoint with 3 lines of code" />
            </div>
          </div>
          <div className="w-full flex items-center justify-end">
            <img src="/images/scoopika-ts-img3.png" width="440px" />
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-5 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="w-full flex items-center">
              <h2
                style={{
                  textShadow: "10px 5px 35px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl w-full text-start w-full"
              >
                SDKs & Community
              </h2>
              <div
                className="w-5 h-5 rounded-full blur-2xl opacity-20"
                style={{
                  boxShadow: "0px 5px 200px 120px #8b5cf6",
                }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex gap-4 mt-8">
            <Link
              href="https://docs.scoopika.com/packages/ts/scoopika"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 hover:scale-105 h-48 border"
            >
              <div className="mb-2 text-lg">@scoopika/scoopika</div>
              <div className="text-sm opacity-70 mb-4">
                Run agents on the server-side & deploy a HTTP based Scoopika API
                endpoint with streaming support
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <Link
              href="https://docs.scoopika.com/packages/ts/client"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 hover:scale-105 h-48 border"
            >
              <div className="mb-2 text-lg">@scoopika/client</div>
              <div className="text-sm opacity-70 mb-4">
                Run agents on the client-side with built-in support for
                real-time streaming and client-side actions
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <Link
              href="https://docs.scoopika.com/packages/ts/react"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 border hover:scale-105 h-48"
            >
              <div className="mb-2 text-lg">@scoopika/react</div>
              <div className="text-sm opacity-70 mb-4">
                Building blocks to use Scoopika in React projects with built-in
                state management. Scoopika playground was built using this
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48"></div>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48 hidden md:flex"></div>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48 hidden md:flex"></div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
            <Link
              href="https://github.com/scoopika"
              target="_blank"
              className="h-72 p-6 bg-accent/30 rounded-3xl flex flex-col items-center transition-all hover:bg-accent/40 relative w-full border"
            >
              <FaGithub size={50} className="mt-10" />
              <FaGithub
                size={150}
                className="absolute opacity-5 w-full h-full p-10"
              />
              <div className="mb-2 mt-4">Github</div>
              <div className="text-sm opacity-80 text-center">
                You can see all parts of Scoopika that have been developed as
                open source (90% of Scoopika)
              </div>
            </Link>
            <Link
              href="https://x.com/scoopika_"
              target="_blank"
              className="h-72 p-6 bg-accent/30 rounded-3xl flex flex-col items-center transition-all hover:bg-accent/40 relative w-full border"
            >
              <FaXTwitter size={50} className="mt-10" />
              <FaXTwitter
                size={150}
                className="absolute opacity-5 w-full h-full p-10"
              />
              <div className="mb-2 mt-4">X (Twitter)</div>
              <div className="text-sm opacity-80 text-center">
                Follow us to stay up to date with our latest news and updates
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-12 lg:pl-20 lg:pr-20 min-h-max">
          <div className="w-full">
            <div className="w-full flex items-center">
              <h2
                style={{
                  textShadow: "10px 5px 35px rgba(255, 255, 255, .2)",
                }}
                className="text-3xl md:text-4xl lg:text-5xl w-full text-start w-full"
              >
                Pricing
              </h2>
              <div
                className="w-5 h-5 rounded-full blur-2xl opacity-20"
                style={{
                  boxShadow: "0px 5px 200px 120px #8b5cf6",
                }}
              ></div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:h-[30rem]">
            <Plans />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10">
            <Offer />
          </div>
          <div className="w-full flex items-center justify-center">
            <Button as={Link} href="/pricing" size="sm" variant="light" radius="full" className="border-1" endContent={<FaChevronRight />}>
              Learn more about pricing
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full p-8 pt-20 md:p-12 md:pt-36 dark min-h-max">
        <div className="w-full flex flex-col gap-5 lg:pl-20 lg:pr-20 min-h-max mb-24">
          <TextGenerateEffect words="Let's start building right now! Scoopika introduces $0 extra costs to your LLM provider's costs. Only pay for optional features that deserve paying for" />
          <Button
            color="primary"
            size="lg"
            as={Link}
            href="https://app.scoopika.com/login"
            className="font-semibold max-w-max"
            style={{
              boxShadow: "0px 5px 15px 5px rgba(255, 255, 255, .1)",
            }}
            endContent={<FaChevronRight size={14} />}
          >
            Start building
          </Button>
        </div>
      </div>

      <Footer className="dark" />
    </div>
  );
}
