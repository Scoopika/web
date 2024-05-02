import { FaChevronLeft } from "react-icons/fa6";
import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CheckoutButton } from "@/components/app/billing/button";
import CheckItem from "@/components/checkItem";
import { features } from "@/scripts/plan";

interface Props {
  searchParams: {
    callback?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const plan = session.user.plan;
  const isPro = !plan || plan === "none" || plan === "free" ? false : true;

  if (isPro) {
    return redirect("/app/settings");
  }

  return (
    <>
      <div className="sticky top-0 left-0 w-full h-14 border-b-1 flex items-center pl-4 pr-4 bg-background/70 backdrop-blur">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
            <Image
              src="/logo.png"
              alt="Scoopika logo"
              width={40}
              height={40}
              className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <Button
          color="default"
          variant="light"
          as={Link}
          size="sm"
          href={
            searchParams.callback ? `/app/${searchParams.callback}` : "/app"
          }
          startContent={<FaChevronLeft />}
          className="min-w-max"
        >
          Cancel {"&"} go back
        </Button>
      </div>

      <div className="w-full flex flex-col items-center p-10">
        <h1 className="text-3xl font-bold mb-4">Upgrade your plan!</h1>
        <p className="text-sm opacity-80 text-center">
          Expand your experience to the full potential and start building <br />{" "}
          unique AI-powered applications in minutes
        </p>

        <div className="w-full flex items-center justify-center mt-10">
          <div className="p-8 border-1 rounded-lg flex flex-col min-w-96">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="text-sm opacity-80 mb-4">
              Unlimited access for only <b>$20/month</b>
            </p>
            <div className="relative w-full">
              <CheckoutButton />
              <div
                style={{
                  boxShadow: "0px 0px 5000px 50px var(--brandpurple)",
                }}
                className="w-1 h-1 absolute z-0 top-4 left-10"
              ></div>
            </div>
            <div className="w-full flex flex-col gap-5 mt-8">
              {features.map((f, index) => (
                <CheckItem key={`planfeatureicon-${index}`} title={f} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
