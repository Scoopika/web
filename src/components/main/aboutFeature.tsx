"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaQuestion } from "react-icons/fa6";

export default function AboutFeatureDialog({
  name,
  info,
}: {
  name: string;
  info: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-4 h-4 bg-foreground text-background rounded-full flex items-center justify-center">
          <FaQuestion size={12} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="font-semibold">About {name}</div>
        <div className="text-sm">{info}</div>
      </DialogContent>
    </Dialog>
  );
}
