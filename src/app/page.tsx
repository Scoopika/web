import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@nextui-org/react";
import { FiChevronRight } from "react-icons/fi";
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import GridSmallBackground from "@/components/backgrounds/grid";
import Features from "@/components/landing/features";
import Link from "next/link";
import { LuBrainCircuit } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { TbWorldBolt } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { FiDatabase } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darkTheme from "@/lib/codeTheme";
import runCode from "@/components/code/run";
import Footer from "@/components/footer";
import TestScoopika from "@/components/testscoopika";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} active="Home" />
      {/* <TestScoopika /> */}

      <div className="flex flex-col items-center gap-3 relative w-full">
        <GridSmallBackground className="flex flex-col items-center relative gap-3 pt-36">
          
          <h1 className="text-6xl font-semibold text-center mb-3 flex items-center gap-3">
            <span className="text-violet-500 flex items-center gap-1">
              <RiRobot2Fill />
              AI Agents
            </span>{" "}
            For Your
          </h1>
          <h1 className="text-5xl font-semibold text-center mb-5">
            Application In <span className="underline">Minutes</span>
          </h1>
          <div className="mt-2 opacity-90 text-center text-base max-w-[50%] mb-16">
            Easily integrate AI agents equipped with external tools
            into your app.<br /> Data validation & type-safety, errors recovery, real-time
            streaming, and managed long-term memory out-of-the-box
          </div>
          <Button
            size="lg"
            color="primary"
            variant="bordered"
            radius="sm"
            className="font-bold border-1 border-black/30 border-t-black/60 dark:border-white/30 dark:border-t-white/60 hover:bg-accent/40 backdrop-blur"
            endContent={<IoMdArrowRoundForward />}
            as={Link}
            href="/app"
          >
            Start for free
          </Button>
          <p className="text-sm opacity-80 pb-16">
            Connect your LLMs - Pay only for extra features
          </p>
        </GridSmallBackground>
      </div>

      <div className="flex flex-col items-center mb-48">
        <Features />
      </div>

      <div className="flex flex-col items-center mb-48">
        <div className="w-[80%] flex flex-col items-center">
          <div className="mb-6 flex items-center gap-2 opacity-80">
            <LuBrainCircuit />
            Make your application AI-powered today!
          </div>
          <div className="text-4xl font-semibold mb-3">
            Give your users a taste of the future
          </div>
          <div className="opacity-70">
            A platform you can rely on to bring AI features to your application
          </div>

          <div className="w-full flex items-center justify-center mt-12 gap-3">
            <div className="w-full group border-1 rounded-xl rounded-tl-3xl flex flex-col items-center hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="absolute top-4 left-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 right-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute -bottom-6 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="flex flex-col gap-5 w-14 pt-6 h-full items-center justify-center group-hover:opacity-0 group-hover:-translate-x-2 transition-all">
                    <div className="w-12 border-t-1"></div>
                    <div className="w-12 border-t-1 mr-6"></div>
                    <div className="w-12 border-t-1 mr-3"></div>
                  </div>
                  <CiLock
                    className="rotate-[-15deg] opacity-50 group-hover:-translate-x-7 transition-all group-hover:rotate-0"
                    size={100}
                  />
                </div>
              </div>
              <div className="p-4 pt-8 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Safe out of the box
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  LLM output is always validated with full type-safety and
                  errors auto healing
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl rounded-tr-3xl flex flex-col items-center hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="absolute top-4 left-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 right-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute -bottom-6 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="top-0 left-0 w-full h-full flex items-center justify-center">
                  <TbWorldBolt
                    className="rotate-[15deg] opacity-50 group-hover:translate-x-7 transition-all group-hover:rotate-0"
                    size={100}
                  />
                  <div className="flex flex-col gap-5 w-14 pt-6 h-full items-center justify-center group-hover:opacity-0 group-hover:translate-x-2 transition-all">
                    <div className="w-12 border-t-1"></div>
                    <div className="w-12 border-t-1 ml-6"></div>
                    <div className="w-12 border-t-1 ml-3"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-8 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Built for the web
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Real-time responses streaming with seamless interaction &
                  client-side actions
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3 mt-3">
            <div className="w-full group border-1 rounded-xl rounded-bl-3xl flex flex-col items-center hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="w-full h-full max-h-full overflow-hidden flex flex-col items-center p-3">
                <div className="flex flex-col w-full group-hover:-translate-y-36 transition-all">
                  <div className="text-xs p-2 border-1 rounded-lg">
                    <div className="opacity-60 mb-1">user</div>
                    Check my website analytics, write a report about it, and
                    publish it to my blog
                  </div>
                  <div className="text-xs p-2 border-1 rounded-lg mt-3">
                    <div className="opacity-60 mb-1">writer (agent)</div>
                    <div className="opacity-60 mb-2 flex items-center gap-1">
                      <FaCheck />
                      called get_web_traffic
                    </div>
                    Your report is ready!
                  </div>
                  <div className="text-xs p-2 border-1 rounded-lg mt-3">
                    <div className="opacity-60 mb-1">publisher (agent)</div>
                    <div className="opacity-60 mb-2 flex items-center gap-1">
                      <FaCheck />
                      called publish_blog_post
                    </div>
                    The report is published to your main blog!
                  </div>
                  <div className="text-xs opacity-50 w-full text-center mt-4">
                    Multi-agent box example
                  </div>
                </div>
              </div>
              <div className="p-4 pt-6 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Next-level AI agents
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Equip AI agents with custom tools; and let them collaborate
                  together
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl flex flex-col items-center hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="w-full h-full flex flex-col items-center justify-center relative p-2">
                <FiDatabase size={50} className="opacity-70" />
                <div className="w-full flex items-center justify-center mt-2">
                  <div className="h-4 border-r-1"></div>
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="w-8 border-t-1"></div>
                </div>
                <div className="mt-3 flex items-center gap-2 overflow-hidden group-hover:translate-x-36 transition-all">
                  {Array.from({ length: 10 }, (_, n) => n + 1).map(
                    (i, index) => (
                      <div
                        key={`session-${index}`}
                        className="text-xs p-1 pl-3 pr-3 border-1 rounded-full bg-accent/10"
                      >
                        session_{i}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 overflow-hidden group-hover:-translate-x-36 transition-all">
                  {Array.from({ length: 10 }, (_, n) => n + 10).map(
                    (i, index) => (
                      <div
                        key={`session-2-${index}`}
                        className="text-xs p-1 pl-3 pr-3 border-1 rounded-full bg-accent/10"
                      >
                        session_{i}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="p-4 pt-6 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Managed memory sessions
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Deploy a Serverless data store for persistent chat sessions
                  with no setup
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl rounded-br-3xl flex flex-col items-center hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="w-full h-full flex flex-col items-center justify-center relative max-h-full overflow-hidden bg-foreground dark:bg-background">
                <SyntaxHighlighter
                  language="typescript"
                  className="w-full h-full text-xs bg-transparent"
                  style={{ ...darkTheme } as any}
                >
                  {runCode}
                </SyntaxHighlighter>
              </div>
              <div className="p-4 pt-6 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Scoopika is yours
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Scoopika is flexible, open-source, and built to give you full
                  control to build anything
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-48">
        <div className="w-[80%] flex flex-col items-center">
          <div className="mb-6 flex items-center gap-2 opacity-80">
            {"We're"} done talking
          </div>
          <div className="text-4xl font-semibold mb-3">
            What you waiting for?
          </div>
          <div className="opacity-70 mb-8">
            Hop in and try it for yourself. Start for free ({"It's"} free
            forever actually)
          </div>
          <Button
            color="primary"
            className="mt-4 font-semibold"
            as={Link}
            href="/login"
          >
            {"Let's goooo"}
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}
