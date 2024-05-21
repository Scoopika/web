"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import createDatastore from "@/functions/datastores/create";
import cleanText from "@/scripts/cleanText";
import { DataStore } from "@/types/dataStore";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Props {
  updateState: Dispatch<SetStateAction<DataStore[]>>;
  children: React.ReactNode;
}

export default function NewDataStore({ children, updateState }: Props) {
  const [newName, setNewName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const create = async () => {
    if (loading) return;

    if (!newName || newName.length < 5) {
      return toast.error("Data store name should be at least 5 characters");
    }

    setLoading(true);
    const t = toast.loading("Creating data store");

    try {
      const res = await createDatastore(newName);

      if (!res.success && res.error) {
        return toast.error(
          res.error.toLowerCase().replaceAll("project", "data store"),
          { id: t },
        );
      }

      if (!res.success) {
        throw new Error("creation error");
      }

      toast.success("Created & deployed data store!", { id: t });
      updateState((prev) => [...prev, res.data]);
      setOpen(false);
      setNewName("");
    } catch {
      toast.error("Can't create data store. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>New Data store</DialogTitle>
        <DialogDescription className="mb-2">
          Give your datastore a unique name. this {"can't"} be changed later and
          will be in your database url!
        </DialogDescription>
        <Input
          placeholder="Data store name"
          defaultValue={newName}
          onInput={(e) => {
            setNewName(e.currentTarget.value);
          }}
          className="text-sm"
        />
        <Button
          size="sm"
          color="primary"
          className="w-full font-semibold"
          isLoading={loading}
          onPress={() => create()}
        >
          Create data store
        </Button>
        {loading && (
          <div
            className={`mt-2 w-full border-1 border-dashed rounded-lg p-4 text-sm transition-all ${
              loading ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Deploying your data store, this process could take a few seconds to
            complete!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
