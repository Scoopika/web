import AppLayout from "@/components/app/appLayout";
import SettingsMain from "@/components/app/settings/main";
import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";

interface Props {
    searchParams: {
        tab?: string;
    }
}

export default async function Page({ searchParams }: Props) {

    const session = await getServerSession(authOptions) as Session;

    return (
        <AppLayout
            session={session}
            sidebarActive="Settings"
            title="Settings"
        >
            <SettingsMain session={session} openTab={searchParams.tab} />
        </AppLayout>
    )    

}