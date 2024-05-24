import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import Sidebar from "./sidebar";
import Starting from "./starting";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Start, { StartProps } from "./start";

interface Props {
  session: Session;
  title: string;
  sidebarActive: string;
  children: React.ReactNode;
  start?: StartProps;
}

export default function AppLayout({
  session,
  title,
  sidebarActive,
  children,
  start
}: Props) {

  return (
    <div className="w-full min-h-screen max-h-screen flex">
      <Starting />
      <div className="w-full flex flex-col">
        <div className="border-b-1 w-full p-6 pl-64 h-14 flex items-center fixed bg-background/80 backdrop-blur left-0 top-0 z-40">
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
          <div className="flex items-center gap-1 pl-2">
            <div className="flex items-center gap-2 ml-4 min-w-max">
              <div className="text-xs p-1 pl-3 pr-3 bg-accent/40 rounded-full font-bold">
                {title}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-4">
            {start && <Start steps={start.steps} />}
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

        <div className="pt-14 pl-64 h-full">{children}</div>
      </div>
    </div>
  );
}
