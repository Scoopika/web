"use client";

import { UpgradeButton } from "./upgradeButton";

interface Props {
  info: string;
  limit: number;
  current: number;
  pro: boolean;
}

export default function ProMessage({ info, limit, current, pro }: Props) {
  if (current < limit || pro) {
    return;
  }

  return (
    <div className="w-full p-5 border-1 rounded-2xl border-dashed border-black/30 dark:border-white/30 mt-6 bg-accent/20">
      <h3 className="font-semibold mb-1">Upgrade your plan!</h3>
      <p className="text-sm opacity-80">{info}</p>
      <div className="mt-4 flex items-center gap-3">
        <UpgradeButton size="sm" />
      </div>
    </div>
  );
}
