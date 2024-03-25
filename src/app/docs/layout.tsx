import WaitlistDialog from "@/components/joinWaitlist";
import Navbar from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
  description: "Scoopika documentation",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar session={null} active="Docs" path="docs" />
      <WaitlistDialog triggerClassName="hidden" color="transparent" />
      {children}
    </>
  );
}
