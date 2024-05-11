"use client";

import Image from "next/image";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeTxt } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { TbTools } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { LuMessageSquareDashed } from "react-icons/lu";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darkTheme from "@/lib/codeTheme";
import lightTheme from "@/lib/lightCodeTheme";
import initCode from "@/components/code/init";
import runCode from "@/components/code/run";
import { useTheme } from "next-themes";

export default function Bento() {
  const { theme } = useTheme();

  return (
    <>
      <div className="w-[80%] relative flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-10">
          Everything you need in one place
        </h2>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center gap-4">
            <div className="w-full flex flex-col gap-2 p-4 border-1 rounded-lg min-w-[60%] min-h-72 max-h-72 relative">
              <div className="w-full flex items-center justify-center min-h-36 max-h-36 gap-3">
                <div className="h-full flex flex-col gap-4 justify-center">
                  <div className="w-7 h-7 border-1 rounded-full flex items-center justify-center">
                    <BsFiletypeTxt />
                  </div>
                  <div className="w-7 h-7 border-1 rounded-full flex items-center justify-center ml-4">
                    <FaRegFilePdf />
                  </div>
                  <div className="w-7 h-7 border-1 rounded-full flex items-center justify-center">
                    <FaLink />
                  </div>
                </div>
                <FaLongArrowAltRight />
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
                  <Image
                    src="/logo.png"
                    alt="Scoopika logo"
                    width={40}
                    height={40}
                    className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <FaLongArrowAltRight />
                <div className="flex flex-col items-center justify-center text-xs gap-1 mt-3">
                  <div className="w-9 h-9 border-1 rounded-full flex items-center justify-center">
                    <LuBrainCircuit size={18} />
                  </div>
                  <p className="opacity-70">LLM</p>
                </div>
              </div>
              <div className="w-full flex flex-col justify-end border-t-1 rounded-b-lg absolute bottom-0 left-0 p-4 gap-2 bg-accent/80 dark:bg-accent/30">
                <h3 className="font-semibold">Plug any data</h3>
                <p className="text-xs opacity-80">
                  Easily integrate various types of data into your agents,
                  including text, PDF files, websites, audio, and custom
                  retrieval functions.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col border-1 rounded-lg gap-2 min-h-72 max-h-72 relative">
              <div className="w-full flex min-h-48 max-h-48 overflow-hidden gap-3 bg-foreground dark:bg-background rounded-t-lg">
                <SyntaxHighlighter
                  language="typescript"
                  className="w-full h-full text-xs bg-transparent"
                  style={
                    theme === "dark" ? (darkTheme as any) : (lightTheme as any)
                  }
                >
                  {initCode}
                </SyntaxHighlighter>
              </div>
              <div className="w-full flex flex-col justify-end border-t-1 absolute bottom-0 left-0 p-4 gap-2 bg-accent/80 dark:bg-accent/30 backdrop-blur-xl rounded-b-lg">
                <h3 className="font-semibold">Straight to the point</h3>
                <p className="text-xs opacity-80">
                  Streamlined interface ensures straightforward usage with no
                  need for workarounds or complicated setups.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <div className="w-full flex flex-col border-1 rounded-lg gap-2 min-h-72 max-h-72 relative">
              <div className="w-full flex min-h-48 max-h-48 overflow-hidden gap-3 bg-foreground dark:bg-background rounded-t-lg">
                <SyntaxHighlighter
                  language="typescript"
                  className="w-full h-full text-xs bg-transparent"
                  style={
                    theme === "dark" ? (darkTheme as any) : (lightTheme as any)
                  }
                >
                  {runCode}
                </SyntaxHighlighter>
              </div>
              <div className="w-full flex flex-col justify-end border-t-1 absolute bottom-0 left-0 p-4 gap-2 bg-accent/80 dark:bg-accent/30 backdrop-blur-xl rounded-b-lg">
                <h3 className="font-semibold">Web-first approach</h3>
                <p className="text-xs opacity-80">
                  Designed with a focus on web-first integration, providing
                  real-time hooks between client and server.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 p-4 border-1 rounded-lg min-w-[60%] min-h-72 max-h-72 relative">
              <div className="w-full flex items-center justify-center min-h-36 max-h-36 gap-3">
                <div className="flex flex-col items-center justify-center text-xs gap-1 mt-3">
                  <div className="w-9 h-9 border-1 rounded-full flex items-center justify-center">
                    <TbTools size={18} />
                  </div>
                  <p className="opacity-70">Tool call</p>
                </div>
                <FaLongArrowAltRight />
                <div className="flex flex-col items-center justify-center text-xs gap-1 mt-3">
                  <div className="w-9 h-9 border-1 rounded-full flex items-center justify-center border-orange-400 bg-orange-400/5 text-orange-500">
                    <IoIosWarning size={18} />
                  </div>
                  <p className="opacity-70 text-orange-500">Validtion error</p>
                </div>
                <FaLongArrowAltRight />
                <div className="flex flex-col items-center justify-center text-xs gap-1 mt-3">
                  <div className="w-9 h-9 border-1 rounded-full flex items-center justify-center">
                    <TbReportSearch size={18} />
                  </div>
                  <p className="opacity-70">Report</p>
                </div>
                <FaLongArrowAltRight />
                <div className="flex flex-col items-center justify-center text-xs gap-1 mt-3">
                  <div className="w-9 h-9 border-1 rounded-full flex items-center justify-center border-violet-400 bg-violet-400/5 text-violet-500">
                    <LuMessageSquareDashed size={18} />
                  </div>
                  <p className="opacity-70 text-center text-violet-500">
                    communicate
                    <br /> with user
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col justify-end border-t-1 absolute bottom-0 left-0 p-4 gap-2 bg-accent/80 dark:bg-accent/30 rounded-b-lg">
                <h3 className="font-semibold">
                  Error healing and reporting
                </h3>
                <p className="text-xs opacity-80">
                  Agents automatically detect and report errors, communicating
                  with users regarding missing or incorrect data to ensure
                  seamless interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
