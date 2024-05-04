import AppLayout from "@/components/app/appLayout";
import MainBoxes from "@/components/app/boxes/main";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RawBoxData } from "@/types/rawBox";
import { Session, getServerSession } from "next-auth";
import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface BoxesProps {
  session: Session;
}

async function Boxes({ session }: BoxesProps) {
  const boxes = await db.box.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const boxesData = boxes.map((box) => JSON.parse(box.payload) as RawBoxData);

  return (
    <AppLayout
      session={session}
      title="Smart Boxes"
      sidebarActive="Smart Boxes"
    >
      <MainBoxes boxes={boxesData} session={session} />
    </AppLayout>
  );
}

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <Suspense
      fallback={(
        <AppLayout
          session={session}
          title="Smart Boxes"
          sidebarActive="Smart Boxes"
        >
          <div className="w-full flex flex-col items-center p-24">
            <AiOutlineLoading className="animate-spin" />
          </div>
        </AppLayout>
  )}
    >
      <Boxes session={session} />
    </Suspense>
  );
}
