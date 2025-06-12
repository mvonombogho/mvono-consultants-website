"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContextProvider } from "./ui/use-toast";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ToastContextProvider>
        {children}
      </ToastContextProvider>
    </SessionProvider>
  );
};
