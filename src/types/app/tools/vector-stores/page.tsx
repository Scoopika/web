import Hero from "@/components/vectorStores/hero";
import Navbar from "@/components/navbar";
import { IconInfoCircle, IconBolt, IconDatabase } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vector Stores",
  description:
    "Connect your database with vector stores optimized for performance",
};

export default function Page() {
  return (
    <>
      <Navbar session={null} active="Tools" />
      <Hero />
      <div className="w-full flex items-center justify-center mt-12 pb-24">
        <div className="w-full flex items-center justify-center max-w-[90%] gap-4">
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-3xl rounded-r-lg bg-black/10 dark:bg-accent/40">
              <IconDatabase size={25} className="mb-4" />
              <h3 className="mb-2">Bring your database</h3>
              <p className="text-sm opacity-70">
                Bring your own database, We {"don't"} host databases, only
                provide you with a vector store
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-lg bg-black/10 dark:bg-accent/40">
              <IconBolt size={25} className="mb-4" />
              <h3 className="mb-2">Optimized for performance</h3>
              <p className="text-sm opacity-70">
                Vector stores are used to store and retreive data used for
                context history
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="p-5 w-full rounded-l-lg rounded-r-3xl bg-black/10 dark:bg-accent/40">
              <IconInfoCircle size={25} className="mb-4" />
              <h3 className="mb-2">Goal of vector stores</h3>
              <p className="text-sm opacity-70">
                Main goal of vector stores is to provide history for the LLMs,
                instead of feeding full conversations
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
