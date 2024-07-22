import { authOptions } from "@/lib/auth";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import CheckItem from "@/components/checkItem";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaBrain,
  FaDatabase,
} from "react-icons/fa6";
import { RiRobot2Fill, RiVoiceprintLine } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineStream } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { UpgradeButton } from "@/components/main/upgradeButton";
import AboutFeatureDialog from "@/components/main/aboutFeature";
import aboutFeatures from "@/scripts/aboutFeatures";
import { Metadata } from "next";
import GridSmallBackground from "@/components/backgrounds/grid";
import ScrollArrow from "@/components/landing/scrollArrow";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface Feature {
  id?: string;
  title: string;
  description: string;
  free: string;
  basic: string;
  scale: string;
  icon?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start for free with Scoopika ",
};

const Cell = ({ feature }: { feature: Feature }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center border-1 border-t-0 md:h-36">
      <div className="w-full p-3 md:border-r-1 flex flex-col gap-2 h-full justify-center">
        {feature.icon && feature.icon}
        <div className="font-semibold text-sm flex items-center gap-2">
          {feature.title}
          {feature.id && (
            <AboutFeatureDialog
              name={feature.title}
              info={aboutFeatures[feature.id as any] || ""}
            />
          )}
        </div>
        <div className="text-xs opacity-80">{feature.description}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center md:border-r-1 h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Free: </div>
        <div>{feature.free}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center md:border-r-1 h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Basic: </div>
        <div>{feature.basic}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Scale: </div>
        <div>{feature.scale}</div>
      </div>
    </div>
  );
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const mainFeatures = {
    free: [
      {
        text: "Personalized AI agents",
        icon: <RiRobot2Fill size={16} />,
      },
      {
        text: "Unlimited text runs",
        icon: <FaCirclePlay size={16} />,
      },
      {
        text: "Real-time streaming",
        icon: <MdOutlineStream size={16} />,
      },
    ],
    basic: [
      {
        text: "Agents can speak and listen",
        icon: <MdVolumeUp />,
      },
      {
        text: "Persistent chat sessions",
        icon: <FaDatabase />,
      },
      {
        text: "Custom knowledge sources",
        icon: <FaBrain />,
      },
    ],
    scale: [
      {
        text: "Higher volumes for storage and audio",
        icon: <IoAnalytics />,
      },
      {
        text: "Faster speech generation",
        icon: <RiVoiceprintLine />,
      },
      {
        text: "Scale to millions globally",
        icon: <AiOutlineGlobal />,
      },
    ],
  };

  const features: Feature[] = [
    {
      title: "Created agents",
      description: "The number of agents you can create",
      free: "2",
      basic: "10",
      scale: "10",
    },
    {
      title: "Multi-agent boxes",
      description: "The number of boxes you can create",
      free: "1",
      basic: "4",
      scale: "4",
    },
    {
      id: "tools",
      title: "Tools per Agent",
      description: "The number of tools you can add to an agent",
      free: "3 API tools & Unlimited functions",
      basic: "Unlimited",
      scale: "Unlimited",
    },
    {
      id: "loads",
      title: "Loads",
      description:
        "Each time your application loads an agent data from the platform (once every ~15 minutes when using the Scoopika endpoint)",
      free: "5K / month",
      basic: "200K / month",
      scale: "1M / month",
    },
    {
      id: "store",
      title: "Memory",
      description: "Chat sessions with users (messages history or memory)",
      free: "In-memory store (not persistent)",
      basic: "Serverless managed memory (1 region)",
      scale: "Serverless managed memory (replicated to 4 regions)",
    },
    {
      id: "store_read",
      title: "History store reads",
      description:
        "Each time you read a session info or messages from the serverless store (4Kb = 1 operation)",
      free: "---",
      basic: "1M / month",
      scale: "4M / month",
    },
    {
      id: "store_write",
      title: "History store writes",
      description:
        "Each time you new session is created or an agent is executed with history enabled to save the chat messages (1Kb = 1 operation)",
      free: "---",
      basic: "500K / month",
      scale: "2M / month",
    },
    {
      id: "speech",
      title: "Speech Characters",
      description: "When using the agent speech (agent audio response)",
      free: "50 / month",
      basic: "100K / month",
      scale: "1.2M / month",
    },
    {
      id: "knowledge",
      title: "Knowledge requests",
      description:
        "If using custom knowledge, with each run we feth info relevant data from a vector database using RAG (this is cached and cache doesn't count to usage)",
      free: "---",
      basic: "300K / month",
      scale: "1.5M / month",
    },
    {
      title: "Image inputs",
      description: "Supported only with LLMs that support vision",
      free: "Unlimited",
      basic: "Unlimited",
      scale: "Unlimited",
    },
    {
      id: "listen",
      title: "Audio inputs",
      description:
        "You can input audio into your agent runs. fast is 2s average latency & slow is ~10s. If limit for fast processing is reached it falls back to slow mode till next month",
      free: "Unlimited slow",
      basic: "500mins fast & unlimited slow",
      scale: "1000mins fast & unlimited slow",
    },
  ];

  const faqs: { title: string; description: string }[] = [
    {
      title: "What can I do with the free plan?",
      description:
        " You can create 2 AI agents, and access all the base features of Scoopika from LLM output validation, to external tools and real-time streaming hooks. Scoopika runs on your servers so you get unlimited runs (requests), though any conversations with the agent won't be persistent and will use an in-memory history. the free plan gives you a good advantage to add a reliable AI assistant to your app with text-based communication",
    },
    {
      title: "What can I do with the basic plan?",
      description:
        "You can create multiple AI agents, and use them with unlimited API tools & custom functions, with voice-based communication, custom knowledge sources, and long-term memory.",
    },
    {
      title: "What can I do with the scale plan?",
      description:
        "The scale plan has the same features as the basic plan, but with higher limits on everything. it's meant for applications with high traffics",
    },
    {
      title: "How LLM costs are handled?",
      description:
        "Scoopika does not handle LLM costs for you. you'll pass your API keys for the LLM providers you're using from your code. all keys are kept safe on your servers and are never shared with us unless you add them to your Scoopika account so they are used across your apps (optional).",
    },
    {
      title: "Can I cancel my plan at anytime?",
      description:
        "Yes, you can cancel your plan at anytime. Once you cancel a plan It won't be renewed in the next month unless you resume it.",
    },
    {
      title: "How history sessions are stored in the Basic & Scale plan?",
      description:
        "In the paid plans you can create a Serverless managed memory store and pass its ID to your scoopika setup and it will be used for persistent chat sessions.",
    },
    {
      title: "What happens once my limit is reached?",
      description:
        "Only the feature that you reached the limit for will stop working. for example, if you reach the limit for the speech characters, your agents will keep working with text-based communication until the next month. another example is that you reached the limit for the knowledge requests, also your agents will keep working but without access to the custom knowledge until the next month.",
    },
    {
      title: "When does my plan renew?",
      description:
        "Your plan renews based on when you subscribed to it (billing cycle). though notice that the available resources or limits are reset once every month (on 1st). so even if you subscrib on 29th of May, your resources will get renewed on 1st of June.",
    },
    {
      title: "Need help or higher limits?",
      description:
        "Feel free to contact us on team@scoopika.com whenever you want. we're always here to help!",
    },
  ];

  return (
    <>
      <Navbar session={session} active="Pricing" />
      <div className="w-full">
        <div className="w-full flex flex-col justify-center">
          <AuroraBackground>
            <GridSmallBackground className="w-full flex flex-col items-center pt-24 md:pt-36 lg:pt-56 min-h-screen">
              <div
                style={{
                  textShadow: "0px 2px 15px rgba(255, 255, 255, .5)",
                }}
                className="flex items-center gap-2 text-sm mb-4 font-semibold"
              >
                Pricing
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-5xl mb-4 text-center">
                Start building AI apps today
                <br />
                scale effortlessly
              </h1>

              <p className="text-sm lg:text-base opacity-80 mt-4 text-center mb-12">
                Open source. Free to use. Pay only for premium features.
              </p>

              <ScrollArrow />
            </GridSmallBackground>
          </AuroraBackground>

          <div className="w-full flex flex-col items-center min-h-max pt-24" id="pricing">
            <div className="w-[90%] flex flex-col md:flex-row md:items-center gap-3 md:h-[30rem]">
              <div className="w-full bg-accent/20 border rounded-2xl p-6 h-full flex flex-col">
                <div className="text-sm font-semibold">Personal</div>
                <div className="text-xs opacity-80 mt-2">
                  For individuals who wants to start building LLM-powered
                  applications
                </div>
                <div className="mt-6 text-2xl font-semibold">Free</div>
                <div className="h-full"></div>
                <div className="mt-4 flex flex-col justify-end gap-4">
                  <CheckItem
                    title="Unlimited AI agents runs"
                    className="w-full"
                  />
                  <CheckItem
                    title="Connect your LLMs providers"
                    className="w-full"
                  />
                  <CheckItem
                    title="Add tools to agents"
                    className="w-full"
                  />
                  <CheckItem
                    title="Real-time streaming"
                    className="w-full"
                  />
                  <CheckItem
                    title="LLM output validation"
                    className="w-full"
                  />
                  <CheckItem
                    title="Full type-safety"
                    className="w-full"
                  />
                  <CheckItem
                    title="Smart error recovery"
                    className="w-full"
                  />
                  <CheckItem
                    title="Temporary memory"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full bg-accent/20 border rounded-2xl p-6 h-full flex flex-col">
                <div className="text-sm font-semibold">Basic</div>
                <div className="text-xs opacity-80 mt-2">
                  To scale your LLM app, have long-term memory, and expand AI agents knowledge
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <div className="text-2xl font-semibold">$16</div>
                  <div className="opacity-70 text-sm">/month</div>
                </div>
                <div className="h-full"></div>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-xs opacity-70">
                    Everything in the free plan, plus:
                  </div>
                  <CheckItem
                    title="Serverless managed long-term memory"
                    className="w-full"
                  />
                  <CheckItem
                    title="Expand agents knowledge from files & websites"
                    className="w-full"
                  />
                  <CheckItem
                    title="Real-time voice responses"
                    className="w-full"
                  />
                  <CheckItem
                    title="Higher rate limits"
                    className="w-full"
                  />
                  <CheckItem
                    title="Faster audio files processing"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full bg-accent/20 border rounded-2xl p-6 h-full flex flex-col">
                <div className="text-sm font-semibold">Scale</div>
                <div className="text-xs opacity-80 mt-2">
                  For scaling teams that requires higher rate limits, requests, and volumes
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <div className="text-2xl font-semibold">$56</div>
                  <div className="opacity-70 text-sm">/month</div>
                </div>
                <div className="h-full"></div>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-xs opacity-70">
                    Everything in the Basic plan, plus:
                  </div>
                  <CheckItem
                    title="Higher memory storage & requests"
                    className="w-full"
                  />
                  <CheckItem
                    title="Higher knowledge monthly requests"
                    className="w-full"
                  />
                  <CheckItem
                    title="More voice responses characters"
                    className="w-full"
                  />
                  <CheckItem
                    title="Even higher rate limits (almost none)"
                    className="w-full"
                  />
                  <CheckItem
                    title="Direct support and assistant"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center lg:p-12 mt-48">
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            {"Let's"} break it down
          </div>
          <div className="w-full p-6">
            <div className="w-full border-1 border-b-1 flex flex-col lg:flex-row">
              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full border-r-1 border-t-1">
                  <h3 className="font-semibold mb-4">Hobby - Free</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Get started with:
                  </div>
                  {mainFeatures["free"].map((feature, index) => (
                    <div
                      key={`mainhobbyfeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                  <Button
                    size="sm"
                    color="secondary"
                    className="font-semibold mt-4"
                    as={Link}
                    href="/login"
                  >
                    Get started
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full border-r-1 border-t-1">
                  <h3 className="font-semibold mb-4">Basic - $16/month</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Everything in Hobby, plus:
                  </div>
                  {mainFeatures["basic"].map((feature, index) => (
                    <div
                      key={`mainbasicfeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                  {session ? (
                    <UpgradeButton
                      size="sm"
                      className="mt-4 bg-transparent border-1 border-foreground text-foreground"
                      type="basic"
                    />
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      className="mt-4 bg-transparent border-1 border-foreground text-foreground"
                      as={Link}
                      href="/login?callback=pricing"
                    >
                      Get started
                    </Button>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full bg-accent/30 border-t-1">
                  <h3 className="font-semibold mb-4">Scale - $56/month</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Everything in Basic, plus:
                  </div>
                  {mainFeatures["scale"].map((feature, index) => (
                    <div
                      key={`mainscalefeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                  {session ? (
                    <UpgradeButton size="sm" className="mt-4" type="scale" />
                  ) : (
                    <Button
                      size="sm"
                      color="primary"
                      as={Link}
                      href="/login?callback=pricing"
                    >
                      Get started
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-2 border-r-1 border-l-1 border-b-1"></div>

            <div className="border-r-1 border-l-1 border-b-1 flex items-center hidden md:flex">
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Features
              </div>
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Hobby
              </div>
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Basic
              </div>
              <div className="p-4 w-full font-semibold md:text-center">
                Scale
              </div>
            </div>

            {features.map((feature, index) => (
              <Cell key={`featurerow-${index}`} feature={feature} />
            ))}
          </div>
        </div>

        <div className="lg:p-16">
          <Accordion type="single" collapsible>
            {faqs.map((f, index) => (
              <AccordionItem
                key={`pricingfaq-${index}`}
                value={`faqitem-${index}`}
              >
                <AccordionTrigger>{f.title}</AccordionTrigger>
                <AccordionContent>{f.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
