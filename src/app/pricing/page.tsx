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

export default async function Page() {
  const session = await getServerSession(authOptions);

  const freeFeatures: string[] = [
    "Create one AI agent",
    "Run on your servers with unlimited access",
    "LLM Output validation and auto healing",
    "Connect agents with exeternal tools & functions",
    "Real-time streaming hooks",
    "Plug custom knowledge data to runs",
    "In-memory history sessions (not persistent)",
  ];
  const proFeatures: string[] = [
    "Create up to 10 agents",
    "Create up to 4 multi-agent smart boxes",
    "Persistent history with a Serverless database",
    "AI-powered errors reports (coming soon)",
    "Email support",
    "Early access to new features",
  ];

  const faqs: { title: string; description: string }[] = [
    {
      title: "What can I do with the free plan?",
      description:
        " You can create one AI agent, and access all the base features of Scoopika from LLM output validation, to external tools and real-time streaming hooks. Scoopika runs on your servers so you get unlimited runs (requests), though any conversations with the agent won't be persistent and will use an in-memory history.",
    },
    {
      title: "How LLM costs are handled?",
      description:
        "Scoopika does not handle LLM costs for you. you'll pass your API keys for the LLM providers you're using from your code. all keys are kept safe on your servers and are never shared with us.",
    },
    {
      title: "Can I cancel my plan at anytime?",
      description:
        "Yes, you can cancel your plan at anytime. Once you cancel a plan It won't be renewed in the next month unless you resume it.",
    },
    {
      title: "How history sessions are stored in the Pro plan?",
      description:
        "In the Pro plan you can deploy a Serverless managed data store with zero setup. after the deployment is successful you can just copy its url and add it to your Scoopika instance, and you're good.",
    },
  ];

  return (
    <>
      <Navbar session={session} active="Pricing" />
      <div className="w-full pt-16">
        <div className="w-full flex flex-col items-center p-12">
          <h1 className="text-3xl font-semibold mb-3">
            Pricing designed for developers
          </h1>

          <p className="text-sm font-semibold opacity-80 mb-12">
            Start building for free. Pay only for extra features
          </p>

          <div className="w-full flex flex-col justify-center lg:flex-row min-h-max gap-12 min-w-[80%] md:max-w-[80%] bg-accent/30 p-4 rounded-lg rounded-tr-3xl rounded-bl-3xl border-1 border-black/20 dark:border-white/20">
            <div className="h-full p-4 min-w-96">
              <h3 className="text-lg font-semibold mb-2">FREE</h3>
              <p className="text-sm opacity-80 mb-5">
                Add an AI agent to your application
                <br /> with validation, tools, and auto healing
              </p>

              <Button
                size="sm"
                color="primary"
                as={Link}
                href="/app"
                className="w-full font-semibold mb-10"
              >
                Get started for free
              </Button>

              <div className="flex items-center gap-1 mb-10">
                <h4 className="text-xl font-semibold">$0</h4>
                <p className="text-sm opacity-80">/ month</p>
              </div>

              <div className="w-full flex flex-col gap-6">
                <p className="text-xs opacity-70">Get started with:</p>
                {freeFeatures.map((feature, index) => (
                  <CheckItem key={`freefeature-${index}`} title={feature} />
                ))}
              </div>
            </div>
            <div className="h-full p-4 min-w-96">
              <h3 className="text-lg font-semibold text-[var(--brandpurple)] mb-2">
                PRO
              </h3>
              <p className="text-sm opacity-80 mb-5">
                Build fully LLM-powered applications
                <br /> with persistent memory and multi-agent boxes
              </p>

              <Button
                size="sm"
                color="primary"
                as={Link}
                href="/upgrade"
                className="w-full font-semibold mb-10"
              >
                Get started
              </Button>

              <div className="flex items-center gap-1 mb-10">
                <h4 className="text-xl font-semibold line-through opacity-50">
                  $20
                </h4>
                <h4 className="text-xl font-semibold">$18</h4>
                <p className="text-sm opacity-80">/ month</p>
              </div>

              <div className="flex flex-col gap-6 truncate">
                <p className="text-xs opacity-70">
                  Everything in the Free plan, plus:
                </p>
                {proFeatures.map((feature, index) => (
                  <CheckItem key={`freefeature-${index}`} title={feature} />
                ))}
              </div>
            </div>
          </div>

          <p className="w-full text-center mt-4 opacity-80 text-sm font-semibold">
            Scoopika does not handle LLM costs for you. {"you'll"} need to
            provide your API keys safely from your code
          </p>

          <div className="mt-12 w-[80%]">
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
      </div>
    </>
  );
}
