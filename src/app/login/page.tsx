import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButtons from "@/components/signInButtons";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome"
}

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
      <div className="w-full min-h-screen p-4 lg:p-20 flex flex-col items-center">
        <div
          style={{
            boxShadow: "0px 0px 110rem 3rem var(--brandpurple)",
          }}
          className="w-2 h-2 absolute"
        ></div>
        <div className="w-full lg:p-12 lg:max-w-[50%] min-h-[70svh] lg:bg-background/50 backdrop-blur-xl rounded-2xl lg:border-1 flex flex-col items-center justify-center lg:drop-shadow-md border-black/10 dark:border-white/10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 mb-10">
              <h2 className="text-2xl font-semibold">Welcome!</h2>
              <p className="text-sm opacity-80 text-center">
                Connect your account to continue
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <SignInButtons callbackUrl={callbackurl} />
            </div>
            <p className="text-sm mt-4">
              By continue you agree to our{" "}
              <Link
                href="/privacy_policy.pdf"
                target="_blank"
                className="underline"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
