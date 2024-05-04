"use client";

import { FC } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type Session } from "next-auth";
import Icons from "@/components/icons";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import NextLink from "next/link";

interface Props {
  session: Session | null;
  type: "avatar" | "button";
}

const UserDropdown: FC<Props> = ({ session, type }) => {
  const { theme, setTheme } = useTheme();

  if (!session) {
    return null;
  }

  return (
    <Dropdown
      radius="sm"
      classNames={{
        content: "border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar className="w-[2.05rem] h-[2.05rem] cursor-pointer border-1">
          <AvatarImage src={session.user?.image || ""} />
          <AvatarFallback>
            {(session.user?.name || session.user?.email)?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50/70",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider>
          <DropdownItem
            as={NextLink}
            href="/app/settings"
            key="settings"
            endContent={<Icons.SettingsIcon size={17} />}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
                defaultValue={theme}
                onChange={(e) => setTheme(e.target.value.toLocaleLowerCase())}
              >
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
          <DropdownItem key="command_menu" shortcut="⌘K">
            Command menu
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            endContent={<Icons.LogoutIcon size={17} />}
            onClick={() => signOut()}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
