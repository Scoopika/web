"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaDatabase } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { Tb3DCubeSphere } from "react-icons/tb";
import { FaChevronLeft } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import SvgLogo from "./logo";
import ThemeToggle from "../themeToggle";
import { FaBook } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { Session } from "next-auth";
import { isPro, readPlan, readPlanType } from "@/scripts/plan";
import Settings from "./settings";
import { UpgradeButton } from "./upgradeButton";
import UpgradeDialog from "./upgradeDialog";
import { MdVoiceChat } from "react-icons/md";

interface Props {
  children: React.ReactNode;
  session: Session;
}

interface SideLink {
  type: "link";
  name: string;
  target?: string;
  path: string;
  icon: React.ReactElement;
}

type SideItem = SideLink;

const links: SideItem[] = [
  {
    type: "link",
    name: "Home",
    path: "/app",
    icon: <AiFillHome size={18} />,
  },
  {
    type: "link",
    name: "Agents",
    path: "/app/agents",
    icon: <RiRobot2Fill size={18} />,
  },
  {
    type: "link",
    name: "Multi-Agent Boxes",
    path: "/app/boxes",
    icon: <Tb3DCubeSphere size={18} />,
  },
  {
    type: "link",
    name: "History Stores",
    path: "/app/data-stores",
    icon: <FaDatabase size={17} />,
  },
  {
    type: "link",
    name: "Playground",
    path: "/app/playground",
    icon: <MdVoiceChat size={20} />,
  },
  {
    type: "link",
    name: "Plan & Usage",
    path: "/app/usage",
    icon: <FaChartSimple size={18} />,
  },
];

export default function MainLayout({ children, session }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [path, setPath] = useState<string>("");
  const plan = readPlan(session.user.plan);

  useEffect(() => {
    if (typeof window !== undefined) {
      setPath(location.pathname);
    }
  }, []);

  return (
    <div className="w-full min-h-screen max-h-screen overflow-auto flex flex-col pb-36">
      <div className="fixed w-full pl-6 pr-6 min-h-16 max-h-16 flex items-center z-50 bg-background md:border-b-1">
        <div className="w-full flex items-center text-sm pl-2">
          <div className="w-9 h-9 overflow-hidden rounded-xl bg-white flex items-center justify-center pt-1">
            <SvgLogo />
          </div>
          <div className="font-semibold ml-3">Scoopika</div>
        </div>
        <div className="min-w-max flex items-center justify-end gap-4">
          {plan.type === "free" && (
            <UpgradeDialog title="Upgrade plan" price={false} className="hidden md:flex" />
          )}
          <Button
            size="sm"
            variant="bordered"
            className="border-1 dark:border-white/20 hidden md:flex"
            startContent={<FaBook />}
            as={Link}
            href="https://docs.scoopika.com"
            target="_blank"
          >
            Docs
          </Button>
          <ThemeToggle />
          <Settings session={session} />
        </div>
      </div>

      {/* Desktop navbar */}
      <div
        className={`w-full flex h-full ${
          sidebarOpen ? "md:pl-72" : "md:pl-24"
        } pt-16 transition-all`}
      >
        <div
          className={`fixed top-0 left-0 z-10 ${
            sidebarOpen ? "min-w-72 max-w-72" : "min-w-24 max-w-24"
          } h-screen pt-12 transition-all hidden md:block`}
        >
          <div
            className={`w-full h-full relative text-foreground flex flex-col gap-4 border-r-1 ${
              sidebarOpen ? "p-6 pt-12" : "p-2"
            }`}
          >
            {sidebarOpen && (
              <Link
                href={!isPro(session?.user?.plan) ? "/pricing" : "/app/usage"}
                className="p-3 mb-2 rounded-xl border-1 border-dashed border-black/30 dark:border-white/20 text-xs flex items-center hover:border-black/50 dark:hover:border-white/50 transition-all"
              >
                <div className="w-full">
                  <div className="font-semibold min-w-max truncate">
                    Plan: {readPlanType(session.user.plan)}
                  </div>
                  <div className="opacity-70 min-w-max truncate">
                    {isPro(session?.user?.plan) ? "Manage plan" : "See pricing"}
                  </div>
                </div>
                <FaChevronRight />
              </Link>
            )}
            {links.map((link, index) => (
              <Button
                key={`sidebar-fulllink-${link.name}-${index}`}
                color={link.path === path ? "default" : "secondary"}
                variant={link.path === path ? "solid" : "light"}
                size="sm"
                className={`w-full min-w-max font-semibold ${
                  link.path !== path && "text-foreground"
                } ${sidebarOpen && "justify-start"}`}
                startContent={link.icon}
                as={Link}
                href={link.path}
                target={link.target}
                onPress={() => setPath(link.path)}
                isIconOnly={!sidebarOpen}
              >
                {sidebarOpen && link.name}
              </Button>
            ))}
          </div>
        </div>

        {/*Mobile navbar*/}
        <div
          className={`w-full h-16 fixed bottom-0 left-0 bg-background/80 backdrop-blur border-1 rounded-t-xl text-foreground flex items-center justify-between md:hidden gap-3 pl-6 pr-6 z-50`}
        >
          {links.map((link, index) => (
            <Button
              key={`sidebar-fulllink-${link.name}-${index}`}
              color={link.path === path ? "primary" : "secondary"}
              variant={link.path === path ? "solid" : "light"}
              size="sm"
              className={`min-w-max font-semibold gap-2 ${
                link.path !== path && "text-foreground"
              }`}
              startContent={link.icon}
              as={Link}
              href={link.path}
              target={link.target}
              onPress={() => setPath(link.path)}
              isIconOnly={path !== link.path}
            >
              {path === link.path && link.name}
            </Button>
          ))}
        </div>

        <div className="w-full rounded-2xl md:rounded-none">
          <div className="pl-8 pr-8 pt-8 pb-0 relative overflow-hidden flex flex-col gap-8 rounded-2xl md:rounded-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
