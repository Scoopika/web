import Image from "next/image";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Why from "@/components/landing/why";
import Hero from "@/components/landing/hero";
import FunctionCalling from "@/components/landing/functionCalling";
import CheckMore from "@/components/landing/checkMore";

export default function Home() {
  return (
    <>
      <Navbar session={null} active="Home" />

      <Hero />

      <main className="pb-6 mx-auto w-full flex justify-center items-center flex-col gap-4">
        <p className="text-center opacity-60 text-sm">
          Compitable with large AI players
        </p>
        <div className="max-w-7xl md:max-w-[50%] flex items-center justify-center gap-10">
          <Link
            href="https://huggingface.co"
            target="_blank"
            className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100"
          >
            <Image
              src="/logos/hf-logo.svg"
              width={30}
              height={30}
              alt="Compitable with HuggingFace"
              className="grayscale object-cover"
            />
            HuggingFace
          </Link>
          <Link
            href="https://www.langchain.com/"
            target="_blank"
            className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100"
          >
            <Image
              src="/logos/langchain.png"
              width={35}
              height={35}
              alt="Compitable with LangChain"
              className="grayscale object-cover"
            />
            LangChain
          </Link>
          <Link
            href="https://openai.com"
            target="_blank"
            className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100"
          >
            <Image
              src="/logos/openai_logo.png"
              width={25}
              height={25}
              alt="Compitable with OpenAI"
              className="bg-white p-1 rounded-full opacity-70 grayscale object-cover"
            />
            OpenAI
          </Link>
        </div>
      </main>

      <div className="w-full flex flex-col items-center justify-center">
        <Why />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <FunctionCalling />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <CheckMore />
      </div>
    </>
  );
}
