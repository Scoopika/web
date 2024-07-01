"use client";

import { BsStars } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getCheckoutUrl from "@/functions/plans/checkoutUrl";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRocket } from "react-icons/fa6";

interface Props {
  className?: string;
  size?: "sm" | "md";
  type?: "basic" | "scale";
  title?: string;
}

export function UpgradeButton({ type, className, size, title }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckOutUrl] = useState<string>();

  useEffect(() => {
    if (typeof (window as any)?.createLemonSqueezy === "function") {
      (window as any)?.createLemonSqueezy();
    }
  }, []);

  const upgrade = async () => {
    if (loading) {
      return toast.error("Loading. please wait!");
    }

    setLoading(true);

    try {
      const res = await getCheckoutUrl(type || "basic");

      if (!res.success || !res.url) {
        throw new Error("upgrade error");
      }

      setCheckOutUrl(checkoutUrl);
      router.push(res.url);
    } catch {
      toast.error("Unexpected error", {
        description: "Contact us or try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size={size || "md"}
        color="primary"
        className={`font-semibold w-full ${className}`}
        isLoading={loading}
        onPress={() => upgrade()}
        startContent={<FaRocket size={18} />}
      >
        {title || "Upgrade plan"}
      </Button>

      {checkoutUrl && (
        <p className="text-sm opacity-80 mt-2 text-center">
          Billing page did not open{"?"}{" "}
          <Link href={checkoutUrl}>Click here</Link>
        </p>
      )}
    </>
  );
}
