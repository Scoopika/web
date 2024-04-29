"use client";

import { FC, useState } from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import ThemeToggle from "./themeToggle";
import Logo from "./logo";
import { Session } from "next-auth";
import Icons from "@/components/icons";
import UserDropdown from "@/components/userDropdown";
import NavItem, { type Item } from "@/components/navItem";
import NextLink from "next/link";

interface Props {
  active?: string;
  items?: Item[];
  session: Session | null;
  children?: React.ReactNode;
  path?: string;
  disabled?: boolean;
}

const initialItems: Props["items"] = [
  { name: "Home", href: "/", type: "link" },
  {
    name: "Tools",
    href: "/tools",
    type: "option",
    items: [
      { name: "Function Calling", href: "/tools/function-calling" },
      { name: "LLM Tasks", href: "/tools/llm-tasks" },
      { name: "Vector Stores", href: "/tools/vector-stores" },
    ],
  },
  { name: "Docs", href: "/docs", type: "link" },
  { name: "Blog", href: "/blog", type: "link", disabled: true },
];

const Navbar: FC<Props> = ({ items, active, session, children, path }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!items) {
    items = initialItems;
  }

  return (
    <NextNavbar
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      className="border-b-1 fixed"
      classNames={{
        wrapper: "min-w-full justify-between",
        content: "",
      }}
    >
      <NavbarContent>
        <div className="flex items-center h-full">
          <NavbarBrand
            className="mr-6"
            as={NextLink}
            href={path ? `/${path}` : "/"}
          >
            <Logo />
            <p className="font-bold text-inherit text-[1.05rem] ml-3">
              Scoopika
            </p>
            {path && <p className="text-xs opacity-60 mb-2">{path}</p>}
          </NavbarBrand>
          <div className="min-h-[45%] border-r-1 opacity-80 mr-6"></div>
          <div className="hidden sm:flex items-center gap-4">
            {items?.length &&
              items.map((item) => (
                <NavbarItem key={`nav-item-${item.name}`}>
                  <NavItem item={item} active={active} />
                </NavbarItem>
              ))}
          </div>
        </div>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {children && children}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        {!session && (
          <Button
            color="primary"
            size="sm"
            radius="full"
            endContent={<Icons.ChevronRIghtIcon size={18} />}
            className="text-[0.8rem] bg-transparent bg-black dark:bg-purple-500/10 border-1 dark:border-purple-300/10 dark:hover:border-purple-300/50 text-white dark:text-purple-300"
            onPress={() => {
              const elm = document.getElementById("waitlistTrigger");
              if (elm) {
                elm.click();
              }
            }}
          >
            Join the waitlist
          </Button>
        )}
        <UserDropdown type="avatar" session={session} />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {items?.length &&
          items.map((item) => (
            <NavbarItem key={`nav-item-${item.name}`}>
              <Button
                as={Link}
                size="sm"
                color="default"
                variant="light"
                href={item.href}
                className="text-[0.85rem] w-full border-t-1 rounded-none border-black/10 dark:border-border"
              >
                {item.name}
              </Button>
            </NavbarItem>
          ))}
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
      </NavbarMenu>
    </NextNavbar>
  );
};

function GetIcon({ name }: { name: keyof typeof Icons }) {
  const Icon = Icons[name];
  if (!Icon) {
    return null;
  }
  return <Icon size={17} />;
}

export { type Props };
export default Navbar;
