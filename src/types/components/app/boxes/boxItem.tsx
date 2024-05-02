"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteBox from "@/functions/boxes/delete";
import { RawBoxData } from "@/types/rawBox";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  box: RawBoxData;
  updateState: Dispatch<SetStateAction<RawBoxData[]>>;
  setEditBox: (box: RawBoxData) => void;
}

export default function BoxItem({ box, updateState, setEditBox }: Props) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteThisBox = async () => {
    setLoading(true);
    const t = toast.loading("Deleting box...");

    try {
      const res = await deleteBox(box.id);

      if (!res.success) {
        throw new Error("deletion error");
      }

      toast.success("Deleted box", { id: t });
      updateState((prev) => [...prev.filter((b) => b.id !== box.id)]);
      setDeleteOpen(false);
    } catch {
      toast.error("Can't delete box. try again later!", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copied box ID");
  };

  return (
    <div className="w-full flex flex-col p-3 border-b-1 gap-3 group">
      <div className="w-full flex items-center gap-3">
        <div className="min-w-9 min-h-9 max-w-9 max-h-9 bg-accent/50 flex items-center justify-center rounded-lg font-semibold cursor-default">
          {(box?.name || "").substring(0, 1)}
        </div>
        <p className="font-semibold min-w-max truncate">{box.name}</p>
        <p
          className="text-xs p-1 pl-1.5 pr-1.5 cursor-pointer bg-accent/30 hover:bg-accent/40 min-w-max truncate rounded-md transition-all"
          onClick={() => copyId(box.id)}
        >
          {(box.id || "").split("-")[0]}
        </p>
        <div className="w-full flex items-center justify-end gap-2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => setEditBox(box)}
          >
            <MdEdit size={17} />
          </Button>
          <AlertDialog
            open={deleteOpen}
            onOpenChange={!loading ? setDeleteOpen : () => {}}
          >
            <AlertDialogTrigger asChild>
              <Button isIconOnly size="sm" variant="light" color="danger">
                <MdDelete size={17} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action {"can't"} be undone! agents under this box {"won't"}{" "}
                be affected.
              </AlertDialogDescription>
              <div className="w-full flex items-center justify-end gap-3">
                <Button
                  size="sm"
                  variant="flat"
                  disabled={loading}
                  onPress={() => {
                    if (!loading) {
                      setDeleteOpen(false);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  isLoading={loading}
                  onPress={() => deleteThisBox()}
                >
                  Delete {box.name}
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
