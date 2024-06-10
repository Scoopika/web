import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import UpgradeDialog from "./upgradeDialog";

interface Props {
  back?: string;
  description: string;
}

export default function UpgradePlan({ back, description }: Props) {
  return (
    <>
      {back && (
        <Link
          href={back}
          className="text-sm flex items-center gap-2 opacity-80 hover:opacity-100 transition-all"
        >
          <FaChevronLeft />
          Go back
        </Link>
      )}
      <div className="w-full flex flex-col items-center justify-center p-6">
        <div className="p-6 flex flex-col items-center justify-center border-1 rounded-2xl bg-accent/20 min-w-96 max-w-96 border-black/30 dark:border-white/30">
          <div className="w-10 h-10 flex items-center justify-center bg-foreground text-background rounded-full mb-1">
            <FaRocket />
          </div>
          <div className="font-semibold mb-2 text-center">
            Upgrade your plan!
          </div>
          <div className="text-sm opacity-80 text-center">{description}</div>
          <UpgradeDialog />
        </div>
      </div>
    </>
  );
}
