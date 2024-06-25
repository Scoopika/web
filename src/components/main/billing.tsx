"use client";

import { readPlan, readPlanType } from "@/scripts/plan";
import { PlanData } from "@/types/planData";
import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import cancelSub from "@/functions/plans/cancel";
import resumeSub from "@/functions/plans/resume";
import UpgradeDialog from "@/components/main/upgradeDialog";

interface Props {
  session: Session;
  planData: PlanData;
}

export default function BillingSettings({ session, planData }: Props) {
  const plan = session.user.plan;
  const isPro = plan === "none" || !plan.includes(":::") ? false : true;
  const planType = readPlanType(plan);
  const [open, setOpen] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [resumeLoading, setResumeLoading] = useState<boolean>(false);

  const cancel = async () => {
    if (!isPro || cancelLoading) return;

    setCancelLoading(true);
    const t = toast.loading("Cancelling plan...");

    try {
      const res = await cancelSub(readPlan(plan).id);

      if (!res.success) {
        throw new Error("cancel error");
      }

      toast.success("Plan cancelled!", { id: t });
      location.reload();
    } catch {
      toast.error("Can't cancel plan right now!", { id: t });
    } finally {
      setCancelLoading(false);
    }
  };

  const resume = async () => {
    if (!isPro || resumeLoading) return;

    setResumeLoading(true);
    const t = toast.loading("Resuming plan...");

    try {
      const res = await resumeSub(readPlan(plan).id);

      if (!res.success) {
        throw new Error("resume error");
      }

      toast.success("Plan resumed!", { id: t });
      location.reload();
    } catch {
      toast.error("Can't resume plan right now!", { id: t });
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {!isPro && (
        <div className="w-full p-6 border-1 rounded-lg">
          <h2 className="font-semibold mb-2">Upgrade plan</h2>
          <p className="text-sm opacity-80 mb-2">
            {"You're"} running on the free limited plan, upgrade to the basic or
            scale plan for more features like higher audio characters, audio
            inputs, custom agents knowledge, and much more! check the pricing
            and pick your plan!
          </p>

          <UpgradeDialog />
        </div>
      )}

      {isPro && !planData && (
        <p className="text-sm opacity-70">Loading plan... please wait!</p>
      )}

      {isPro && planData && (
        <div className="w-full border-1 rounded-lg p-6 flex items-center">
          <div className="flex flex-col gap-2 min-w-max w-full">
            <div className="w-full flex items-center">
              <div className="flex flex-col gap-2 min-w-max">
                <h3 className="font-semibold">Current plan: {planType}</h3>
                <p className="text-sm opacity-70">
                  Plan ID: #{readPlan(plan).id}
                </p>
              </div>
              <div className="w-full flex items-center justify-end">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="bg-black text-background dark:text-foreground dark:bg-accent/30 rounded-lg text-sm font-semibold p-2 pl-3 pr-3 hover:opacity-80 transition-all flex items-center gap-3 text-sm">
                    Manage plan
                    <FaChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          planData?.data?.attributes?.urls
                            ?.update_payment_method
                        }
                        target="_blank"
                      >
                        Update payment method
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          planData?.data?.attributes?.urls
                            ?.customer_portal_update_subscription
                        }
                        target="_blank"
                      >
                        Update subscription
                      </Link>
                    </DropdownMenuItem>
                    {readPlan(plan).status !== "cancelled" && (
                      <DropdownMenuItem onClick={() => setCancelOpen(true)}>
                        Cancel
                      </DropdownMenuItem>
                    )}
                    {readPlan(plan).status === "cancelled" && (
                      <DropdownMenuItem onClick={() => setResumeOpen(true)}>
                        Resume
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="w-full border-t-1 mt-3 mb-3"></div>

            <div className="w-full flex items-center">
              <div className="text-sm min-w-max">
                Next billing date:{" "}
                {String(planData?.data?.attributes?.renews_at || "").substring(
                  0,
                  10
                )}
              </div>
              <div className="w-full flex items-center justify-end">
                <p className="p-1.5 pl-3 pr-3 text-sm rounded-full bg-black/20 dark:bg-accent/30 max-w-max font-semibold">
                  {planData?.data?.attributes?.status}
                </p>
              </div>
            </div>
          </div>

          <AlertDialog
            open={cancelOpen}
            onOpenChange={!cancelLoading ? setCancelOpen : () => {}}
          >
            <AlertDialogContent>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Your plan will stay active until the next billing date and{" "}
                {"won't"} be renewed next month. data might take few minutes to
                update!
              </AlertDialogDescription>
              <div className="w-full flex items-center justify-end gap-3 mt-2">
                <Button
                  size="sm"
                  variant="flat"
                  className="font-semibold"
                  disabled={cancelLoading}
                  onPress={() => {
                    if (!cancelLoading) {
                      setCancelOpen(false);
                    }
                  }}
                >
                  Go back
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  isLoading={cancelLoading}
                  onPress={() => cancel()}
                  className="font-semibold border border-red-500"
                >
                  Cancel plan
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={resumeOpen}
            onOpenChange={!resumeLoading ? setResumeOpen : () => {}}
          >
            <AlertDialogContent>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Your plan will be resumed, and you will be billed in the next
                month. data will take few seconds to be updated!
              </AlertDialogDescription>
              <div className="w-full flex items-center justify-end gap-3 mt-2">
                <Button
                  size="sm"
                  variant="flat"
                  className="font-semibold"
                  disabled={resumeLoading}
                  onPress={() => {
                    if (!resumeLoading) {
                      setResumeOpen(false);
                    }
                  }}
                >
                  Go back
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  isLoading={resumeLoading}
                  onPress={() => resume()}
                  className="font-semibold"
                >
                  Resume plan
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
