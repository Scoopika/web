import BoxesMain from "@/components/main/boxes/main";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RawBoxData } from "@/types/rawBox";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Multi-agent boxes"
}

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const boxes = await db.box.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const boxesData = boxes.map((b) => JSON.parse(b.payload)) as RawBoxData[];

  return <BoxesMain boxes={boxesData} />;
}
