"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import createDatastore from "@/functions/datastores/create";
import tryRequest from "@/scripts/tryRequest";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

export default function NewHistoryStore() {
  const [name, setName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const create = async () => {
    if (loading) return;

    if (!name || name.length < 3) {
      return toast.error("Enter valid name!", {
        description: "History store name should be at least 3 characters",
      });
    }

    setLoading(true);
    tryRequest<boolean>({
      loading: "Creating history store...",
      success: "Created history store!",
      error: "Can't create history store",
      func: async () => {
        const res = await createDatastore(name);

        if (!res || !res.success) {
          throw new Error("Please try again later or contact support");
        }

        return res.success;
      },
      end: (s) => {
        setLoading(false);
        if (s) {
          setOpen(false);
          setName("");
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="bordered"
          className=""
          startContent={<FaPlus />}
        >
          New history store
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="font-semibold">New history store</div>
        <Input
          placeholder="Enter history store name (e.g. dev)"
          defaultValue={name}
          onInput={(e) => {
            const value = e?.currentTarget?.value;
            setName(value);
          }}
        />
        <Button
          size="sm"
          color="primary"
          className="font-semibold"
          endContent={<FaChevronRight />}
          isLoading={loading}
          onPress={() => create()}
        >
          Create history store
        </Button>
      </DialogContent>
    </Dialog>
  );
}
