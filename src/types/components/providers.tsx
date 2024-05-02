"use client";

import { FC } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

const Providers: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
};

export default Providers;
