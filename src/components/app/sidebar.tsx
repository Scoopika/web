import { Session } from "next-auth";
import { FC } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { HiMiniHome } from "react-icons/hi2";
import { RiRobot2Fill, RiSettings4Fill } from "react-icons/ri";
import { Tb3DCubeSphere } from "react-icons/tb";
import { MdApi } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import UserDropdown from "../userDropdown";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../themeToggle";

interface Props {
  session: Session | null;
  active?: string;
  children: React.ReactNode;
}

interface SideLink {
  type: "link";
  name: string;
  path: string;
  icon: React.ReactElement;
}

interface SideSep {
  type: "sep";
}

type SideItem = SideSep | SideLink;

const links: SideItem[] = [
  {
    type: "link",
    name: "Agents",
    path: "/app",
    icon: <RiRobot2Fill size={18} />,
  },
  {
    type: "link",
    name: "Smart Boxes",
    path: "/app/boxes",
    icon: <Tb3DCubeSphere size={18} />,
  },
  {
    type: "link",
    name: "Data Stores",
    path: "/app/data-stores",
    icon: <FaDatabase size={18} />,
  },
  // {
  //   type: "link",
  //   name: "AI-gen Content",
  //   path: "/app",
  //   icon: <BiSolidBookContent size={18} />,
  // },
  {
    type: "sep",
  },
  {
    type: "link",
    name: "Documentation",
    path: "/app",
    icon: <FaBook size={16} />,
  },
  {
    type: "link",
    name: "Settings",
    path: "/app/settings",
    icon: <RiSettings4Fill size={18} />,
  },
];

const Sidebar: FC<Props> = ({ session, active, children }) => {
  return (
    <div className="fixed top-0 left-0 w-64 border-r-1 min-h-screen max-h-screen z-40 bg-background">
      <div className="flex items-center gap-2 h-14 p-4 pb-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
          <Image
            src="/logo.png"
            alt="Scoopika logo"
            width={40}
            height={40}
            className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <p className="font-semibold text-sm">Scoopika</p>
      </div>

      <div className="flex flex-col gap-3 p-4 mt-2">
        {links.map((link) => {
          if (link.type === "sep") {
            return (
              <div
                key={`sep-${Math.random()}`}
                className="w-full border-t-1 mt-1 mb-1"
              ></div>
            );
          }

          return (
            <Link
              href={link.path}
              key={`sidelink-${link.name}`}
              className={`p-2 text-sm flex items-center gap-3 font-base rounded-lg transition-all ${
                active === link.name
                  ? "bg-black/20 dark:bg-accent/50"
                  : "hover:bg-black/10 dark:hover:bg-foreground/5"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="p-6 absolute bottom-0 left-0">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
