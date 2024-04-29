"use client";

import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInButtons({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  const [loading, setLoading] = useState<{ google: boolean; github: boolean }>({
    google: false,
    github: false,
  });

  const getLoading = (provider: "google" | "github") => loading[provider];

  const continueSignin = async (provider: "google" | "github") => {
    setLoading({ ...loading, [provider]: true });
    try {
      await signIn(provider, { callbackUrl: callbackUrl || "/app" });
    } catch {
      toast.error("Can't sign in, try again later!");
    } finally {
      setLoading({ ...loading, [provider]: false });
    }
  };

  return (
    <>
      <Button
        className="w-[60%]"
        size="md"
        variant="solid"
        color="primary"
        startContent={<IconBrandGoogle />}
        isLoading={getLoading("google")}
        onPress={() => continueSignin("google")}
      >
        Continue with Google
      </Button>
      <Button
        className="w-[60%]"
        size="md"
        variant="bordered"
        color="primary"
        startContent={<IconBrandGithub />}
        isLoading={getLoading("github")}
        onPress={() => continueSignin("github")}
      >
        Continue with Github
      </Button>
    </>
  );
}
