import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function Layout() {
  return redirect("https://app.scoopika.com");
}
