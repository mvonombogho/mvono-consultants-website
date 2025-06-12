"use client";

import { SessionProvider } from "next-auth/react";
<<<<<<< HEAD
import { ToastContextProvider } from "./ui/use-toast";
=======
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
<<<<<<< HEAD
  return (
    <SessionProvider>
      <ToastContextProvider>
        {children}
      </ToastContextProvider>
    </SessionProvider>
  );
=======
  return <SessionProvider>{children}</SessionProvider>;
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
};
