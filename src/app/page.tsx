import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@nextui-org/react";
import { FiChevronRight } from "react-icons/fi";
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import GridSmallBackground from "@/components/backgrounds/grid";
import Features from "@/components/landing/features";
import Starting from "@/components/landing/starting";
import Bento from "@/components/landing/bento";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} active="Home" />

      <div className="flex flex-col items-center gap-3 relative w-full">
        <GridSmallBackground className="flex flex-col items-center relative gap-3 pt-36">
          <Button
            size="sm"
            variant="ghost"
            radius="full"
            color="primary"
            startContent={<MdInfo size={20} />}
            endContent={<FiChevronRight size={20} />}
            className="font-semibold pl-3 pr-3 border-1 mb-4"
          >
            v1.0 is out! {"Here's"} what you need to know
          </Button>
          <h1 className="text-5xl font-semibold text-center mb-3 flex items-center gap-3">
            <span className="">Integrate </span>
            <span className="text-violet-500 flex items-center gap-1">
              <RiRobot2Fill />
              AI Agents
            </span>{" "}
          </h1>
          <h1 className="text-5xl font-semibold text-center mb-5">
            Into Your Application in <span className="underline">Minutes</span>
          </h1>
          <div className="mt-2 opacity-90 text-center text-base max-w-[50%] mb-9">
            Effortlessly create personalized agents for your application. Enjoy
            function-calling, built-in history data stores, prompt chains, and
            streaming
          </div>
          <Button
            size="lg"
            color="primary"
            variant="bordered"
            radius="sm"
            className="font-bold border-1 border-black/30 border-t-black/60 dark:border-white/30 dark:border-t-white/60 hover:bg-accent/40 backdrop-blur"
            endContent={<IoMdArrowRoundForward />}
          >
            Start for free
          </Button>
          <p className="text-sm opacity-80 pb-16">
            Connect your LLMs - Pay only for extra features
          </p>
        </GridSmallBackground>
      </div>

      <div className="flex flex-col items-center mb-36">
        <Features />
      </div>

      <div className="flex flex-col items-center mb-36">
        <Starting />
      </div>

      <div className="flex flex-col items-center mb-24">
        <Bento />
      </div>
    </>
  );
}
