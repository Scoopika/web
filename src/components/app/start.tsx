"use client";

import { Button } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CircularProgress } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";

export interface StartProps {
  steps: {
    items: any[];
    link: string;
    title: string;
    target?: string;
  }[];
}

const checkStep = (items: any[]) => {
  return items.length > 0;
};

const score = (i: { items: any[]; link: string }[]) => {
  const items = i.map((i) => i.items);
  const checked = items.map((i) => checkStep(i));
  const done = checked.filter((c) => c === true);

  return (done.length * 100) / items.length;
};

export default function Start({ steps }: StartProps) {
  const [start, setStart] = useState<boolean>(false);

  return (
    <DropdownMenu open={start} onOpenChange={setStart}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="bordered"
          className="border-1 font-semibold gap-2"
          onPress={() => setStart(true)}
          endContent={<FaChevronDown />}
        >
          <CircularProgress
            classNames={{
              svg: "w-5 h-5",
            }}
            aria-label="Progress"
            color={score(steps) === 100 ? "success" : "primary"}
            value={score(steps)}
            showValueLabel={false}
          />
          Getting started
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 p-3 flex flex-col gap-3">
        {steps.map((s, i) => {
          const isDone = checkStep(s.items);

          if (!isDone) {
            return (
              <>
                <div
                  key={`startstep-${i}`}
                  className="w-full flex items-center gap-4"
                >
                  <div className="text-xs w-full">{s.title}</div>
                  <Button
                    as={Link}
                    href={s.link}
                    target={s.target}
                    size="sm"
                    color="default"
                    variant="flat"
                    className="font-semibold"
                  >
                    Got for it
                  </Button>
                </div>
                <div className="w-full border-b-1"></div>
              </>
            );
          }

          return (
            <>
              <div
                key={`startstep-${i}`}
                className="w-full flex items-center gap-2 text-green-500"
              >
                <FaCheck />
                <div className="text-xs w-full">{s.title}</div>
              </div>
              <div className="w-full border-b-1"></div>
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
