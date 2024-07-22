import ResourceLink from "@/components/main/resourceLink";
import { SparklesCore } from "@/components/ui/sparkles";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { FaExternalLinkAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Lost in the galaxy",
  description:
    "40-days event to build multiple AI-powered open source products in public on top of Scoopika",
  creator: "Kais Radwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/lost-in-the-galaxy`,
    title: "Lost in the galaxt event",
    description: "Building multiple AI-powered open source products in public",
    siteName: siteConfig.name,
    images: ["/images/scoopika-new.png"],
  },
};

export default function Page() {
  return (
    <div className="relative w-full flex flex-col p-8 lg:p-16 rounded-md dark min-h-screen">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1}
          particleDensity={50}
          className="w-full h-full opacity-80"
          particleColor="#919191"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full p-8 lg:p-16">
        <div className="p-0.5 pl-2 pr-2 border rounded-full text-xs mb-2 max-w-max">
          Starting soon
        </div>
        <h1
          style={{
            textShadow: "0px 0px 10px rgba(255, 255, 255, .5)",
          }}
          className="text-3xl mb-4"
        >
          Lost in the galaxy
        </h1>
        <p className="opacity-70 lg:max-w-[70%] mb-10">
          Hey, {"It's"} Kais Radwan, the maker of Scoopika and this 40-days
          event, where we are going to build & launch multiple AI open source
          products in public and share the results with different strategies.
          <br />
          <br /> We are going to build all the products in public and share the
          updates here and on X/Twitter. All the tools are going to be built on
          top of Scoopika, an open source platform used to build LLM-powered
          apps 10x faster, and it will power us to build a lot of projects
          during this period.
          <br />
          <br />
          Follow us on these links to stay up to date and receive updates about
          this event, {"we'll"} share a lot of useful resources and insights
          about what we learn during this exciting experiment for indie
          builders!
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="https://x.com/kais_rad"
            target="_blank"
            className="flex items-center gap-2 opacity-70 hover:opacity-100"
          >
            X/Twitter (@kais_rad)
            <FaExternalLinkAlt />
          </a>
          <a
            href="https://github.com/kais-radwan"
            target="_blank"
            className="flex items-center gap-2 opacity-70 hover:opacity-100"
          >
            Github (where {"we'll"} share all the repositories)
            <FaExternalLinkAlt />
          </a>
          <a
            href="https://scoopika.com"
            target="_blank"
            className="flex items-center gap-2 opacity-70 hover:opacity-100"
          >
            Scoopika (The AI platform {"We'll"} use to build our products)
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}
