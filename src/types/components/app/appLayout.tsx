import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { BsStars, BsThreeDots } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import Sidebar from "./sidebar";
import Starting from "./starting";

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
      <Sidebar session={session} active={sidebarActive} />
      <Starting />
      <div className="w-full flex flex-col pl-64">
        <div className="border-b-1 w-full p-6 h-14 flex items-center fixed bg-background/80 backdrop-blur left-0 top-0 pl-64 z-40">
          <h3 className="text-md font-semibold min-w-max pl-6">{title}</h3>
          <div className="w-full flex items-center justify-end gap-5">
            {session?.user.plan === "none" && (
              <Button
                startContent={<BsStars size={15} />}
                as={Link}
                href="/upgrade"
                size="sm"
                color="primary"
                className="font-semibold mr-2"
              >
                Upgrade plan
              </Button>
            )}
            <div className="w-7 h-7 border-1 rounded-md flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-all">
              <GoBellFill size={15} />
            </div>
            <div className="w-7 h-7 border-1 rounded-md flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-all">
              <BsThreeDots />
            </div>
          </div>
        </div>

        <div className="pt-14 h-full">{children}</div>
      </div>
    </div>
  );
}
