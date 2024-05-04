import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { BsStars, BsThreeDots } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import Sidebar from "./sidebar";
import Starting from "./starting";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Badge } from "@/components/ui/badge";

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
          <h3 className="text-md font-semibold min-w-max pl-3">{title}</h3>
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
