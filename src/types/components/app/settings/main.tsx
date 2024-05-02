"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import AccountSettings from "./account";
import TokensSettings from "./tokens";
import BillingSettings from "./billing";
import { PlanData } from "@/types/planData";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  session: Session;
  openTab?: string;
}

export interface Token {
  name: string;
  id: string;
}

export default function SettingsMain({ session, openTab }: Props) {
  const [tab, setTab] = useState(openTab || "basic");
  const [tokens, setTokens] = useState<Token[]>();
  const [planData, setPlanData] = useState<PlanData>();
  const router = useRouter();

  useEffect(() => {
    if (openTab) {
      setTab(openTab);
    }
  }, [openTab]);

  return (
    <div className="w-full flex flex-col gap-0">
      <Tabs
        variant="underlined"
        aria-label="settings-tabs"
        selectedKey={tab}
        onSelectionChange={setTab as any}
        classNames={{
          base: "border-b-1",
          tabList: "p-0 pt-3",
          tabContent: "p-6",
          panel: "p-6",
          tab: "pb-3"
        }}
      >
        <Tab key="basic" title="Basic" className="mt-0" as={Link} href="?tab=basic">
          <AccountSettings session={session} />
        </Tab>
        <Tab key="tokens" title="Tokens" as={Link} href="?tab=tokens">
          <TokensSettings tokens={tokens} setTokens={setTokens} />
        </Tab>
        <Tab key="billing" title="Billing" as={Link} href="?tab=billing">
          <BillingSettings session={session} planData={planData} setPlanData={setPlanData} />
        </Tab>
      </Tabs>
    </div>
  );
}
