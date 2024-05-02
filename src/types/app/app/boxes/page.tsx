import AppLayout from "@/components/app/appLayout";
import MainBoxes from "@/components/app/boxes/main";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RawBoxData } from "@/types/rawBox";
import { Session, getServerSession } from "next-auth";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const boxes = await db.box.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const boxesData = boxes.map(
    (box) => JSON.parse(box.payload) as RawBoxData
  );

  return (
    <AppLayout
        session={session}
        title="Smart Boxes"
        sidebarActive="Smart Boxes"
    >
        <MainBoxes boxes={boxesData} />
    </AppLayout>
  )
}
