"use client";

import { useEffect, useState } from "react";

interface Props {
  text?: string | null;
}

export default function Greeting({ text }: Props) {
  const [greeting, setGreeting] = useState<string>();

  useEffect(() => {
    const getGreeting = (date: Date): string => {
      const hour = date.getHours();
      if (hour >= 5 && hour < 12) {
        return "Good morning";
      }

      if (hour >= 12 && hour < 17) {
        return "Good afternoon";
      }

      return "Good evening";
    };

    setGreeting(getGreeting(new Date()));
  }, []);

  return (
    <div>
      {greeting || "Hey"}, {text}
    </div>
  );
}
