import AboutFeatureDialog from "@/components/main/aboutFeature";
import Billing from "@/components/main/billing";
import AppHead from "@/components/main/head";
import getPlanData from "@/functions/plans/get";
import getUsage from "@/functions/usage";
import { authOptions } from "@/lib/auth";
import aboutFeatures from "@/scripts/aboutFeatures";
import { readPlan } from "@/scripts/plan";
import { Progress } from "@nextui-org/react";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";

const maxes = {
  load: [5000, 200000, 1000000],
  speech: [50, 100000, 1000000],
  store_read: [0, 1000000, 4000000],
  store_write: [0, 500000, 2000000],
  knowledge: [0, 300000, 1500000],
  listen: [0, 500, 1000],
};

const indexes = ["free", "basic", "scale"];

const Row = ({
  name,
  current,
  max,
  info,
}: {
  name: string;
  current: number;
  max: number;
  info: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="text-sm opacity-90 mb-2 flex items-center gap-3">
        {name} ({Math.round(current)} / {max})
        <AboutFeatureDialog name={name} info={info} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Progress value={current} maxValue={max} />
      </div>
    </div>
  );
};

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Session;
  const plan = readPlan(session.user.plan);
  const planData = await getPlanData(plan.id);
  const usage = await getUsage();
  const usageIndex = indexes.indexOf(plan.type);

  if (plan.type !== "free" && !planData.success) {
    return redirect("/app");
  }

  const usageData: {
    name: string;
    current: number;
    max: number;
    info: string;
  }[] = [
    {
      name: "Agents loads",
      current: usage.data?.[0].value || 0,
      max: maxes.load[usageIndex],
      info: aboutFeatures.loads,
    },
    {
      name: "Speech characters",
      current: usage.data?.[1].value || 0,
      max: maxes.speech[usageIndex],
      info: aboutFeatures.speech,
    },
    {
      name: "Chats store read operations",
      current: usage.data?.[2].value || 0,
      max: maxes.store_read[usageIndex],
      info: aboutFeatures.store_read,
    },
    {
      name: "Chats store write operations",
      current: usage.data?.[3].value || 0,
      max: maxes.store_write[usageIndex],
      info: aboutFeatures.store_write,
    },
    {
      name: "Knowledge requests",
      current: usage.data?.[4].value || 0,
      max: maxes.knowledge[usageIndex],
      info: aboutFeatures.knowledge,
    },
    {
      name: "Fast audio inputs processes",
      current: usage.data?.[5].value || 0,
      max: maxes.listen[usageIndex],
      info: aboutFeatures.listen,
    },
  ];

  return (
    <>
      <AppHead
        title="Plan & Usage"
        description="Managed your plan and keep track of your monthly usage"
      />
      <Billing
        session={session}
        planData={planData.success === true ? planData.data : undefined}
      />
      <div className="text-xl font-semibold">Your monthly usage</div>
      {usageData.map((usage, index) => (
        <Row
          key={`usagerow-${index}`}
          name={usage.name}
          current={usage.current}
          max={usage.max}
          info={usage.info}
        />
      ))}
    </>
  );
}
