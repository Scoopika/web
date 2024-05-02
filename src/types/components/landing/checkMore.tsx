"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function CheckMore() {
  return (
    <main className="pt-48 pb-24 w-full max-w-[90%] flex justify-center items-center flex-col">
      <h2 className="text-4xl text-center mb-2 font-semibold">Join us now</h2>
      <p className="text-sm opacity-80 text-center mb-8">
        Scoopika v1.0 is coming soon, for the moment you can join the waitlist
        <br />
        and check out more information about the project (See products)
      </p>
      <div className="flex items-center gap-4">
        <Button
          color="primary"
          size="md"
          className="max-w-max dark:bg-accent/50 dark:text-white dark:hover:bg-accent/70 mb-10"
          radius="full"
          onPress={() => {
            const elm = document.getElementById("waitlistTrigger");
            if (elm) {
              elm.click();
            }
          }}
        >
          Join Waitlist
        </Button>
      </div>
    </main>
  );
}
