"use client";

import itemValue from "@/scripts/itemValue";
import { Avatar, Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useEffect, useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

interface Props {
    agent: AgentData;
}

export default function AgentMainPage({ agent }: Props) {
    const [editName, setEditName] = useState<boolean>(false);
    const [data, setData] = useState<AgentData>({} as AgentData);

    useEffect(() => {
        setData(JSON.parse(JSON.stringify(agent)));
    }, [agent]);

    return (
        <>
            {itemValue(data, "avatar") ? (
                <div className="relative min-w-12 max-w-12 min-h-12 max-h-12">
                    <Avatar
                        src={data.avatar}
                        className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-xl absolute z-12 border-4 border-accent/50"
                    ></Avatar>
                </div>
            ) : (
                <div className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-xl flex items-center justify-center bg-accent/50">
                    <RiRobot2Fill />
                </div>
            )}

            {!editName ? (
                <div className="font-semibold flex items-center gap-2 transition-all">
                    {data?.name}
                    <Button
                        variant="flat"
                        size="sm"
                        isIconOnly
                        className="w-8 h-8"
                        onPress={() => setEditName(true)}
                    >
                        <MdModeEdit />
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <input
                        className="border-b-1 bg-transparent transition-all text-center"
                        defaultValue={data?.name}
                        autoFocus
                        onBlur={() => setEditName(false)}
                        onInput={(e) => {
                            const value = e?.currentTarget?.value;
                            setData(prev => ({ ...prev, name: value }))
                        }}
                    />
                </div>
            )}

            <input className="w-full bg-transparent border-0 text-sm text-foreground/70 text-center" defaultValue={data?.description} onInput={(e) => {
                const value = e?.currentTarget?.value;
                setData(prev => ({ ...prev, description: value }))
            }} />

        </>
    )
}
