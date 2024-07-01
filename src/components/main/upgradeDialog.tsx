"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa6";
import ResourceLink from "./resourceLink";
import { FaRocket } from "react-icons/fa6";
import CheckItem from "../checkItem";
import { UpgradeButton } from "./upgradeButton";

interface Props {
  title?: string;
  price?: boolean;
  className?: string;
}

export default function UpgradeDialog({ title, price, className }: Props) {
  const features = {
    basic: [
      "Long-term memory (1M read & 500K write)",
      "Agent custom knowledge sources (300K requests)",
      "100K characters of audio output (agent speech)",
      "500 minutes of fast audio input processing ~2s (falls back to unlimited slow processing ~10s)",
      "Create 10 agents & 4 boxes",
      "Unlimited tools per agent",
    ],
    scale: [
      "Long-term memory (4M read & 2M write)",
      "Agent custom knowledge sources (1.5M requests)",
      "1M characters of audio output (agent speech)",
      "1K minutes of fast audio input processing ~2s (falls back to unlimited slow processing ~10s)",
      "Faster speech generation",
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          color="primary"
          className={`font-semibold ${className}`}
          endContent={<FaChevronRight />}
          startContent={<FaRocket />}
          href="/pricing#pricing"
        >
          {title || "Pick your plan"}{" "}
          {price !== false && (
            <span className="text-xs">(starts at $16/month)</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70%]">
        <div className="font-semibold">Pick your plan!</div>
        <div className="text-sm opacity-80 flex items-center gap-1">
          See full pricing details and FAQs{" "}
          <ResourceLink name="here" link="/pricing" />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="p-6 border-1 rounded-2xl w-full flex flex-col gap-3">
            <div className="text-sm font-semibold mb-2">Basic - $16/month</div>
            <UpgradeButton
              type="basic"
              size="sm"
              className="mb-2"
              title="Pick plan"
            />
            <div className="text-xs opacity-80">
              Everthing in free plan, plus:
            </div>
            {features["basic"].map((feature, index) => (
              <CheckItem key={`basicitem-${index}`} title={feature} />
            ))}
            <ResourceLink name="See all features" link="pricing#pricing" />
          </div>
          <div className="p-6 border-1 rounded-2xl w-full flex flex-col gap-3">
            <div className="text-sm font-semibold mb-2">Scale - $56/month</div>
            <UpgradeButton
              type="scale"
              size="sm"
              className="mb-2"
              title="Pick plan"
            />
            <div className="text-xs opacity-80">Everthing in basic, plus:</div>

            {features["scale"].map((feature, index) => (
              <CheckItem key={`basicitem-${index}`} title={feature} />
            ))}

            <ResourceLink name="See all features" link="pricing#pricing" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
