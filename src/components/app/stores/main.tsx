"use client";

import { DataStore } from "@/types/dataStore";
import { Button } from "@nextui-org/react";
import NewDataStore from "./new";
import { BsPlusCircleDotted } from "react-icons/bs";

interface Props {
  datastores: DataStore[];
}

export default function DataStoresMain({ datastores }: Props) {
  if (datastores.length < 1) {
    return (
      <div className="p-6 w-full">
        <NewDataStore>
          <div className="w-full p-2 h-96 border-1 rounded-2xl border-dashed border-black/20 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 cursor-pointer flex flex-col items-center justify-center transition-all">
            <BsPlusCircleDotted size={30} className="opacity-80 mb-4" />
            <h3 className="font-semibold">Create your first data store</h3>
            <p className="text-sm opacity-70 mt-2 text-center">
              Managed Data stores are a fast Serverless stores used for saving
              chats sessions history.
              <br />
              One click and {"you'll"} be setup and ready!
            </p>
          </div>
        </NewDataStore>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="w-full flex items-center">
        <p className="min-w-max">Your data stores</p>
        <div className="w-full flex items-center justify-end">
          <Button size="sm" color="primary" className="font-semibold">
            New store
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4"></div>
    </div>
  );
}
