import { authOptions } from "@/lib/auth";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import CheckItem from "@/components/checkItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckoutButton } from "@/components/app/billing/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const alreadyPro = await db.datastore.findMany();
  const leftStores = 100 - (alreadyPro.length || 0);

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
      title: "What can I do with the Pro plan?",
      description:
        "You can create up to 10 AI agents, with access to the full set of base features from LLM output validation to external tools and real-time streaming hooks. You also can create up to 4 multi-agent boxes where you can let your agents collaborate together. and you get a managed Serverless data store for persistent chat sessions so your agents can remember previous conversations with users and you can display these messages to your users if you want to.",
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
      title: "How chat sessions are stored in the Pro plan?",
      description:
        "In the Pro plan you can deploy a Serverless managed data store with zero setup. after the deployment is successful you can just copy its url and add it to your Scoopika instance, and boom, you have a managed persistent history for all chat sessions in your application.",
    },
  ];

  return (
    <>
      <Navbar session={session} active="NONE" />
      <div className="w-full pt-16">
        <div className="w-full flex flex-col items-center p-12">
          <h1 className="text-3xl font-semibold mb-3">
            Pricing designed for developers
          </h1>

          <p className="text-sm font-semibold opacity-80 mb-12">
            Unlock the full set of Scoopika features today
          </p>

          {leftStores === 0 && (
            <div className="text-sm text-orange-500 mb-6">
              Due to high demand, We {"won't"} be able to provide you with a
              managed database right now, please{" "}
              <Link
                className="underline text-foreground"
                href="https://docs.scoopika.com/help/contact-us"
                target="_blank"
              >
                contact us
              </Link>{" "}
              for more info
            </div>
          )}

          <div className="w-full flex flex-col justify-center lg:flex-row min-h-max gap-12 bg-accent/30 p-4 rounded-lg rounded-tr-3xl rounded-bl-3xl border-1 border-black/20 dark:border-white/20 max-w-max">
            <div className="h-full p-4">
              <h3 className="text-lg font-semibold text-[var(--brandpurple)] mb-2">
                PRO
              </h3>
              <p className="text-sm opacity-80 mb-5">
                Build fully LLM-powered applications
                <br /> with persistent memory and multi-agent boxes
              </p>

              <CheckoutButton />

              <div className="flex items-center gap-1 mb-10 mt-10">
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

          <div className="mt-12 w-[80%]">
            <Accordion type="single" collapsible>
              {faqs.map((f, index) => (
                <AccordionItem
                  key={`upgradefaq-${index}`}
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
