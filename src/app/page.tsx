import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} active="Home" />

      

    </>
  );
}
