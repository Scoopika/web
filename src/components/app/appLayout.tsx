import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { BsStars, BsThreeDots } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import Sidebar from "./sidebar";
import Starting from "./starting";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { TbSlash } from "react-icons/tb";
import { RxSlash } from "react-icons/rx";
import { RiExpandUpDownLine } from "react-icons/ri";

interface Props {
  session: Session;
  title: string;
  sidebarActive: string;
  children: React.ReactNode;
}

export default function AppLayout({
  session,
  title,
  sidebarActive,
  children,
}: Props) {
  return (
    <div className="w-full min-h-screen max-h-screen flex">
      <Starting />
      <div className="w-full flex flex-col">
        <div className="border-b-1 w-full p-6 h-14 flex items-center fixed bg-background/80 backdrop-blur left-0 top-0 z-40">
          <Sidebar session={session} active={sidebarActive}>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className="border-1 shadow"
            >
              <HiOutlineMenuAlt1 size={16} />
            </Button>
          </Sidebar>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 ml-4 min-w-max">
              <div className="flex items-center justify-center min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
                <Image
                  src="/logo.png"
                  alt="Scoopika logo"
                  width={35}
                  height={35}
                  className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <RxSlash />
              <div className="text-xs">{title}</div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-5">
            {session?.user.plan === "none" && (
              <Button
                startContent={<BsStars size={15} />}
                as={Link}
                href="/app/upgrade"
                size="sm"
                color="primary"
                className="font-semibold ml-2"
              >
                Upgrade plan
              </Button>
            )}
          </div>
        </div>

        <div className="pt-14 h-full">{children}</div>
      </div>
    </div>
  );
}
