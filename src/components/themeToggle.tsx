"use client";

import Icons from "@/components/icons";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="light"
          isIconOnly
          className="shadow"
          onPress={() => setOpen(true)}
        >
          <Icons.SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-1 bg-background/70 backdrop-blur-sm">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("light")}
        >
          <Icons.SunIcon />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("dark")}
        >
          <Icons.MoonIcon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("system")}
        >
          <Icons.LaptopIcon />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeToggleRow() {
  const { systemTheme, theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 w-full">
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="opacity-70"
        onPress={() => setTheme("system")}
      >
        <Icons.LaptopIcon />
      </Button>
      <Button
        isIconOnly
        size="sm"
        className={`${theme === "light" ? "opacity-100" : "opacity-70"}`}
        variant={theme === "light" ? "flat" : "light"}
        onPress={() => setTheme("light")}
      >
        <Icons.SunIcon />
      </Button>
      <Button
        isIconOnly
        size="sm"
        className={`${theme === "dark" ? "opacity-100" : "opacity-70"}`}
        variant={theme === "dark" ? "flat" : "light"}
        onPress={() => setTheme("dark")}
      >
        <Icons.MoonIcon />
      </Button>
    </div>
  );
}
