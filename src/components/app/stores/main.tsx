"use client";

import { DataStore } from "@/types/dataStore";
import { Button } from "@nextui-org/react";
import NewDataStore from "./new";
import { BsPlusCircleDotted } from "react-icons/bs";
import { useState } from "react";
import { FaDatabase } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import DeleteDataStore from "./delete";

interface Props {
  datastores: DataStore[];
}

export default function DataStoresMain({ datastores }: Props) {
  const [state, setState] = useState<DataStore[]>(datastores);
  const [deleteOpen, setDeleteOpen] = useState<[string, string] | undefined>();

  const deleteStore = (id: string): void => {
    setState((prev) => [...prev.filter((d) => d.id !== id)]);
    setDeleteOpen(undefined);
  };

  if (state.length < 1) {
    return (
      <div className="p-6 w-full">
        <NewDataStore updateState={setState}>
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
    <>
      <div className="w-full flex flex-col p-4 pl-6 pr-6 border-b-1 border-orange-400/30 bg-orange-500/10 text-sm">
        <p>
          Currently you can only have one data store, If you need another data
          store please contact us and {"We'll"} do our best to help you
        </p>
      </div>
      <div className="w-full flex flex-col p-6">
        <div className="w-full flex items-center">
          <p className="min-w-max">Your data stores</p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-6">
          {state.map((datastore) => (
            <div
              key={`datastoreitem-${datastore.id}`}
              className="w-full flex flex-col p-4 border-1 rounded-lg hover:shadow transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="min-w-9 min-h-9 max-w-9 max-h-9 flex items-center justify-center border-1 rounded-lg">
                  <FaDatabase />
                </div>
                <p className="font-semibold min-w-max">{datastore.name}</p>
                <div className="w-full flex items-center justify-end translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={() =>
                      setDeleteOpen([datastore.id, datastore.deployment_id])
                    }
                  >
                    <MdDelete size={17} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div
                  className="flex items-center text-sm gap-2 cursor-pointer hover:underline transition-all"
                  onClick={() => {
                    navigator.clipboard.writeText(datastore?.url);
                    toast.success("Copied Data store Url");
                  }}
                >
                  <FaLink />
                  {datastore?.url}
                </div>
              </div>
            </div>
          ))}
        </div>

        {deleteOpen && (
          <DeleteDataStore
            data={deleteOpen}
            deleteStore={deleteStore}
            close={() => {
              setDeleteOpen(undefined);
            }}
          />
        )}
      </div>
    </>
  );
}
