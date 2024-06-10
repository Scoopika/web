"use server";

import { authOptions } from "@/lib/auth";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { getServerSession } from "next-auth";

export default async function getCheckoutUrl(type: "basic" | "scale", embed: boolean = false) {
  const session = await getServerSession(authOptions);
  const variant = type === "basic" ? process.env.BASIC_VARIANT : process.env.SCALE_VARIANT;

  if (!session) {
    return { success: false };
  }

  configureLemonSqueezy();

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID as string,
    variant as string,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: session.user.email ?? undefined,
        custom: {
          user_id: session.user.id,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/app/settings?tab=billing`,
        receiptButtonText: "Go to app",
        receiptThankYouNote: "Thank you for upgrading your Scoopika plan!",
      },
    },
  );

  return {
    success: true,
    url: checkout.data?.data.attributes.url,
  };
}
