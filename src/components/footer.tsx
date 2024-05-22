"use client";

import Logo from "./logo";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const links: {link: string; icon: React.ReactNode}[] = [
  {
    link: "https://twitter.com/scoopika_",
    icon: <FaXTwitter />
  },
  {
    link: "https://github.com/scoopika",
    icon: <FaGithub />
  },
  {
    link: "mailto:team@scoopika.com",
    icon: <MdEmail />
  }
]

export default function Footer() {
  return (
    <footer className="w-full bg-accent/10 border-t-1 p-12 border-black/20 dark:border-border flex gap-14">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <Logo />
          <p className="font-bold text-inherit text-[1.05rem] ml-3">Scoopika</p>
        </div>
        <p className="text-sm opacity-70 mt-4 mb-6">
          © {new Date().getFullYear()} Scoopika - Built by Kais Radwan
        </p>
        <div className="flex items-center gap-3">
          {links.map((link, index) => (
            <Link href={link.link} target="_blank" key={`footerlink-${index}`} className="opacity-80 hover:opacity-100 transition-all">
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
          className="text-sm opacity-70"
        >
          Agents
        </Link>
        <Link
          href="https://docs.scoopika.com/mutli-agent-boxes"
          target="_blank"
          className="text-sm opacity-70"
        >
          Multi-agent boxes
        </Link>
        <Link
          href="https://docs.scoopika.com/tools"
          target="_blank"
          className="text-sm opacity-70"
        >
          Tools
        </Link>
        <Link
          href="https://docs.scoopika.com/history-stores"
          target="_blank"
          className="text-sm opacity-70"
        >
          History stores
        </Link>
        <Link
          href="https://docs.scoopika.com/tools/client-side-actions"
          target="_blank"
          className="text-sm opacity-70"
        >
          Client-side actions
        </Link>
      </div>

      <div className="flex flex-col w-full gap-4">
        <p>Resources</p>
        <Link
          href="https://docs.scoopika.com"
          target="_blank"
          className="text-sm opacity-70"
        >
          Documentation
        </Link>
        <Link
          href="https://github.com/scoopika"
          target="_blank"
          className="text-sm opacity-70"
        >
          Github
        </Link>
        <Link
          href="/privacy_policy.pdf"
          target="_blank"
          className="text-sm opacity-70"
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
