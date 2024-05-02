"use client";

import { RawBoxData } from "@/types/rawBox";
import { useState } from "react";
import NewBox from "./new";
import { BsPlusCircleDotted } from "react-icons/bs";
import BoxItem from "./boxItem";
import { AgentData } from "@scoopika/types";
import { Button } from "@nextui-org/react";

interface Props {
  boxes: RawBoxData[];
}

export default function MainBoxes({ boxes }: Props) {
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
      <div className="w-full flex items-center justify-end mb-4">
        <NewBox
          updateState={updateState}
          newBox={{ new: true }}
          updateAgentsList={setAgentsList}
          agentsList={agentsList}
          triggerFull
          triggerAsChild
        >
          <Button size="sm" color="primary" className="font-semibold max-w-max">
            New box
          </Button>
        </NewBox>
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
