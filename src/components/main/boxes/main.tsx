"use client";

import { RawBoxData } from "@/types/rawBox";
import AppHead from "../head";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import Empty from "../empty";
import { TbCube3dSphere } from "react-icons/tb";
import { useState } from "react";
import BoxItem from "./item";
import NewBox from "./new";
import { AgentData } from "@scoopika/types";
import ResourceLink from "../resourceLink";

interface Props {
  boxes: RawBoxData[];
}

export default function BoxesMain({ boxes }: Props) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editBox, setEditBox] = useState<RawBoxData | undefined>();
  const [agentsList, setAgentsList] = useState<AgentData[] | undefined>(
    undefined,
  );

  const newEdit = (box: RawBoxData) => {
    setEditBox(box);
    setEditOpen(true);
  };

  return (
    <>
      <AppHead
        title="Multi-Agent Boxes"
        description="Virtual containers with multiple agents that can collaborate"
        action={
          <NewBox
            agentsList={agentsList}
            updateAgentsList={setAgentsList}
            triggerFull={false}
            triggerAsChild
            newBox={
              !editBox
                ? { new: true }
                : {
                    new: false,
                    editOpen,
                    box: editBox,
                    setEditOpen,
                  }
            }
          >
            <Button
              size="sm"
              variant="bordered"
              startContent={<FaPlus />}
              onPress={() => setEditBox(undefined)}
            >
              Create new box
            </Button>
          </NewBox>
        }
      />

      {boxes.length < 1 && (
        <Empty
          icon={<TbCube3dSphere />}
          title="Create your first multi-agent box"
          description="You can add your created agents to a box so they collaborate together on complex tasks"
        />
      )}

      <div className="flex flex-col w-full gap-2">
        {boxes.map((box, index) => (
          <BoxItem
            key={`boxitem-${box.id}-${index}`}
            box={box}
            setEditBox={newEdit}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-1 flex flex-col gap-2 w-full">
        <ResourceLink
          name="Learn more about multi-agent boxes"
          link="https://docs.scoopika.com/multi-agent-boxes"
        />
        <ResourceLink
          name="Integrate boxes into your application"
          link="https://docs.scoopika.com/multi-agent-boxes/server-side-usage"
        />
      </div>
    </>
  );
}
