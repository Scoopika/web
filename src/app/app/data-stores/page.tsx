import AppLayout from "@/components/app/appLayout";
import DataStoresMain from "@/components/app/stores/main";
import CheckItem from "@/components/checkItem";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@nextui-org/react";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { FaDatabase } from "react-icons/fa6";

const databaseFeatures: string[] = [
  "Serverless. replicated to 4 locations",
  "Fast edge APIs ready to go",
  "Requires zero setup and one line of code to connect",
  "Built-in users & sessions management easy APIs",
  "Maintained data recovery",
];

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const plan = session.user.plan;

  if (plan === "none" || plan === "free" || !plan.includes("::")) {
    return (
      <AppLayout
        session={session}
        sidebarActive="Data Stores"
        title="Data Stores"
      >
        <div className="w-full flex flex-col items-center p-12">
          <div
            style={{
              boxShadow: "0px 0px 50px 1px rgba(255, 255, 255, .1)",
            }}
            className="w-10 h-10 rounded-lg border-1 flex items-center justify-center mb-4"
          >
            <FaDatabase />
          </div>
          <h2 className="font-semibold mb-2">Upgrade to Pro!</h2>
          <p className="text-sm opacity-70 text-center mb-4">
            Data stores are a Pro feature, upgrade your plan now to get a
            serverless deployed <br />
            database for persistent history sessions
          </p>
          <Button
            size="sm"
            color="primary"
            className="font-semibold"
            as={Link}
            href="/app/upgrade"
          >
            Upgrade plan
          </Button>

          <div className="w-full flex items-center justify-center mt-8">
            <div className="p-6 border-1 rounded-lg min-w-96">
              <p className="mb-4 font-semibold">Features</p>

              <div className="w-full flex flex-col gap-4">
                {databaseFeatures.map((feature, index) => (
                  <CheckItem
                    key={`databasefeatureitem-${index}`}
                    title={feature}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const datastores = await db.datastore.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <AppLayout
      session={session}
      sidebarActive="Data Stores"
      title="Data Stores"
    >
      <DataStoresMain datastores={datastores} />
    </AppLayout>
  );
}
