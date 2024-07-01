import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CiLock } from "react-icons/ci";
import { TbWorldBolt } from "react-icons/tb";
import { FaChevronRight, FaGithub, FaImage, FaXTwitter } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darkTheme from "@/lib/codeTheme";
import runCode from "@/components/code/run";
import Footer from "@/components/footer";
import { SparklesCore } from "@/components/ui/sparkles";
import "@/styles/landing.css";
import Features from "@/components/landing/features";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-foreground text-background dark:bg-background dark:text-foreground">
      <div className="soptheader">
        <div className="spotlight">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Navbar session={session} active="Home" className="dark" />

      <div className="relative w-full flex flex-col items-center p-8 pt-20 md:p-12 md:pt-36 overflow-hidden rounded-md dark">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#919191"
          />
        </div>
        <div className="p-1 pl-3 pr-3 text-xs border border-dashed rounded-lg mb-6 border-white/20 backdrop-blur">
          v1 is officially out!
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl opacity-0">
            AI Agents for your application
          </h2>
        </div>
        <div className="heroT">
          <div className="font-semibold text-center text-3xl md:text-4xl lg:text-5xl heroT_1">
            AI Agents for your application
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl heroT_2">
            AI Agents for your application
          </div>
        </div>
        <p className="opacity-80 text-xs md:text-sm lg:text-base text-center lg:max-w-[50%] mt-4">
          The open-source developer platform to build personalzied AI agents
          that can <b>see, talk, listen, learn, and take actions</b>
        </p>
        <div className="flex flex-col md:flex-row md:items-center gap-6 mt-10">
          <Button
            variant="flat"
            size="md"
            as={Link}
            href="/login"
            className="border backdrop-blur-xl border-white/20"
            endContent={<FaChevronRight size={14} />}
          >
            Start for free
          </Button>
          <Button
            variant="light"
            size="md"
            as={Link}
            href="https://docs.scoopika.com"
            target="_blank"
            endContent={<FaChevronRight size={14} />}
          >
            Documentation
          </Button>
        </div>
        <Features />
      </div>

      <div className="w-full"></div>

      <div className="flex flex-col items-center mb-48 mt-12 sm:mt-36 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Made for the AI era
          </div>
          <div className="opacity-70 text-center">
            A platform you can rely on to take your application to the future
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-center mt-12 sm:pl-8 sm:pr-8 gap-4">
            <div className="w-full group border-1 rounded-xl rounded-tl-3xl flex flex-col items-center bg-black hover:border-white/20 transition-all overflow-hidden h-72 hover:-translate-x-4 hover:-translate-y-4">
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
                    className="rotate-[-15deg] group-hover:-translate-x-7 transition-all group-hover:rotate-0"
                    size={100}
                  />
                </div>
              </div>
              <div className="p-4 pt-8 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Safe out of the box
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Encryption, LLM output validation with full type-safety, and
                  errors recovery
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl rounded-tr-3xl flex flex-col items-center bg-black hover:border-white/20 transition-all overflow-hidden h-72 hover:translate-x-4 hover:-translate-y-4">
              <div className="h-full w-full relative flex items-center justify-center">
                <div className="absolute top-4 left-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 right-10 h-full w-2 border-r-1 border-dashed"></div>
                <div className="absolute top-4 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="absolute -bottom-6 left-0 w-full h-2 border-t-1 border-dashed"></div>
                <div className="top-0 left-0 w-full h-full flex items-center justify-center">
                  <TbWorldBolt
                    className="rotate-[15deg] group-hover:translate-x-7 transition-all group-hover:rotate-0"
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
                  Full edge compatibility with real-time streaming
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center sm:pr-8 sm:pl-8 gap-4 mt-4">
            <div className="w-full group border-1 rounded-xl rounded-bl-3xl flex flex-col items-center bg-black hover:border-white/20 transition-all overflow-hidden h-72 hover:-translate-x-4 hover:translate-y-4">
              <div className="w-full h-full flex items-center justify-center p-3 gap-3">
                <div className="w-20 h-20 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-14 group-hover:h-14">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
                <div className="w-14 h-14 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-10 group-hover:h-10">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
                <div className="w-10 h-10 bg-accent/30 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all group-hover:w-20 group-hover:h-20">
                  <FaImage size={20} className="group-hover:text-black" />
                </div>
              </div>
              <div className="p-4 pt-6 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">Vision</div>
                <div className="text-xs opacity-80 w-full text-center">
                  Built-in support for vision and images based on the LLM{" "}
                  {"you're"} using
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl flex flex-col items-center bg-black hover:border-white/20 transition-all overflow-hidden h-72">
              <div className="w-full h-full flex items-center justify-center gap-1 relative p-2">
                <div className="w-6 h-20 bg-white rounded-xl transition-all group-hover:h-14"></div>
                <div className="w-6 h-10 bg-white rounded-xl transition-all group-hover:h-20"></div>
                <div className="w-6 h-16 bg-white rounded-xl transition-all group-hover:h-10"></div>
                <div className="w-6 h-14 bg-white rounded-xl transition-all group-hover:h-16"></div>
              </div>
              <div className="p-4 pt-6 pb-6 flex flex-col w-full">
                <div className="w-full text-center text-sm mb-2">
                  Voice chat
                </div>
                <div className="text-xs opacity-80 w-full text-center">
                  Agents can speak in real-time powering interactive voice chat
                  with users
                </div>
              </div>
            </div>

            <div className="w-full group border-1 rounded-xl rounded-br-3xl flex flex-col items-center bg-black hover:border-white/20 transition-all overflow-hidden h-72 hover:translate-x-4 hover:translate-y-4">
              <div className="w-full h-full flex flex-col items-center justify-center relative max-h-full overflow-hidden bg-black">
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

      <div className="flex flex-col items-center mb-48 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Smart AI assistants that impress users
          </div>
          <div className="opacity-70 text-center">
            Make your application AI-accessible today and join the AI revolution
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center mt-12 sm:pl-8 sm:pr-8 gap-4">
            <div className="w-full flex flex-col p-8 bg-black rounded-3xl h-72 sm:h-64">
              <div className="font-semibold text-xl mb-2">
                Powerful & Efficient
              </div>
              <div className="text-sm sm:text-base opacity-70 mb-8">
                Scoopika works on your servers and with your LLMs, providing all
                its features without adding any extra latency or costs.
              </div>
              <div className="h-full"></div>
              <div className="w-full flex gap-3 items-center justify-between pb-4">
                <div className="w-2 h-2 bg-green-400"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full"></div>
              </div>
            </div>
            <div className="w-full flex flex-col p-8 bg-black rounded-3xl h-72 sm:h-64">
              <div className="font-semibold text-xl mb-2">
                Reactive interactions
              </div>
              <div className="text-sm sm:text-base opacity-70 mb-4">
                Build interactive real-time AI features and let agents perform
                actions based on contextual clues with both text and voice
                interactions.
              </div>
              <div className="h-full"></div>
              <div className="flex items-center gap-3">
                <div className="p-4 rounded-2xl bg-accent/40">
                  <div className="text-sm mb-1 opacity-70">
                    TTFB with knowledge & voice
                  </div>
                  <div className="font-semibold">LLM TTFT + ~300ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-48 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Playground
          </div>
          <div className="opacity-70 text-sm sm:text-base text-center mb-8">
            Create an agent and try it in the platform playground in under a
            minute
            <br />
            with support for text, images, and voice.
          </div>
          <img
            src="/images/playground.png"
            className="w-full sm:w-[80%] object-cover border rounded-2xl p-2 bg-accent/30"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mb-48 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Open Source
          </div>
          <div className="opacity-70 text-center mb-8">
            Tools and integrations to simplify your development process
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex gap-4">
            <Link
              href="https://docs.scoopika.com/packages/ts/scoopika"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 hover:scale-105 h-48"
            >
              <div className="mb-2 text-lg">@scoopika/scoopika</div>
              <div className="text-sm opacity-70 mb-4">
                Run agents on the server-side & deploy a HTTP based Scoopika API
                endpoint with streaming support
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <Link
              href="https://docs.scoopika.com/packages/ts/client"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 hover:scale-105 h-48"
            >
              <div className="mb-2 text-lg">@scoopika/client</div>
              <div className="text-sm opacity-70 mb-4">
                Run agents on the client-side with built-in support for
                real-time streaming and client-side actions
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <Link
              href="https://docs.scoopika.com/packages/ts/react"
              target="_blank"
              className="p-6 bg-accent/30 rounded-3xl w-full transition-all hover:bg-accent/40 hover:scale-105 h-48"
            >
              <div className="mb-2 text-lg">@scoopika/react</div>
              <div className="text-sm opacity-70 mb-4">
                Building blocks to use Scoopika in React projects with built-in
                state management. Scoopika playground was built using this
              </div>
              <div className="p-1 pl-2 pr-2 text-xs bg-blue-400/10 text-blue-400 max-w-max rounded-full font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Typescript
              </div>
            </Link>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48"></div>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48 hidden md:flex"></div>
            <div className="p-6 border-1 rounded-3xl opacity-80 h-48 hidden md:flex"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-48 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Community
          </div>
          <div className="opacity-70 text-center mb-8">
            A growing community of developers just like you
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 flex gap-3 items-center justify-center">
            <Link
              href="https://github.com/scoopika"
              target="_blank"
              className="h-72 p-6 bg-accent/30 rounded-3xl flex flex-col items-center transition-all hover:bg-accent/40 relative"
            >
              <FaGithub size={50} className="mt-10" />
              <FaGithub
                size={150}
                className="absolute opacity-5 w-full h-full p-10"
              />
              <div className="mb-2 mt-4">Github</div>
              <div className="text-sm opacity-80 text-center">
                You can see all parts of Scoopika that have been developed as
                open source (90% of Scoopika)
              </div>
            </Link>
            <Link
              href="https://x.com/scoopika_"
              target="_blank"
              className="h-72 p-6 bg-accent/30 rounded-3xl flex flex-col items-center transition-all hover:bg-accent/40 relative"
            >
              <FaXTwitter size={50} className="mt-10" />
              <FaXTwitter
                size={150}
                className="absolute opacity-5 w-full h-full p-10"
              />
              <div className="mb-2 mt-4">X (Twitter)</div>
              <div className="text-sm opacity-80 text-center">
                Follow us to stay up to date with our latest news and updates
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-48 dark">
        <div className="w-[80%] flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-semibold mb-3 text-center">
            Start now for free
          </div>
          <div className="opacity-70 text-center mb-8">
            Enjoy our free-forever plan and only upgrade for extra features,
            start now!
          </div>
          <Button
            variant="flat"
            size="md"
            as={Link}
            href="/login"
            className="border backdrop-blur-xl border-white/20"
            endContent={<FaChevronRight size={14} />}
          >
            Start for free
          </Button>
        </div>
      </div>

      <div className="hidden sm:block w-full text-center pl-10 pr-10 text-9xl font-semibold opacity-30">
        Scoopika
      </div>

      <Footer className="dark" />
    </div>
  );
}
