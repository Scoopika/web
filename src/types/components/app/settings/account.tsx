"use client";

import { Button, User } from "@nextui-org/react";
import { CiLogout } from "react-icons/ci";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface Props {
  session: Session;
}

export default function AccountSettings({ session }: Props) {
  let theme = useTheme();

  return (
    <div className="w-full flex flex-col mt-2">
      <div className="text-sm pb-2 mb-2 border-b-1 w-full">Account</div>
      <div className="w-full flex items-center p-2">
        <User
          name={session.user?.name || session.user?.email}
          description={"@" + (session.user?.email || "User").split("@")[0]}
          classNames={{
            name: "text-default-600",
            description: "text-default-500",
          }}
          avatarProps={{
            size: "md",
            src: session.user?.image || "",
          }}
        />

        <div className="w-full flex items-center justify-end">
          <Button
            size="sm"
            variant="flat"
            startContent={<CiLogout size={17} />}
            className="min-w-max"
            onPress={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="text-sm pb-2 mb-2 border-b-1 w-full mt-8">Theme</div>
      <div className="flex w-full items-center p-2 gap-4">
        <div
          className={`w-full cursor-pointer border-1 transition-all rounded-lg p-4 flex items-center gap-3 ${
            theme.theme === "light" && "border-black/50 dark:border-white/50"
          }`}
          onClick={() => theme.setTheme("light")}
        >
          <div className="flex flex-col">
            <div className="w-20 h-4 bg-white rounded-md rounded-tr-2xl rounded-b-none relative border-1"></div>
            <div className="w-20 h-10 bg-white rounded-xl rounded-t-none relative border-1"></div>
          </div>
          <div className="flex flex-col font-semibold">
            <p>Light</p>
          </div>
        </div>

        <div
          className={`w-full cursor-pointer border-1 transition-all rounded-lg p-4 flex items-center gap-3 ${
            theme.theme === "dark" && "border-black/50 dark:border-white/50"
          }`}
          onClick={() => theme.setTheme("dark")}
        >
          <div className="flex flex-col">
            <div className="w-20 h-4 bg-black rounded-md rounded-tr-2xl rounded-b-none relative border-1"></div>
            <div className="w-20 h-10 bg-black rounded-xl rounded-t-none relative border-1"></div>
          </div>
          <div className="flex flex-col font-semibold">
            <p>Dark</p>
          </div>
        </div>
      </div>
    </div>
  );
}
