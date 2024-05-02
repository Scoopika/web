import { Session } from "next-auth";
import { FC } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { HiMiniHome } from "react-icons/hi2";
import { RiRobot2Fill, RiSettings4Fill } from "react-icons/ri";
import { Tb3DCubeSphere } from "react-icons/tb";
import { AiFillApi } from "react-icons/ai";
import { BiSolidBookContent } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { MdApi } from "react-icons/md";
import { FaBook } from "react-icons/fa";

import UserDropdown from "../userDropdown";
import Link from "next/link";
import Image from "next/image";

interface Props {
  session: Session | null;
  active?: string;
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
    name: "Overview",
    path: "/app",
    icon: <HiMiniHome size={18} />,
  },
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
    name: "Edge APIs",
    path: "/app",
    icon: <MdApi size={18} />,
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

const Sidebar: FC<Props> = ({ session, active }) => {
  return (
    <>
      <div className="min-w-64 max-w-64 fixed border-r-1 min-h-full max-h-full overflow-auto flex flex-col z-50">
        <div className="flex items-center gap-2 h-14 p-4 border-b-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
            <Image
              src="/logo.png"
              alt="Scoopika logo"
              width={40}
              height={40}
              className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <ChevronRightIcon />
          <UserDropdown session={session} type="avatar" />
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
                className={`p-2 text-sm flex items-center gap-3 font-base rounded-md transition-all ${
                  active === link.name ? "bg-foreground text-background" : "hover:bg-black/10 dark:hover:bg-foreground/5"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
