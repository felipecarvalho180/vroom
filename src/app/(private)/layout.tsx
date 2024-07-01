import { StreamVideoProvider } from "@/services/stream/StreamClientProvider";
import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Vroom",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default HomeLayout;
