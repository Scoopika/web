import AppLayout from "@/components/app/appLayout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/loading";
import itemValue from "@/scripts/itemValue";
import { Avatar } from "@nextui-org/react";
import { RiRobot2Fill } from "react-icons/ri";
import AgentMainPage from "@/components/app/agent/main";

interface Props {
    params: {
        id: string;
    }
}

interface AgentProps {
    id: string;
    session: Session;
}

async function Agent({ id, session }: AgentProps) {
    const agent = await db.agent.findFirst({
        where: {
            id,
            userId: session.user.id
        }
    });

    if (!agent) {
        return redirect("/app");
    }

    const agentData: AgentData = JSON.parse(agent.payload);

    return (
        <AppLayout
            session={session}
            title={"Agent -> " + agentData.name}
            sidebarActive="NONE"
        >
            <div className="w-full min-h-full max-h-full flex">
                <div className="max-h-full overflow-auto w-full border-r-1 flex flex-col items-center p-14 gap-4">
                    <AgentMainPage agent={agentData} />
                </div>
                <div className="max-h-full overflow-auto w-full flex items-center"></div>
            </div>
        </AppLayout>
    )

}

export default async function Page({ params }: Props) {

    const session = await getServerSession(authOptions) as Session;

    return (
        <Suspense
            fallback={(
                <AppLayout
                    session={session}
                    title="Agent"
                    sidebarActive="NONE"
                >
                    <Loading />
                </AppLayout>
            )}
        >
            <Agent session={session} id={params.id} />
        </Suspense>
    );

}
