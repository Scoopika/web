"use client";

import { Button } from "@nextui-org/react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import deleteDataStore from "@/functions/datastores/delete";

interface Props {
  data: [string, string];
  deleteStore: (id: string) => void;
  close: () => void;
}

export default function DeleteDataStore({ data, deleteStore, close }: Props) {
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteThisStore = async () => {
    if (loading) return;

    const t = toast.loading("Deleting data store...");
    setLoading(true);

    try {
      const res = await deleteDataStore(data[0], data[1]);

      if (!res.success) {
        throw new Error("deletion error");
      }

      toast.success("Deleted data store", { id: t });
      close();
      deleteStore(data[0]);
    } catch {
      toast.error("Can't delete data store. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete data store</AlertDialogTitle>
        <AlertDialogDescription>
          This action {"can't"} be undone, and you {"won't"} be able to connect
          to your database anymore
        </AlertDialogDescription>
        <div className="mt-3 w-full flex items-center justify-end gap-3">
          <Button
            size="sm"
            variant="flat"
            disabled={loading}
            onPress={() => {
              if (!loading) {
                close();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="danger"
            className="font-semibold"
            isLoading={loading}
            onPress={() => deleteThisStore()}
          >
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
