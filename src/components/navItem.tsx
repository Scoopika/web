"use client";

import Link from "next/link";
import Icons from "@/components/icons";
import {
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

type LinkItem = {
  type: "link";
  name: string;
  href: string;
  target?: string;
  icon?: keyof typeof Icons;
  disabled?: boolean;
};

type OptionItem = {
  type: "option";
  name: string;
  target?: string;
  href?: string;
  items: {
    name: string;
    href: string;
  }[];
};

export type Item = LinkItem | OptionItem;

export default function NavItem({
  item,
  active,
}: {
  item: Item;
  active?: string;
}) {
  if (item.type === "link") {
    return (
      <Button
        as={Link}
        size="sm"
        target={`${item.target ? item.target : "_self"}`}
        color={`${active === item.name ? "primary" : "default"}`}
        variant={`${active === item.name ? "solid" : "light"}`}
        href={!item.disabled ? item.href : ""}
        disabled={item.disabled ? true : false}
        radius="full"
        className={`
                bg-transparent hover:bg-accent/30 hover:opacity-100 text-white
                ${
                  active === item.name
                    ? "bg-black dark:bg-accent/50"
                    : "opacity-70"
                } ${!item.disabled ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        {item.name}
      </Button>
    );
  }

  return (
    <Dropdown
      classNames={{
        content: "border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Button
          size="sm"
          color={`${active === item.name ? "primary" : "default"}`}
          variant={`${active === item.name ? "solid" : "light"}`}
          endContent={<Icons.ChevronDownIcon size={16} />}
          radius="full"
          className={`
                text-[0.84rem] dark:bg-transparent hover:bg-black/20 dark:hover:bg-accent/30 hover:opacity-100 dark:text-white
                ${
                  active === item.name
                    ? "bg-black dark:bg-accent/50"
                    : "opacity-70"
                }`}
        >
          {item.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {item.items.map((item) => (
          <DropdownItem
            key={`dropdown-item-${item.name}`}
            as={Link}
            href={item.href}
          >
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
