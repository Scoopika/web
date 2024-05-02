"use client";

import Icons from "@/components/icons";
import { useTheme } from "next-themes";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Dropdown className="border-1 bg-background/70 backdrop-blur-sm">
      <DropdownTrigger>
        <Button size="sm" variant="bordered" isIconOnly className="border-1">
          <Icons.SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="solid">
        <DropdownItem
          onClick={() => setTheme("light")}
          startContent={<Icons.SunIcon />}
        >
          Light
        </DropdownItem>
        <DropdownItem
          onClick={() => setTheme("dark")}
          startContent={<Icons.MoonIcon />}
        >
          Dark
        </DropdownItem>
        <DropdownItem
          onClick={() => setTheme("system")}
          startContent={<Icons.LaptopIcon />}
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
