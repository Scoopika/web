import StoresMain from "@/components/main/stores/main";
import UpgradePlan from "@/components/main/upgrade";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/scripts/plan";
import { Session, getServerSession } from "next-auth";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const pro = isPro(session.user.plan);
  const stores = await db.historystore.findMany({
    where: {
        userId: session.user.id
    }
  })

  if (!pro) {
    return (
      <UpgradePlan description="Connect your app to serverless data stores to save chat sessions and give your agents long-term memory with no additional setup" />
    );
  }

  return <StoresMain dataStores={stores} />
}
