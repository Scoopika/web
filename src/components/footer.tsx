"use client";

import Logo from "./logo";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import SvgLogo from "./main/logo";

const links: { link: string; icon: React.ReactNode }[] = [
  {
    link: "https://twitter.com/scoopika_",
    icon: <FaXTwitter />,
  },
  {
    link: "https://github.com/scoopika",
    icon: <FaGithub />,
  },
  {
    link: "mailto:team@scoopika.com",
    icon: <MdEmail />,
  },
];

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return (
    <footer
      className={`w-full border-t-1 p-10 border-black/20 dark:border-border flex flex-col md:flex-row gap-14 ${className}`}
    >
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center text-sm">
          <div className="w-9 h-9 overflow-hidden rounded-xl bg-white flex items-center justify-center pt-1">
            <SvgLogo />
          </div>
          <div className="font-semibold ml-3">Scoopika</div>
        </div>
        <div className="flex items-center gap-3 mt-8">
          {links.map((link, index) => (
            <Link
              href={link.link}
              target="_blank"
              key={`footerlink-${index}`}
              className="opacity-80 hover:opacity-100 transition-all"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <p>Products</p>
        <Link
          href="https://docs.scoopika.com/agents"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Agents
        </Link>
        <Link
          href="https://docs.scoopika.com/mutli-agent-boxes"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Multi-agent boxes
        </Link>
        <Link
          href="https://docs.scoopika.com/tools"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Tools
        </Link>
        <Link
          href="https://docs.scoopika.com/history-stores"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          History stores
        </Link>
        <Link
          href="https://docs.scoopika.com/tools/client-side-actions"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Client-side actions
        </Link>
      </div>

      <div className="flex flex-col w-full gap-4">
        <p>Resources</p>
        <Link
          href="https://docs.scoopika.com"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Documentation
        </Link>
        <Link
          href="https://github.com/scoopika"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Github
        </Link>
        <Link
          href="/privacy_policy.pdf"
          target="_blank"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Privacy Policy
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <ThemeToggle />
      </div>
    </footer>
  );
}
