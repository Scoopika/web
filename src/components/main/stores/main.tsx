"use client";

import { Button } from "@nextui-org/react";
import AppHead from "../head";
import { FaDatabase, FaPlus } from "react-icons/fa6";
import Empty from "../empty";
import { BsDatabaseFill } from "react-icons/bs";
import NewHistoryStore from "./new";
import HistoryStoreItem from "./item";

interface Props {
  dataStores: { id: string; name: string }[];
}

export default function StoresMain({ dataStores }: Props) {
  return (
    <>
      <AppHead
        title="History Stores"
        description="Store chat sessions for long-term agents memory"
        action={<NewHistoryStore />}
      />

      {dataStores.length < 1 && (
        <Empty
          icon={<FaDatabase />}
          title="Create first history store"
          description="History stores are created with one click, and easily used from your code to manage chat sessions based on agent or users IDs with zero setup"
        />
      )}

      <div className="w-full flex flex-col gap-3">
        {dataStores.map((store, index) => (
          <HistoryStoreItem
            key={`storeitem-${store.id}-${index}`}
            datastore={store}
          />
        ))}
      </div>
    </>
  );
}
