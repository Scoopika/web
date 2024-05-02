import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButtons from "@/components/signInButtons";

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
        <div className="w-full p-12 lg:max-w-[50%] bg-background/50 backdrop-blur-xl rounded-2xl border-1 flex flex-col items-center justify-center drop-shadow-md">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 mb-10">
              <Logo />
              <h2 className="text-2xl font-semibold">Welcome!</h2>
              <p className="text-sm opacity-80 text-center">
                Connect your accout to continue
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
