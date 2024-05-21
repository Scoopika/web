"use client";

import { RawBoxData } from "@/types/rawBox";
import { useState } from "react";
import NewBox from "./new";
import { BsPlusCircleDotted } from "react-icons/bs";
import BoxItem from "./boxItem";
import { AgentData } from "@scoopika/types";
import { Button } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { Session } from "next-auth";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
  session: Session;
  boxes: RawBoxData[];
}

export default function MainBoxes({ boxes, session }: Props) {
  const isPro =
    session.user.plan === "none" || !session.user.plan.includes(":::")
      ? false
      : true;
  const [state, updateState] = useState<RawBoxData[]>(boxes);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editBox, setEditBox] = useState<RawBoxData>();
  const [agentsList, setAgentsList] = useState<AgentData[]>();

  const newEdit = (box: RawBoxData) => {
    setEditBox(box);
    setEditOpen(true);
  };

  if (state.length < 1) {
    return (
      <div className="p-6 w-full">
        <NewBox
          updateState={updateState}
          newBox={{ new: true }}
          updateAgentsList={setAgentsList}
          agentsList={agentsList}
          triggerFull
        >
          <div className="w-full p-2 h-96 border-1 rounded-2xl border-dashed border-black/20 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 cursor-pointer flex flex-col items-center justify-center transition-all">
            <BsPlusCircleDotted size={30} className="opacity-80 mb-4" />
            <h3 className="font-semibold">Create your first smart box</h3>
            <p className="text-sm opacity-70 mt-2 text-center">
              You can add multiple agents to a box and let them collaborate
              based on the context
            </p>
          </div>
        </NewBox>
      </div>
    );
  }

  return (
    <div className="w-full p-6 flex flex-col">
      <div className="w-full flex items-center mb-4">
        <h1 className="min-w-max flex items-center gap-2">
          Your smart boxes
          <Badge variant="secondary">
            {state.length}
            {"/"}
            {isPro ? "4" : "1"}
          </Badge>
        </h1>
        <div className="w-full flex items-center justify-end mb-4">
          <NewBox
            updateState={updateState}
            newBox={{ new: true }}
            updateAgentsList={setAgentsList}
            agentsList={agentsList}
            triggerFull
            triggerAsChild
          >
            {(isPro || state.length < 1) && (
              <Button
                size="sm"
                color="primary"
                className="font-semibold max-w-max"
              >
                New box
              </Button>
            )}
          </NewBox>
        </div>
      </div>
      {editBox && (
        <NewBox
          updateState={updateState}
          newBox={{ new: false, box: editBox, editOpen, setEditOpen }}
          updateAgentsList={setAgentsList}
          agentsList={agentsList}
          triggerFull={false}
        >
          <div className="hidden"></div>
        </NewBox>
      )}

      {!isPro && state.length > 0 && (
        <Link
          href="/app/upgrade"
          className="mt-2 mb-8 w-full p-4 border-1 rounded-lg relative cursor-pointer transition-all hover:bg-accent/10 hover:border/black/20 dark:hover:border-white/20"
        >
          <div className="font-semibold">Upgrade to Pro</div>
          <div className="text-sm opacity-70">
            Upgrade your plan to create more Multi-agent boxes
          </div>
          <div className="absolute h-full w-20 flex items-center justify-center top-0 right-0">
            <FaChevronRight />
          </div>
        </Link>
      )}

      {state.map((box) => (
        <BoxItem
          setEditBox={newEdit}
          key={`boxitem-${box.id}`}
          box={box}
          updateState={updateState}
        />
      ))}
    </div>
  );
}
