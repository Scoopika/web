"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import { IconChevronRight } from "@tabler/icons-react";
import { toast } from "sonner";

export default function WaitlistDialog({
  color,
  triggerClassName,
}: {
  color: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async () => {
    try {
      const emailRegex: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      setLoading(true);
      // const { error } = await supabase
      //   .from("waitlist")
      //   .insert({ email: email });
      // if (error) {
      //   if (error.code === "23505") {
      //     toast.error("You're already on the waitlist");
      //     return;
      //   }
      //   throw error;
      // }

      toast.success("Joined the waitlist");
      setOpen(false);
    } catch (err) {
      toast.error("Can't join the waitlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        id="waitlistTrigger"
        color="primary"
        size="md"
        className={`rounded-full text-black ${triggerClassName}`}
        style={{
          boxShadow: `0px 0px 600px 1px var(--${color})`,
          backgroundColor: `var(--${color})`,
        }}
        onPress={() => {
          setOpen(true);
          setEmail(undefined);
        }}
      >
        Join the waitlist
        <IconChevronRight size={16} />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the waitlist</DialogTitle>
          <DialogDescription>
            We will notify you once Iskopy is released
          </DialogDescription>
        </DialogHeader>
        <input
          type="email"
          placeholder="Enter your email..."
          className="outline-0 border-1 border-black/20 dark:border-border w-full rounded-md p-2 pl-3 pr-3 text-sm bg-accent/30 dark:bg-accent/10 focus:bg-accent/20"
          onInput={(e) => setEmail(e.currentTarget.value)}
          autoFocus={true}
        />
        <DialogFooter>
          <Button
            isLoading={loading}
            color="primary"
            radius="full"
            size="sm"
            onPress={() => submit()}
          >
            Join the waitlist
            <IconChevronRight size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
