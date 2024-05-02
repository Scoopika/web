import Navbar from "@/components/navbar";
import Hero from "@/components/landing/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description: "Scoopika AI-powered tools for developers",
};

export default function Home() {
  return (
    <>
      <Navbar session={null} active="Tools" />
      <Hero />
    </>
  );
}
