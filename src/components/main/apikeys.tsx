"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import listKeys from "@/functions/apikeys/list";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import tryRequest from "@/scripts/tryRequest";
import newApiKey from "@/functions/apikeys/new";
import { FaLock } from "react-icons/fa6";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import deleteApiKey from "@/functions/apikeys/delete";
import { providers } from "@/scripts/agents/engines";

interface Props {
  keys: { id: string; name: string }[];
  setKeys: Dispatch<SetStateAction<{ id: string; name: string }[]>>;
  loadedKeys: boolean;
  setLoadedKeys: Dispatch<SetStateAction<boolean>>;
}

export default function ApiKeys({
  keys,
  setKeys,
  loadedKeys,
  setLoadedKeys,
}: Props) {
  const [newKeyName, setNewKeyName] = useState<string>();
  const [newKeyValue, setNewKeyValue] = useState<string | undefined>(undefined);
  const [newKeyLoading, setNewKeyLoading] = useState<boolean>(false);
  const [deleteKey, setDeleteKey] = useState<string | undefined>();
  const [deleteKeyLoading, setDeleteKeyLoading] = useState<boolean>(false);

  useEffect(() => {
    const getKeys = async () => {
      if (loadedKeys) return;
      const res = await listKeys();
      if (res.success) {
        setLoadedKeys(true);
        setKeys(res.keys);
        return;
      }

      toast.error("Can't load keys", {
        description: "There was a problem loading API keys. contact support",
      });
    };

    getKeys();
  }, []);

  const saveKey = async () => {
    if (newKeyLoading) return;

    if (!newKeyName || !newKeyValue) {
      return toast.error("Enter API key provider & value", {
        description: "Please select a provider and enter the key value",
      });
    }

    setNewKeyLoading(true);
    tryRequest<{ success: true; id: string }>({
      loading: "Adding API key",
      success: "Added key successfully",
      error: "Can't add API key",
      func: async () => {
        const res = await newApiKey(newKeyName, newKeyValue);
        if (!res || !res.success) {
          throw new Error("Error adding API key!");
        }

        return res;
      },
      end: (s) => {
        if (s?.success) {
          setKeys((prev) => [...prev, { name: newKeyName, id: s.id }]);
        }

        setNewKeyLoading(false);
      },
    });
  };

  const deleteAKey = async () => {
    if (deleteKeyLoading || !deleteKey) return;

    setDeleteKeyLoading(true);
    tryRequest<boolean>({
      loading: "Deleting API key...",
      success: "Deleted API key successfully",
      error: "Can't delete API key",
      func: async () => {
        const res = await deleteApiKey(deleteKey);
        if (!res || !res.success) {
          throw new Error("Can't delete API key right now! contact support");
        }

        return res.success;
      },
      end: (s) => {
        if (s) {
          setKeys((prev) => prev.filter((k) => k.id !== deleteKey));
        }

        setDeleteKeyLoading(false);
        setDeleteKey(undefined);
      },
    });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="text-xs opacity-70 flex items-center gap-1 mb-1">
        <FaLock />
        API keys are encrypted
      </div>
      <div className="mb-2 text-sm">Providers API Keys</div>
      <div className="text-xs opacity-70 mb-4">
        Add API keys for the LLMs providers {"you"} use. you can add them here
        or pass them safely from your code
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-2">
        <Autocomplete
          placeholder="Provider"
          defaultInputValue={newKeyName}
          allowsCustomValue
          onInputChange={(value) => setNewKeyName(value)}
          onSelectionChange={(value) => {
            if (!value) return;
            setNewKeyName(value.toString());
          }}
          variant="bordered"
          color="secondary"
        >
          {providers.map((provider) => (
            <AutocompleteItem
              key={`engine-audiocomplete-${provider}`}
              value={provider}
              textValue={provider}
            >
              {provider}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Input
          defaultValue={newKeyValue}
          placeholder="Key value"
          className="text-xs"
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setNewKeyValue(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveKey();
            }
          }}
        />
        <Button
          size="sm"
          color="default"
          className="font-semibold min-w-24"
          isLoading={newKeyLoading}
          onPress={() => saveKey()}
        >
          Add
        </Button>
      </div>
      {!loadedKeys && (
        <div className="opacity-80 mt-4 text-xs">Loading keys...</div>
      )}
      {loadedKeys && keys.length < 1 && (
        <div className="opacity-80 mt-4 text-xs">You have no keys yet!</div>
      )}
      <div className="w-full flex flex-col gap-2 mt-4">
        {keys.map((key, index) => (
          <div
            key={`keyitem-${key.id}`}
            className={`w-full flex items-center p-1 pl-3 pr-3 text-xs rounded-lg group ${
              !(index & 1) && "bg-black/20 dark:bg-accent/30"
            }`}
          >
            <p className="min-w-max">{key.name}</p>
            <div className="w-full flex items-center justify-end translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
              <Button
                size="sm"
                variant="flat"
                isIconOnly
                onPress={() => {
                  setDeleteKey(key.id);
                }}
              >
                <MdDelete size={17} className="text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {deleteKey && (
        <Dialog
          open={true}
          onOpenChange={
            !deleteKeyLoading ? () => setDeleteKey(undefined) : () => {}
          }
        >
          <DialogContent>
            <p className="text-sm">Remove API key</p>
            <p className="text-sm opacity-80">
              Are you sure you want to remove this API key from Scoopika?
            </p>
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              isLoading={deleteKeyLoading}
              onPress={() => deleteAKey()}
            >
              Remove
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
