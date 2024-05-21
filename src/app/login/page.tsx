import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButtons from "@/components/signInButtons";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: { callbackurl?: string };
}) {
  const { callbackurl } = searchParams;
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/app");
  }

  return (
    <>
      <Navbar session={null} active="login" />
      <div className="w-full min-h-screen p-36 flex flex-col items-center">
        <div
          style={{
            boxShadow: "0px 0px 110rem 3rem var(--brandpurple)",
          }}
          className="w-2 h-2 absolute"
        ></div>
        <div className="w-full p-12 lg:max-w-[50%] bg-background/50 backdrop-blur-xl rounded-2xl border-1 flex flex-col items-center justify-center drop-shadow-md border-black/10 dark:border-white/10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 mb-10">
            <div className="flex items-center justify-center min-w-10 min-h-10 max-w-10 max-h-10 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
                <Image
                  src="/logo.png"
                  alt="Scoopika logo"
                  width={35}
                  height={35}
                  className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-semibold">Welcome!</h2>
              <p className="text-sm opacity-80 text-center">
                Connect your account to continue
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <SignInButtons callbackUrl={callbackurl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
