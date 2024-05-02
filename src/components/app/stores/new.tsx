"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
}

export default function NewDataStore({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>New Data store</DialogTitle>
        <DialogDescription>
          Give your datastore a name, it can be changed later!
        </DialogDescription>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
